import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const source = await readFile(join(dist, 'index.html'), 'utf8');
const origin = 'https://www.climacy.ch';

const routes = [
  {
    path: '/',
    title: 'Climacy · Tuiles solaires intégrées en Suisse romande',
    description: 'Climacy conçoit des tuiles solaires intégrées pour les rénovations et constructions neuves en Suisse romande.',
  },
  {
    path: '/tuile/',
    title: 'La tuile solaire Climacy · Performance et intégration',
    description: 'Découvrez une tuile solaire suisse, intégrée à la toiture, performante, durable et conçue pour une couverture homogène.',
  },
  {
    path: '/interet/',
    title: 'Pourquoi choisir une toiture solaire · Climacy',
    description: 'Découvrez l’intérêt d’une couverture solaire intégrée lorsque vous rénovez votre toiture.',
  },
  {
    path: '/realisations/',
    title: 'Réalisations solaires intégrées · Climacy',
    description: 'Découvrez des rénovations, constructions neuves et pergolas équipées de tuiles solaires Climacy en Suisse romande.',
  },
  {
    path: '/pour-qui/',
    title: 'Tuiles solaires pour propriétaires · Climacy',
    description: 'Vous rénovez votre toit ? Remplacez les tuiles classiques par une couverture Climacy qui produit votre électricité.',
  },
  {
    path: '/professionnels/',
    title: 'Professionnels du bâtiment · Climacy',
    description: 'Formats de tuiles solaires et accompagnement au calepinage pour les professionnels du bâtiment.',
  },
  {
    path: '/architectes/',
    title: 'Solutions solaires intégrées pour architectes · Climacy',
    description: 'Une couverture solaire intégrée pour les architectes : formats, performance et accompagnement de projet.',
  },
  {
    path: '/ppe/',
    title: 'Solutions solaires pour PPE et régies · Climacy',
    description: 'Climacy accompagne les copropriétés et régies dans leurs projets de rénovation solaire intégrée.',
  },
  {
    path: '/financement/',
    title: 'Financer une toiture solaire intégrée · Climacy',
    description: 'Comprenez le supplément solaire, les économies attendues et les options de coproduction pour votre toiture Climacy.',
  },
  {
    path: '/ressources/',
    title: 'Questions fréquentes sur les tuiles solaires · Climacy',
    description: 'Réponses aux questions fréquentes sur l’intégration, la performance, l’entretien et le financement des tuiles solaires Climacy.',
  },
  {
    path: '/a-propos/',
    title: 'À propos de Climacy · Architects of sustainability',
    description: 'Découvrez l’équipe et la vision de Climacy, entreprise suisse spécialisée dans les tuiles solaires intégrées.',
  },
  {
    path: '/contact/',
    title: 'Contactez Climacy · Étude de toiture solaire',
    description: 'Contactez Climacy à Bussigny pour étudier votre projet de toiture solaire intégrée en Suisse romande.',
  },
];

function pageFor(route) {
  const canonical = `${origin}${route.path}`;
  return source
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
}

for (const route of routes) {
  if (route.path === '/') {
    await writeFile(join(dist, 'index.html'), pageFor(route));
    continue;
  }
  const directory = join(dist, route.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), pageFor(route));
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${origin}${route.path}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);

// Keep a conventional /accueil/ alias without listing it as a canonical URL.
await mkdir(join(dist, 'accueil'), { recursive: true });
await cp(join(dist, 'index.html'), join(dist, 'accueil', 'index.html'));
