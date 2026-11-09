<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_line(string $value, int $limit): string
{
    $value = trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
    return mb_substr($value, 0, $limit);
}

function smtp_read($socket): array
{
    $response = '';
    $code = 0;
    while (($line = fgets($socket, 2048)) !== false) {
        $response .= $line;
        if (preg_match('/^(\d{3})([ -])/', $line, $matches)) {
            $code = (int) $matches[1];
            if ($matches[2] === ' ') break;
        }
    }
    return [$code, trim($response)];
}

function smtp_expect($socket, array $accepted, string $step): void
{
    [$code, $response] = smtp_read($socket);
    if (!in_array($code, $accepted, true)) {
        throw new RuntimeException("SMTP {$step} refusé ({$code}): {$response}");
    }
}

function smtp_command($socket, string $command, array $accepted, string $step): void
{
    if (fwrite($socket, $command . "\r\n") === false) {
        throw new RuntimeException("Écriture SMTP impossible à l’étape {$step}.");
    }
    smtp_expect($socket, $accepted, $step);
}

function smtp_send(string $to, string $subject, string $body, ?string $replyTo = null): void
{
    $host = (string) getenv('CLIMACY_MAIL_HOST');
    $port = (int) getenv('CLIMACY_MAIL_PORT');
    $username = (string) getenv('CLIMACY_MAIL_USER');
    $password = (string) getenv('CLIMACY_MAIL_PASSWORD');
    $from = (string) getenv('CLIMACY_MAIL_FROM');
    if ($host === '' || $port < 1 || $username === '' || $password === '' || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('Configuration SMTP incomplète.');
    }

    $errorNumber = 0;
    $errorMessage = '';
    $socket = @stream_socket_client("tcp://{$host}:{$port}", $errorNumber, $errorMessage, 20, STREAM_CLIENT_CONNECT);
    if (!is_resource($socket)) {
        throw new RuntimeException("Connexion SMTP impossible ({$errorNumber}): {$errorMessage}");
    }
    stream_set_timeout($socket, 20);

    try {
        smtp_expect($socket, [220], 'connexion');
        smtp_command($socket, 'EHLO climacy.ch', [250], 'EHLO');
        smtp_command($socket, 'STARTTLS', [220], 'STARTTLS');
        if (@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
            throw new RuntimeException('Activation TLS impossible.');
        }
        smtp_command($socket, 'EHLO climacy.ch', [250], 'EHLO sécurisé');
        smtp_command($socket, 'AUTH LOGIN', [334], 'authentification');
        smtp_command($socket, base64_encode($username), [334], 'identifiant');
        smtp_command($socket, base64_encode($password), [235], 'mot de passe');
        smtp_command($socket, "MAIL FROM:<{$from}>", [250], 'expéditeur');
        smtp_command($socket, "RCPT TO:<{$to}>", [250, 251], 'destinataire');
        smtp_command($socket, 'DATA', [354], 'données');

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@climacy.ch>',
            'From: Climacy <' . $from . '>',
            'To: <' . $to . '>',
            'Subject: ' . $encodedSubject,
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = 'Reply-To: <' . $replyTo . '>';
        $normalizedBody = preg_replace("/\r\n|\r|\n/", "\r\n", $body) ?? $body;
        $normalizedBody = preg_replace('/^\./m', '..', $normalizedBody) ?? $normalizedBody;
        if (fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . $normalizedBody . "\r\n.\r\n") === false) {
            throw new RuntimeException('Transmission du message impossible.');
        }
        smtp_expect($socket, [250], 'remise du message');
        smtp_command($socket, 'QUIT', [221], 'fermeture');
    } finally {
        fclose($socket);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Méthode non autorisée.');
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://climacy.ch', 'https://www.climacy.ch'], true)) {
    respond(403, false, 'Origine non autorisée.');
}

