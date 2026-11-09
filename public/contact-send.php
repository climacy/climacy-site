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
$sender = 'info@climacy.ch';
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

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'From: Site Climacy <' . $sender . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = @mail($recipient, $encodedSubject, $body, implode("\r\n", $headers));
if (!$sent) {
    error_log('Climacy contact form: primary mail delivery failed.');
    respond(500, false, 'Le message n’a pas pu être envoyé. Veuillez nous appeler au +41 21 510 31 51.');
}

$attempts[] = time();
@file_put_contents($rateFile, json_encode($attempts), LOCK_EX);

$ackSubject = 'Votre message à Climacy';
$ackBody = "Bonjour {$name},\n\n"
    . "Nous avons bien reçu votre message concernant « {$projectType} ». Notre équipe vous répondra dans les meilleurs délais.\n\n"
    . "Cordialement,\nClimacy SA\nChemin de la Mochettaz 7\n1030 Bussigny (VD)\n+41 21 510 31 51\ninfo@climacy.ch\n";
$ackHeaders = [
    'From: Climacy <' . $sender . '>',
    'Reply-To: Climacy <' . $recipient . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
@mail($email, '=?UTF-8?B?' . base64_encode($ackSubject) . '?=', $ackBody, implode("\r\n", $ackHeaders));

respond(200, true, 'Merci. Votre message a bien été envoyé à Climacy.');