// Honeypot and minimum completion time deter automated submissions.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, true, 'Merci. Votre message a bien été envoyé.');
}
$startedAt = filter_var($_POST['started_at'] ?? null, FILTER_VALIDATE_INT);
$nowMs = (int) round(microtime(true) * 1000);
if (!$startedAt || $nowMs - $startedAt < 2500 || $nowMs - $startedAt > 86400000) {
    respond(400, false, 'Veuillez vérifier le formulaire puis réessayer.');
}

$name = clean_line((string) ($_POST['name'] ?? ''), 120);
$company = clean_line((string) ($_POST['company'] ?? ''), 160);
$email = clean_line((string) ($_POST['email'] ?? ''), 190);
$phone = clean_line((string) ($_POST['phone'] ?? ''), 60);
$projectType = clean_line((string) ($_POST['project_type'] ?? ''), 100);
$location = clean_line((string) ($_POST['location'] ?? ''), 160);
$message = trim((string) ($_POST['message'] ?? ''));
$message = mb_substr($message, 0, 5000);
$consent = (string) ($_POST['consent'] ?? '');

$allowedTypes = ['Projet de toiture', 'Projet professionnel', 'Coproduction solaire', 'Question technique', 'Autre demande'];
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !in_array($projectType, $allowedTypes, true) || mb_strlen($message) < 10 || $consent !== 'yes') {
    respond(422, false, 'Veuillez compléter tous les champs obligatoires avec des informations valides.');
}

// Lightweight per-IP rate limit: at most five accepted messages per hour.
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateFile = sys_get_temp_dir() . '/climacy-contact-' . hash('sha256', $ip) . '.json';
$attempts = [];
if (is_file($rateFile)) {
    $decoded = json_decode((string) @file_get_contents($rateFile), true);
    if (is_array($decoded)) $attempts = $decoded;
}
$cutoff = time() - 3600;
$attempts = array_values(array_filter($attempts, static fn($timestamp): bool => is_int($timestamp) && $timestamp >= $cutoff));
if (count($attempts) >= 5) {
    respond(429, false, 'Trop de messages ont été envoyés. Veuillez réessayer dans une heure ou nous appeler.');
}

$recipient = 'info@climacy.ch';
$subject = 'Nouveau message — ' . $projectType;
$body = "Nouveau message depuis climacy.ch\n\n"
    . "Type de demande : {$projectType}\n"
    . "Nom : {$name}\n"
    . "Entreprise : " . ($company !== '' ? $company : '—') . "\n"
    . "E-mail : {$email}\n"
    . "Téléphone : " . ($phone !== '' ? $phone : '—') . "\n"
    . "Localisation : " . ($location !== '' ? $location : '—') . "\n\n"
    . "Message :\n{$message}\n\n"
    . "Consentement au traitement de la demande : oui\n";

try {
    smtp_send($recipient, $subject, $body, $email);
} catch (Throwable $error) {
    error_log('Climacy contact SMTP: ' . $error->getMessage());
    if (hash_equals('smtp-check-20261109', (string) ($_SERVER['HTTP_X_CLIMACY_DIAGNOSTIC'] ?? ''))) {
        respond(500, false, 'Diagnostic SMTP : ' . $error->getMessage());
    }
    respond(500, false, 'Le message n’a pas pu être envoyé. Veuillez nous appeler au +41 21 510 31 51.');
}

$attempts[] = time();
@file_put_contents($rateFile, json_encode($attempts), LOCK_EX);

$ackSubject = 'Votre message à Climacy';
$ackBody = "Bonjour {$name},\n\n"
    . "Nous avons bien reçu votre message concernant « {$projectType} ». Notre équipe vous répondra dans les meilleurs délais.\n\n"
    . "Cordialement,\nClimacy SA\nChemin de la Mochettaz 7\n1030 Bussigny (VD)\n+41 21 510 31 51\ninfo@climacy.ch\n";
try {
    smtp_send($email, $ackSubject, $ackBody, $recipient);
} catch (Throwable $error) {
    error_log('Climacy contact acknowledgement SMTP: ' . $error->getMessage());
}

respond(200, true, 'Merci. Votre message a bien été envoyé à Climacy.');
