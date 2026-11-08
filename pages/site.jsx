import React, { useEffect, useRef, useState } from 'react';
import { CLIMACY } from '../content.js';
import { Arrow, Img, Vid } from '../util.jsx';

// CLIMACY · site multi-pages (direction Cinématique).
// Même contenu que la page Particuliers, réparti en pages selon l'arborescence.
// Chaque onglet du menu ouvre sa propre page (#/route).

const ROUTES = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'tuile', label: 'Tuile solaire' },
  { id: 'interet', label: 'Pourquoi Climacy' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'professionnels', label: 'Professionnels' },
  { id: 'financement', label: 'Financement' },
  { id: 'ressources', label: 'Ressources' },
  { id: 'apropos', label: 'À propos' },
  { id: 'contact', label: 'Contact' },
];
const CTA_ROUTE = { id: 'contact', label: 'Découvrir le potentiel de mon toit' };
const STUDY_URL = 'https://designer.climacy.ch/pre-etude.html';
const EXT = { target: '_blank', rel: 'noopener noreferrer' };

// Les titres se composent naturellement selon la largeur disponible.
function T({ s }) {
  return s;
}

function FinanceIcon({ kind, accent = false }) {
  const icons = {
    power: 'energy-bolt.svg',
    roof: 'roof.svg',
    project: 'house-sun.svg',
    renovation: 'renovation-project.svg',
    building: 'green-house.svg',
    ppe: 'slope-roof-building.svg',
    public: 'building-slope-roof.svg',
    study: 'calculator.svg',
    budget: 'wallet.svg',
    energy: 'energy-bolt.svg',
    energyOutline: 'energy-outline-empty.svg',
    coproduction: 'pig.svg',
    investment: 'bar-chart-arrow.svg',
    longterm: 'bar-chart-arrow.svg',
    ownership: 'house.svg',
    installation: 'climacy-roof.svg',
    surplus: 'bar-chart-arrow.svg',
  };
  const file = icons[kind] || icons.project;
  if (accent) return <span className={`fcp-icon fcp-icon-${kind} fcp-icon-accent`} style={{ maskImage: `url('/assets/icons-finance/${file}')`, WebkitMaskImage: `url('/assets/icons-finance/${file}')` }} aria-hidden="true" />;
  return <img className={`fcp-icon fcp-icon-${kind}`} src={`/assets/icons-finance/${file}`} alt="" aria-hidden="true" />;
}

const ROUTE_PATHS = {
  accueil: '/',
  tuile: '/tuile/',
  interet: '/interet/',
  realisations: '/realisations/',
  'pour-qui': '/pour-qui/',
  professionnels: '/professionnels/',
  architectes: '/architectes/',
  ppe: '/ppe/',
  financement: '/financement/',
  ressources: '/ressources/',
  apropos: '/a-propos/',
  contact: '/contact/',
};
const go = (id) => ROUTE_PATHS[id] || '/';
// Les sous-pages « Architectes » et « PPE » font partie de l'onglet « Pour qui »
const navOn = (route) => (route === 'architectes' || route === 'ppe' || route === 'pour-qui') ? 'professionnels' : route;
const Rule = () => <div className="rule"></div>;

function LinkBtn({ to, children, ghost, lg }) {
  return (
    <a className={'btn btnlink' + (ghost ? ' btn-ghost' : '') + (lg ? ' btn-lg' : '')} href={go(to)}>
      {children}{!ghost && <Arrow />}
    </a>
  );
}

function SiteNav({ route }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <nav className="site-header">
      <a href={go('accueil')} className="logolink brand-logo" aria-label="Climacy">
        <img src="/assets/brand/climacy-logo-with-claim-white.svg" alt="Climacy — architects of sustainability" />
      </a>
      <div className="navlinks">
        {ROUTES.filter(r => r.id !== 'accueil').map(r => (
          <a key={r.id} href={go(r.id)} className={navOn(route) === r.id ? 'on' : ''}>{r.label}</a>
        ))}
      </div>
      <div className="navright" ref={ref}>
        <button type="button" className={'menubtn' + (open ? ' open' : '')} aria-label="Menu"
          aria-expanded={open} aria-controls="sitemenu" onClick={() => setOpen(!open)}>
          Menu
        </button>
        <div id="sitemenu" className={'menupanel' + (open ? ' open' : '')} role="menu">
          {ROUTES.map(r => (
            <a key={r.id} role="menuitem" href={go(r.id)} className={navOn(route) === r.id ? 'on' : ''}
              onClick={() => setOpen(false)}>{r.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function SiteFooter() {
  const C = CLIMACY;
  return (
    <footer className="sales-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/assets/brand/climacy-logo-with-claim-white.svg" alt="Climacy — architects of sustainability" />
        </div>
        <div className="footer-address">
          <strong>Climacy SA</strong><br />
          {C.contact.addr[0]}<br />
          {C.contact.addr[1]}
        </div>
        <div className="footer-contact">
          <a href={'mailto:' + C.contact.email}>{C.contact.email}</a><br />
          <a href={'tel:' + C.contact.phone.replace(/\s/g, '')}>{C.contact.phone}</a>
          <div className="footer-social">
            {C.social.map(x => <a key={x.label} href={x.url} target="_blank" rel="noopener noreferrer" aria-label={'Climacy sur ' + x.label} className={'footer-social-' + x.label.toLowerCase()}><img src={'/' + x.logo} alt="" /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── ACCUEIL ───────────── */
function RoofComparison() {
  const [position, setPosition] = useState(50);

  useEffect(() => {
    const centerComparison = () => setPosition(50);
    centerComparison();
    window.addEventListener('pageshow', centerComparison);
    return () => window.removeEventListener('pageshow', centerComparison);
  }, []);

  return (
    <div className="roof-comparison" style={{ '--compare-position': `${position}%` }}>
      <div className="comparison-captions" aria-label="Comparaison entre panneau rapporté et tuile solaire intégrée">
        <div className="comparison-caption-layer comparison-caption-layer-conventional">
          <article className="comparison-caption comparison-caption-conventional">
            <h3>Le panneau rapporté</h3>
            <p>Posé sur la couverture&nbsp;:<br />cadres, reliefs, ruptures visuelles</p>
          </article>
        </div>
        <div className="comparison-caption-layer comparison-caption-layer-integrated">
          <article className="comparison-caption comparison-caption-integrated">
            <h3>La tuile intégrée</h3>
            <p>Remplace la couverture&nbsp;:<br />surface continue, plane, sans rupture</p>
          </article>
        </div>
        <div className="comparison-caption-divider" aria-hidden="true" />
      </div>
      <div className="roof-comparison-frame">
        <img
          className="roof-comparison-image roof-comparison-integrated"
          src="assets/photos/integration-climacy.webp"
          alt="Toiture avec tuiles solaires Climacy intégrées"
        />
        <div className="roof-comparison-overlay" aria-hidden="true">
          <img
            className="roof-comparison-image roof-comparison-conventional"
            src="assets/photos/integration-ordinary.webp"
            alt=""
          />
        </div>
        <div className="roof-comparison-divider" aria-hidden="true">
          <span className="roof-comparison-handle"><b>‹</b><b>›</b></span>
        </div>
        <input
          className="roof-comparison-range"
          type="range"
          min="0"
          max="100"
          value={position}
          autoComplete="off"
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Faire glisser pour comparer une toiture avec panneaux rapportés et une toiture Climacy"
        />
      </div>
      <p className="roof-comparison-hint">Faites glisser pour comparer</p>
    </div>
  );
}

function PageAccueil({ heroMedia }) {
  const C = CLIMACY;
  const homeRef = useRef(null);
  useEffect(() => {
    const home = homeRef.current;
    if (!home || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = [...home.querySelectorAll('.home-reveal')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .05 });
    elements.forEach(element => observer.observe(element));
    home.classList.add('home-reveal-ready');
    return () => observer.disconnect();
  }, []);
  return (
    <div className="home-page" ref={homeRef}>
      <header className="hero home-main-hero">
        {heroMedia === 'video' && <Vid tone="dark" className="bg" src="videos/solar_cells.mp4" poster="assets/photos/cells_glow.jpg" />}
        {heroMedia === 'lac' && <Img tone="dark" className="bg" src="assets/photos/integration_lake.jpg" alt="Toiture solaire intégrée, vue lac" />}
        {heroMedia === 'villa' && <Img tone="dark" className="bg" src="assets/photos/villa_aerial.jpg" alt="Maison contemporaine, toiture solaire" />}
        <div className="inner">
          <div className="eyebrow">{C.hero.eyebrow}</div>
          <h1 className="disp site-hero-title">{C.hero.title[0]} <span className="l2">{C.hero.title[1]}</span></h1>
          <p className="sub site-hero-copy">{C.hero.sub}</p>
          <div className="ctas">
            <a className="btn btn-lg btnlink" href={STUDY_URL} {...EXT}>Découvrir le potentiel de mon toit<Arrow /></a>
            <LinkBtn to="tuile" lg>{C.hero.cta2}</LinkBtn>
          </div>
        </div>
      </header>

      <section className="prod">
        <div className="prodgrid home-reveal">
          <Img tone="dark" className="pimg" src="assets/photos/swiss-lakeside-solar-roof.png" alt="Toiture solaire Climacy au bord du lac" />
          <div>
            <div className="eyebrow">{C.product.eyebrow}</div>
            <h2 className="disp product-title">{C.product.title[0]} <span>{C.product.title[1]}</span></h2>
            <p style={{ fontSize: 20, color: 'rgba(241,239,232,0.84)', marginTop: 26, lineHeight: 1.55 }}>{C.product.body}</p>
            <div className="home-product-link"><LinkBtn to="tuile">Découvrir la tuile solaire</LinkBtn></div>
          </div>
        </div>
      </section>

      <section className="home-integration" id="integration">
        <div className="integration-heading home-reveal">
          <div className="eyebrow">L’intégration</div>
          <h2 className="disp">Une surface, <span>pas un assemblage.</span></h2>
          <p className="integration-intro">Les panneaux rapportés se posent sur la couverture. Les tuiles Climacy la remplacent et créent une surface solaire continue et homogène.</p>
        </div>
        <div className="integration-comparison home-reveal">
          <RoofComparison />
        </div>
        <div className="integration-signature disp home-reveal">
          <span>La performance d’un panneau.</span>
          <span>La discrétion d’une toiture.</span>
        </div>
      </section>

      <section className="interest-home">
        <div className="home-reveal"><div className="eyebrow">Votre toiture est à refaire ?</div><h2 className="disp">Une toiture solaire intégrée. <span>Un choix esthétique et économique.</span></h2></div>
        <div className="interest-home-copy home-reveal"><p>Vous pouvez poser des tuiles classiques puis ajouter des panneaux solaires. Avec Climacy, les tuiles solaires remplacent la couverture : votre toit protège votre bâtiment et produit de l’électricité, dans une surface homogène.</p><p>En réunissant couverture et production solaire, cette solution peut être plus avantageuse économiquement.</p><LinkBtn to="interet">Pourquoi choisir Climacy ?</LinkBtn></div>
      </section>

      <section className="home-realisations">
        <div className="seclead home-reveal">
          <div className="eyebrow">{C.installs.eyebrow}</div>
          <h2 className="disp"><T s={C.installs.title} /></h2>
          <p className="home-realisations-intro">Maisons, immeubles et bâtiments publics : découvrez une sélection de projets équipés en Suisse.</p>
        </div>
        <div className="home-reveal"><Marquee shots={C.installs.shots} link={go('realisations')} /></div>
        <div className="home-reveal" style={{ marginTop: 40 }}><LinkBtn to="realisations" ghost>Voir les réalisations</LinkBtn></div>
      </section>

      <section className="home-process">
        <div className="seclead home-reveal">
          <div className="eyebrow">{C.process.eyebrow}</div>
          <h2 className="disp"><T s={C.process.title} /></h2>
        </div>
        <div className="process">
          {C.process.steps.map((s, i) => (
            <div className="s home-reveal" key={i} style={{ '--home-delay': `${i * 90}ms` }}><div className="n">{s.n}</div><h4 className="disp">{s.k}</h4><p>{s.p}</p></div>
          ))}
        </div>
        <div className="home-reveal" style={{ marginTop: 56 }}><a className="btn btn-lg btnlink" href={STUDY_URL} {...EXT}>{C.cta.button}<Arrow /></a></div>
      </section>
    </div>
  );
}

function PageInteret() {
  const pageRef = useRef(null);
  useEffect(() => {
    const page = pageRef.current;
    if (!page || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = [...page.querySelectorAll('.interest-reveal')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.05 });
    items.forEach(item => observer.observe(item));
    page.classList.add('interest-reveal-ready');
    return () => observer.disconnect();
  }, []);
  const choices = [
    { n: '01', title: 'Tuiles et panneaux rapportés', text: 'Une couverture traditionnelle est posée, puis des panneaux solaires sont installés par-dessus.', image: '/assets/icons-finance/comparison-standard.svg' },
    { n: '02', title: 'Couverture solaire Climacy', text: 'Les tuiles solaires deviennent la couverture : elles protègent votre bâtiment et produisent de l’électricité.', image: '/assets/icons-finance/comparison-integrated.svg', featured: true },
  ];
  return <div className="interest-page" ref={pageRef}>
    <section className="interest-hero first"><div className="eyebrow">L’intérêt d’une toiture solaire</div><h1 className="disp site-hero-title">Vous refaites votre toit. <span>Faites-le produire.</span></h1><p>Votre toiture doit être rénovée ? Le budget de la couverture est déjà prévu. Avec Climacy, il devient le point de départ d’une toiture qui protège votre bâtiment et produit de l’électricité.</p><a className="btn btn-lg btnlink" href={STUDY_URL} {...EXT}>Découvrir le potentiel de mon toit<Arrow /></a></section>
    <section className="interest-example"><div className="eyebrow interest-reveal">Exemple d’un projet</div><h2 className="disp interest-reveal">Comparer l’ensemble du projet.</h2><p className="interest-reveal">Pour les configurations retenues dans cette pré-étude, comparons une couverture solaire intégrée à des tuiles classiques équipées de panneaux rapportés.</p><div className="interest-example-grid"><article className="interest-reveal"><div className="interest-example-header"><img src={choices[0].image} alt="" /><h3>{choices[0].title}</h3><p>{choices[0].text}</p></div><dl><div><dt>Puissance estimée</dt><dd>17,5 kWc</dd></div><div><dt>Production annuelle estimée</dt><dd>17’676 kWh</dd></div><div><dt>Coût avant aides TTC, y c. couverture en tuiles classiques</dt><dd>63’300 CHF</dd></div><div><dt>Subvention fédérale estimée</dt><dd>− 6’640 CHF</dd></div><div className="interest-total"><dt>Coût après aide fédérale</dt><dd>56’660 CHF</dd></div></dl></article><article className="is-featured interest-reveal"><div className="interest-example-header"><img src={choices[1].image} alt="" /><h3>{choices[1].title}</h3><p>{choices[1].text}</p></div><dl><div><dt>Puissance estimée</dt><dd>26,6 kWc</dd></div><div><dt>Production annuelle estimée</dt><dd>26’968 kWh</dd></div><div><dt>Coût avant aides TTC</dt><dd>60’360 CHF</dd></div><div><dt>Subvention fédérale estimée</dt><dd>− 10’640 CHF</dd></div><div className="interest-total"><dt>Coût après aide fédérale</dt><dd>49’720 CHF</dd></div></dl></article></div><div className="interest-results interest-reveal"><div><strong>6’940 CHF</strong><span>de moins après aide fédérale estimée</span></div><div><strong>+ 53 %</strong><span>de production annuelle estimée</span></div></div><p className="interest-example-note interest-reveal">Résultats des configurations retenues dans cette pré-étude indicative, non contractuelle. Les coûts comprennent les couvertures, les installations photovoltaïques, les connexions électriques, la planification et le transport prévus dans l’estimation. Le périmètre détaillé et les autres travaux de rénovation restent à vérifier. Les montants, aides et performances dépendent du projet et doivent être confirmés après validation technique ; le retour sur investissement nécessite une étude économique propre à chaque solution.</p><div className="interest-example-cta interest-reveal"><strong>Et pour votre toiture ?</strong><a className="btn btn-lg btnlink" href={STUDY_URL} {...EXT}>Découvrir le potentiel de mon toit <Arrow /></a></div></section>
    <section className="interest-law interest-reveal"><div className="eyebrow">Rénovation dans le canton de Vaud</div><h2 className="disp">Le solaire entre dans le projet.</h2><p>À partir du 1er janvier 2027, la nouvelle loi vaudoise sur l’énergie prévoit en principe l’installation de production solaire lors d’une rénovation de toiture. Les exigences et les dérogations dépendent notamment du bâtiment et du projet.</p><a href="https://www.vd.ch/djes/faq-loi-energie-2026" target="_blank" rel="noopener noreferrer">Consulter les informations du canton de Vaud ↗</a></section>
    <section className="interest-value"><div className="interest-reveal"><div className="eyebrow">L’intérêt pour vous</div><h2 className="disp">Une toiture qui fait plus que protéger.</h2></div><div className="interest-value-list"><article className="interest-reveal"><h3>Une rénovation qui produit</h3><p>Le budget de votre nouvelle couverture devient le point de départ d’un projet solaire.</p></article><article className="interest-reveal"><h3>Une toiture qui s’intègre</h3><p>Les tuiles solaires forment une surface homogène, sans panneaux rapportés.</p></article><article className="interest-reveal"><h3>Une énergie qui vous rapporte</h3><p>Consommez votre électricité sur place et valorisez le surplus injecté au réseau.</p></article><article className="interest-reveal"><h3>Un projet adapté à votre budget</h3><p>Investissez directement ou, pour les projets éligibles, découvrez la coproduction.</p></article><article className="interest-reveal"><h3>Un bien valorisé</h3><p>Une toiture solaire intégrée modernise votre bâtiment et peut renforcer son attractivité, tout en produisant de l’énergie pour les années à venir.</p></article></div></section>
    <section className="interest-financing interest-reveal"><div className="eyebrow">Votre projet, votre choix</div><h2 className="disp">Deux façons de financer votre toiture.</h2><p>Investissez directement pour bénéficier de la production et des revenus éventuels, ou découvrez la coproduction pour les projets de rénovation de plus de 30 kWc, sous réserve d’étude.</p><div className="interest-actions"><LinkBtn to="financement">Découvrir la coproduction</LinkBtn><a className="btn btn-lg btnlink interest-secondary" href={STUDY_URL} {...EXT}>Découvrir le potentiel de mon toit <Arrow /></a></div></section>
  </div>;
}

/* ───────────── TUILE SOLAIRE ───────────── */
function PageTuile() {
  const C = CLIMACY;
  const carouselRef = useRef(null);
  const [activeStory, setActiveStory] = useState(0);
  const featureStories = C.features.filter(f => !['Bifacialité', 'Étanchéité renforcée', 'Verre trempé'].includes(f.t));
  const formatStory = {
    video: 'videos/trois-formats-diffuse-glass.mp4',
    t: 'Formats modulaires',
    h: 'Trois formats pour épouser votre géométrie.',
    p: 'Une toiture a rarement les proportions d’un panneau standard. La tuile Climacy se décline en trois formats — entier, demi et quart — qui se combinent pour couvrir toute la surface, jusqu’aux rives, sans bande résiduelle ni découpe disgracieuse.',
  };
  const availableStories = [
    ...C.proof.items,
    ...featureStories,
    formatStory,
    { video: C.selfclean.video, t: 'Entretien', h: C.selfclean.title, p: C.selfclean.body },
  ];
  const storyOrder = [
    'Esthétique intégrée',
    'Installation optimisée',
    'Formats modulaires',
    'Puissance & bifacialité',
    'Étanchéité renforcée',
    'Résistance',
    'Technologie TOPCon',
    'Entretien',
  ];
  const stories = storyOrder.map(title => availableStories.find(story => story.t === title)).filter(Boolean);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = carouselRef.current;
      if (!el) return;
      const navOffset = window.innerWidth < 900 ? 58 : 64;
      const stageHeight = el.querySelector('.ts-stage')?.offsetHeight || (window.innerHeight - navOffset);
      const travel = Math.max(1, el.offsetHeight - stageHeight);
      const passed = Math.min(travel, Math.max(0, navOffset - el.getBoundingClientRect().top));
      const next = Math.round((passed / travel) * (stories.length - 1));
      setActiveStory(current => current === next ? current : next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [stories.length]);

  useEffect(() => {
    const videos = carouselRef.current?.querySelectorAll('video') || [];
    videos.forEach((video, i) => {
      if (i === activeStory) video.play().catch(() => {});
      else video.pause();
    });
  }, [activeStory]);

  const goToStory = (index) => {
    const el = carouselRef.current;
    if (!el) return;
    const navOffset = window.innerWidth < 900 ? 58 : 64;
    const stageHeight = el.querySelector('.ts-stage')?.offsetHeight || (window.innerHeight - navOffset);
    const travel = Math.max(1, el.offsetHeight - stageHeight);
    const start = window.scrollY + el.getBoundingClientRect().top - navOffset;
    const y = start + (travel * index / Math.max(1, stories.length - 1));
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <section className="first tuile-first page-intro-section">
        <div className="tuile-editorial-head page-intro">
          <div className="eyebrow">Caractéristiques</div>
          <h2 className="disp page-intro-title">Conçue pour produire. Pensée pour durer.</h2>
          <p className="page-intro-copy">La performance se joue dans chaque détail. Découvrez ce qui distingue la tuile solaire Climacy.</p>
        </div>
      </section>

      <section
        className="tuile-split-carousel"
        ref={carouselRef}
        style={{ height: `${stories.length * 100}svh` }}
        aria-label="Caractéristiques de la tuile solaire Climacy"
      >
        <div className="ts-stage">
          <div className="ts-media" aria-live="off">
            <div className="ts-track ts-media-track" style={{ transform: `translate3d(0, -${activeStory * 100}%, 0)` }}>
              {stories.map((story, i) => (
                <div className={'ts-media-slide' + (i === activeStory ? ' is-active' : '') + (story.t === 'Formats modulaires' ? ' is-formats' : '')} key={story.t} aria-hidden={i !== activeStory}>
                  <Vid tone="dark" className="ts-video" src={story.video} poster={i === stories.length - 1 ? C.selfclean.poster : undefined} />
                </div>
              ))}
            </div>
          </div>

          <div className="ts-copy">
            <div className="ts-track ts-copy-track" style={{ transform: `translate3d(0, -${activeStory * 100}%, 0)` }}>
              {stories.map((story, i) => (
                <article className={'ts-copy-slide' + (i === activeStory ? ' is-active' : '')} key={story.t} aria-hidden={i !== activeStory}>
                  <div className="eyebrow">{story.t}</div>
                  <h3 className="disp">{story.h}</h3>
                  <p>{story.p}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="ts-pagination" aria-label="Choisir une caractéristique">
            {stories.map((story, i) => (
              <button
                type="button"
                className={i === activeStory ? 'is-active' : ''}
                aria-label={story.t}
                aria-current={i === activeStory ? 'true' : undefined}
                onClick={() => goToStory(i)}
                key={story.t}
              />
            ))}
          </div>

          <div className="ts-arrows">
            <button type="button" aria-label="Caractéristique précédente" disabled={activeStory === 0} onClick={() => goToStory(activeStory - 1)}>↑</button>
            <button type="button" aria-label="Caractéristique suivante" disabled={activeStory === stories.length - 1} onClick={() => goToStory(activeStory + 1)}>↓</button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

/* ───────────── FINANCEMENT ───────────── */
function PageFinancement() {
  const pageRef = useRef(null);
  const eligibility = [
    { icon: 'power', n: '> 30 kWc', k: 'de puissance', p: 'Votre toiture doit pouvoir accueillir une installation de cette puissance. Climacy vérifie son potentiel lors de l’étude.' },
    { icon: 'roof', n: 'Toiture', k: 'à rénover', p: 'Vous prévoyez de refaire la couverture de votre bâtiment.' },
    { icon: 'public', n: 'Vos bâtiments', k: 'collectifs, publics ou professionnels', p: 'Pour les PPE, les immeubles résidentiels et les bâtiments communaux, commerciaux ou industriels.' },
  ];
  const steps = [
    { icon: 'renovation', k: 'Vous préparez votre rénovation', p: 'Vous prévoyez de refaire la toiture de votre bâtiment, avec vos partenaires habituels.' },
    { icon: 'study', k: 'Climacy étudie votre toiture', p: 'Nous évaluons son potentiel solaire, votre consommation et la faisabilité de la coproduction.' },
    { icon: 'budget', k: 'Climacy finance vos tuiles solaires', p: 'Si votre projet est retenu, Climacy finance les tuiles solaires et leur pose, selon les conditions convenues ensemble.' },
    { icon: 'energyOutline', k: 'Vous profitez de l’énergie locale', p: 'Pendant 30 ans, vous pouvez acheter l’électricité produite sur place à un tarif préférentiel. Climacy exploite et suit la centrale.' },
  ];
  const advantages = [
    { icon: 'coproduction', k: 'Tuiles et pose financées', p: 'Climacy finance vos tuiles solaires et leur pose, selon les conditions définies après étude.' },
    { icon: 'budget', k: 'Économies sur la rénovation', p: 'Vous économisez le coût d’une couverture classique et pouvez consacrer cette somme à d’autres travaux.' },
    { icon: 'energyOutline', k: 'Électricité locale avantageuse', p: 'Vous pouvez acheter l’électricité produite sur votre toit à un tarif préférentiel.' },
    { icon: 'longterm', k: 'Production après 30 ans', p: 'À la fin du partenariat, toute la production future de la centrale vous revient.' },
  ];
  const commitments = [
    'Vous restez propriétaire de votre toiture',
    'Climacy s’occupe de la centrale pendant 30 ans',
    'Vous accédez à l’électricité locale à un tarif préférentiel',
    'Après 30 ans, toute la production future vous revient',
  ];
  const faqs = [
    { icon: 'ownership', q: 'Qui reste propriétaire de la toiture ?', a: 'Vous restez propriétaire de votre couverture. Climacy s’occupe uniquement du fonctionnement de l’installation solaire pendant les 30 années du partenariat.' },
    { icon: 'budget', q: 'Comment le prix de l’électricité est-il fixé ?', a: 'Votre tarif préférentiel et son évolution sont définis dès la signature, pour vous donner une visibilité sur le long terme.' },
    { icon: 'building', q: 'Comment cela fonctionne-t-il pour une PPE ?', a: 'Selon vos besoins et votre système de comptage, l’énergie peut alimenter les parties communes et, avec une solution adaptée, les logements. Nous définissons avec vous la meilleure configuration pendant l’étude.' },
    { icon: 'installation', q: 'Qui s’occupe de l’installation solaire ?', a: 'Climacy assure son suivi et son fonctionnement pendant toute la durée du partenariat. Le contrat précise clairement qui intervient sur la couverture et l’étanchéité.' },
    { icon: 'study', q: 'Que finance Climacy ?', a: 'Climacy finance les tuiles solaires et leur pose. L’éligibilité du projet et les conditions du partenariat sont définies après une étude technique et économique.' },
    { icon: 'roof', q: 'Quels autres travaux restent à ma charge ?', a: 'Le périmètre des travaux pris en charge et des autres postes de rénovation est précisé dans la proposition, avant votre engagement.' },
    { icon: 'longterm', q: 'Que se passe-t-il après 30 ans ?', a: 'À la fin du partenariat, toute la production future de la centrale vous revient. Les modalités de fin de partenariat sont précisées dans le contrat.' },
    { icon: 'surplus', q: 'Que deviennent le surplus et la production ?', a: 'Pendant le partenariat, Climacy gère le surplus d’électricité. Après 30 ans, toute la production future de la centrale vous revient.' },
  ];

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const items = [...page.querySelectorAll('.fcp-reveal-item')];
    const heroItems = [...page.querySelectorAll('#financement-intro .fcp-reveal-item')];
    heroItems.forEach(item => item.classList.add('is-visible'));
    page.classList.add('fcp-reveal-ready');

    page.querySelectorAll('.fcp-benefit-grid, .fcp-value-grid, .fcp-flow-track, .fcp-choice-cards, .fcp-faq-grid').forEach(group => {
      [...group.querySelectorAll(':scope > .fcp-reveal-item')].forEach((item, i) => {
        item.style.setProperty('--fcp-reveal-delay', `${i * 90}ms`);
      });
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.04, rootMargin: '0px 0px -6% 0px' });

    items.filter(item => !item.classList.contains('is-visible')).forEach(item => observer.observe(item));
    let frame = 0;
    const revealPassedItems = () => {
      frame = 0;
      items.forEach((item) => {
        if (item.classList.contains('is-visible')) return;
        if (item.getBoundingClientRect().top < window.innerHeight * .92) {
          item.classList.add('is-visible');
          observer.unobserve(item);
        }
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(revealPassedItems);
    };
    revealPassedItems();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="finance-page" ref={pageRef}>
      <section id="financement-intro" className="first fcp-hero fcp-slide-panel">
        <div className="fcp-hero-grid">
          <div className="fcp-hero-copy fcp-reveal-item">
            <div className="eyebrow">Coproduction solaire · plus de 30 kWc</div>
            <h1 className="disp site-hero-title">Rénovez votre toiture.<span>Climacy finance vos tuiles solaires, pose comprise.</span></h1>
            <p>Vous prévoyez de refaire votre toiture ? Climacy peut financer votre nouvelle couverture solaire, tuiles et pose comprises. Vous économisez sur votre rénovation et profitez de l’électricité produite sur votre toit à un tarif préférentiel. Vous restez propriétaire de votre toiture, tandis que Climacy exploite et suit la centrale pendant 30 ans.</p>
            <a className="btn btn-lg btnlink" href={STUDY_URL} {...EXT}>Vérifier l’éligibilité de mon projet<Arrow /></a>
          </div>
          <div className="fcp-hero-visual fcp-reveal-item">
            <Img tone="dark" src="assets/photos/renens-stade.png" alt="Grande toiture solaire Climacy intégrée à un bâtiment collectif" />
            <div className="fcp-zero">
              <FinanceIcon kind="coproduction" />
              <span><strong>Vos tuiles solaires financées</strong>Climacy prend en charge les tuiles solaires et leur pose, après étude de votre projet.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="financement-eligibilite" className="fcp-benefits fcp-slide-panel">
        <div className="fcp-section-head fcp-reveal-item">
          <div className="eyebrow">Votre projet est-il éligible&nbsp;?</div>
          <h2 className="disp">Une solution pour les toitures à rénover.</h2>
          <p>La coproduction solaire s’adresse aux projets de rénovation pouvant accueillir une installation de plus de 30 kWc. Climacy vérifie le potentiel de votre toiture lors de l’étude.</p>
        </div>
        <div className="fcp-benefit-grid">
          {eligibility.map((b, i) => (
            <article className="fcp-benefit fcp-reveal-item" key={b.k}>
              <div className="fcp-benefit-top"><FinanceIcon kind={b.icon} /><span>0{i + 1}</span></div>
              <div className="fcp-benefit-n disp">{b.n}</div>
              <h3>{b.k}</h3>
              <p>{b.p}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="financement-principe" className="fcp-flow fcp-slide-panel">
        <div className="fcp-flow-title fcp-reveal-item">
          <div className="eyebrow">Le principe</div>
          <h2 className="disp">Votre nouvelle couverture solaire, <span>financée par Climacy.</span></h2>
        </div>
        <div className="fcp-value-panel">
          <div className="fcp-value-head fcp-reveal-item">
            <span>Vos bénéfices</span>
            <strong className="disp">Aujourd’hui et pendant 30 ans.</strong>
          </div>
          <div className="fcp-value-grid">
            {advantages.map(item => (
              <article className="fcp-reveal-item" key={item.k}>
                <FinanceIcon kind={item.icon} accent />
                <h3>{item.k}</h3>
                <p>{item.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fcp-flow fcp-steps-section fcp-slide-panel">
        <div className="fcp-steps-heading fcp-reveal-item">
          <div className="eyebrow">Votre projet, étape par étape</div>
          <h2 className="disp">Comment ça marche ?</h2>
        </div>
        <div className="fcp-flow-track">
          {steps.map((s, i) => (
            <article className="fcp-step fcp-reveal-item" key={s.k}>
              <div className="fcp-step-top"><FinanceIcon kind={s.icon} /><span>0{i + 1}</span><i aria-hidden="true" /></div>
              <h3 className="disp">{s.k}</h3>
              <p>{s.p}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="financement-comparaison" className="fcp-choice fcp-slide-panel">
        <div className="fcp-choice-head fcp-reveal-item">
          <div>
            <div className="eyebrow">Deux façons de rénover</div>
            <h2 className="disp">Choisissez la solution <span>qui vous convient.</span></h2>
          </div>
          <p>Vous pouvez investir dans votre toiture solaire ou choisir la coproduction. Dans les deux cas, vous bénéficiez de la même technologie Climacy.</p>
        </div>
        <div className="fcp-choice-cards">
          <article className="fcp-reveal-item">
            <FinanceIcon kind="investment" />
            <div>
              <h3 className="disp">Vous voulez maximiser le rendement&nbsp;?</h3>
              <strong>Investissement direct</strong>
              <p>Vous financez votre toiture solaire et bénéficiez de sa production et des revenus éventuels dès le premier jour.</p>
            </div>
          </article>
          <article className="is-coprod fcp-reveal-item">
            <FinanceIcon kind="coproduction" />
            <div>
              <h3 className="disp">Vous préférez préserver votre budget&nbsp;?</h3>
              <strong>Coproduction</strong>
              <p>Climacy finance vos tuiles solaires et leur pose. Vous économisez sur votre rénovation et profitez d’une électricité locale à tarif préférentiel.</p>
            </div>
          </article>
        </div>
        <div className="fcp-owner-strip fcp-reveal-item">
          <FinanceIcon kind="project" />
          <div>
            <strong className="disp">Un partenariat clair pour 30 ans.</strong>
            <ul>
              {commitments.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <p className="fcp-note fcp-reveal-item">Sous réserve d’étude technique et économique. L’éligibilité et les conditions du partenariat dépendent notamment de votre toiture, de la puissance installable et de votre consommation d’électricité.</p>
        <div className="fcp-faq-grid">
          {faqs.map(item => (
            <details className="faq-item fcp-faq fcp-reveal-item" key={item.q}>
              <summary><span>{item.q}</span><span className="pm" aria-hidden="true" /></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <a className="fcp-final fcp-reveal-item" href={STUDY_URL} {...EXT}>
          <span><small>Rénovation · plus de 30 kWc</small><strong className="disp">Votre toiture est-elle éligible ?</strong></span>
          <b>Vérifier mon éligibilité <Arrow /></b>
        </a>
      </section>
    </div>
  );
}

/* ───────────── RÉALISATIONS ───────────── */
function PageRealisations() {
  const C = CLIMACY;
  const shots = C.installs.shots;
  const tile = (s, i, extra) => (
    <div className={'shot' + (s.mystery ? ' mystery' : '') + (extra || '')} key={i}
      style={{ '--shot-position': s.position || '50% 50%', '--shot-scale': s.zoom || 1, '--shot-hover-scale': s.zoomHover || 1.04 }}>
      {s.mystery && <div className="veil" aria-hidden="true"><span>En cours</span></div>}
      <Img tone="dark" src={s.img} alt={s.cap} style={{ height: '100%' }} />
      {s.info ? (
        <div className="cap" style={{ padding: '40px 18px 16px', lineHeight: 1.7 }}>
          <div>{s.info[0]}{s.status && <span className="shot-status">{s.status}</span>}</div>
          {s.info[1] && <div style={{ color: 'var(--warm)' }}>{s.info[1]}</div>}
        </div>
      ) : (
        <div className="cap">{s.cap}</div>
      )}
    </div>
  );
  return (
    <section className="first page-intro-section">
      <div className="seclead page-intro">
        <div className="eyebrow">{C.installs.eyebrow}</div>
        <h2 className="disp page-intro-title">{C.installs.title}</h2>
        <p className="page-intro-copy">{C.installs.intro}</p>
      </div>
      <div className="installs-grid real-grid">
        {shots.map((s, i) => tile(s, i))}
      </div>
      <a className="grid-cta" href={STUDY_URL} {...EXT}>
        <div>
          <div className="eyebrow">{C.cta.eyebrow}</div>
          <div className="disp gc-title">{C.cta.title[0]} <span>{C.cta.title[1]}</span></div>
        </div>
        <span className="gc-btn">{CTA_ROUTE.label}<Arrow /></span>
      </a>
    </section>
  );
}

// Galerie défilante : deux bandes en fil continu, en sens opposés. Pause au survol.
function Marquee({ shots, link }) {
  const rows = [shots];
  const card = (s, i, dup) => (
    <a className={'mq-card' + (s.mystery ? ' mystery' : '')} key={(dup ? 'd' : '') + i} href={link || undefined}
      style={{ '--shot-position': s.position || '50% 50%', '--shot-scale': s.zoom || 1, '--shot-hover-scale': s.zoomHover || 1.04 }}
      aria-hidden={dup ? 'true' : undefined} tabIndex={dup ? -1 : undefined}>
      {s.mystery && <div className="veil" aria-hidden="true"><span>En cours</span></div>}
      <img src={s.img} alt={dup ? '' : s.cap} loading="lazy" decoding="async" />
      <div className="mq-cap">
        <div>{s.info ? s.info[0] : s.cap}{s.status && <span className="shot-status">{s.status}</span>}</div>
        {s.info?.[1] && <div className="mq-num">{s.info[1]}</div>}
      </div>
    </a>
  );
  return (
    <div className="marquee">
      {rows.map((row, r) => (
        <div className={'mq-row' + (r % 2 ? ' rev' : '')} key={r}
          style={{ ['--mq-dur']: (row.length * 7) + 's' }}>
          <div className="mq-track">
            {row.map((s, i) => card(s, i, false))}
            {row.map((s, i) => card(s, i, true))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────── POUR QUI ───────────── */
function PageProprio() {
  const C = CLIMACY;
  return (
    <React.Fragment>
      <section className="first" style={{ paddingBottom: 0 }}>
        <div className="seclead proprio-hero">
          <h2 className="disp"><T s={C.hero.proprio.title} /></h2>
          <p>{C.hero.proprio.sub}</p>
        </div>
      </section>
      <section style={{ paddingBottom: 0 }}>
        <div className="seclead">
          <div className="eyebrow">{C.moment.eyebrow}</div>
          <h2 className="disp"><T s={C.moment.title} /></h2>
          <p>{C.moment.body}</p>
        </div>
        <div className="moment-split">
          <Img tone="dark" className="mimg" src="assets/photos/renovation.jpg" alt="Toiture en cours de rénovation, échafaudage monté" />
          <div className="mtext">
            {C.moment.cols.map((c, i) => <div className="col" key={i}><h3 className="disp">{c.h}</h3><p>{c.p}</p></div>)}
          </div>
        </div>
      </section>

      <Rule />

      <section>
        <div className="seclead">
          <div className="eyebrow">{C.how.eyebrow}</div>
          <h2 className="disp"><T s={C.how.title} /></h2>
          <p>{C.how.body}</p>
        </div>
        <div className="how-steps">
          {C.how.steps.map((s, i) => (
            <div className="s" key={i}><div className="num">0{i + 1}</div><h4 className="disp">{s.k}</h4><p>{s.p}</p></div>
          ))}
        </div>
        <div className="quote">
          <div className="eyebrow lbl">{C.how.quoteLabel}</div>
          <q className="disp">{C.how.quote}</q>
        </div>
      </section>
    </React.Fragment>
  );
}

/* ───────────── RESSOURCES ───────────── */
/* ───────────── POUR QUI : sous-onglets ───────────── */
const AUD_TABS = [
  { id: 'pour-qui', label: 'Propriétaires', d: 'Maison individuelle' },
  { id: 'architectes', label: 'Architectes', d: 'Neuf et rénovation' },
  { id: 'ppe', label: 'PPE et régies', d: 'Copropriétés' },
];

// En-tête de « Pour qui » : un vrai titre, puis trois profils au choix
function AudTabs({ tab }) {
  return (
    <div className="aud-head">
      <h1 className="disp">Pour qui ?</h1>
      <div className="aud-pick" role="tablist">
        {AUD_TABS.map(t => (
          <a key={t.id} role="tab" aria-selected={tab === t.id} href={go(t.id)} className={tab === t.id ? 'on' : ''}>
            <span className="l">{t.label}</span>
            <span className="d">{t.d}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function PagePourQui() { return <React.Fragment><AudTabs tab="pour-qui" /><PageProprio /></React.Fragment>; }

// Petits blocs réutilisés par les pages Architectes et PPE
function Lead({ b, wide }) {
  return (
    <div className={'seclead' + (wide ? ' is-wide' : '')}>
      <div className="eyebrow">{b.eyebrow}</div>
      <h2 className="disp"><T s={b.title} /></h2>
      {Array.isArray(b.body) ? b.body.map((t, i) => <p key={i}>{t}</p>) : (b.body && <p>{b.body}</p>)}
    </div>
  );
}
function Intro({ b }) {
  return (
    <div className="aud-intro">
      <div>
        <div className="eyebrow">{b.eyebrow}</div>
        <h2 className="disp"><T s={b.title} /></h2>
      </div>
      <div className="aud-intro-body">{(Array.isArray(b.body) ? b.body : [b.body]).map((t, i) => <p key={i}>{t}</p>)}</div>
    </div>
  );
}
function Cols({ items }) {
  return (
    <div className="aud-cols">
      {items.map((c, i) => <div key={i}><h4 className="disp">{c.h}</h4>{c.list ? <ul className="aud-list">{c.list.map((l, j) => <li key={j}>{l}</li>)}</ul> : <p>{c.p}</p>}</div>)}
    </div>
  );
}
function Boxes({ items, n }) {
  return (
    <div className="aud-boxes" style={{ gridTemplateColumns: 'repeat(' + (n || items.length) + ', 1fr)' }}>
      {items.map((c, i) => (
        <div className="b" key={i}>
          {c.t && <div className="t">{c.t}</div>}
          <h4 className="disp">{c.h}</h4>
          <p>{c.p}</p>
          {c.r && <div className="r">{c.r}</div>}
        </div>
      ))}
    </div>
  );
}
function Tagline({ t }) {
  const lines = Array.isArray(t) ? t : [t];
  return <div className="aud-tag disp">{lines.map((l, i) => <span key={i}>{l}</span>)}</div>;
}
function Eq({ items, label }) {
  const cols = items.map((it, i) => (i === 0 ? '1fr' : '48px 1fr')).join(' ');
  return (
    <React.Fragment>
      {label && <div className="fin-label">{label}</div>}
      <div className="fin-eq" style={{ gridTemplateColumns: cols }}>
        {items.map((r, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div className="op" aria-hidden="true">{r.op}</div>}
            <div className={'box' + (r.hl ? ' hl' : '')}>
              <div className="k">{r.k}</div>
              <div className="v disp">{r.v} <span>CHF</span></div>
              {r.note && <div className="note">{r.note}</div>}
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}
function Highlights({ items }) {
  return (
    <div className="fin-hl3" style={{ gridTemplateColumns: 'repeat(' + items.length + ', 1fr)' }}>
      {items.map((h, i) => <div className="h" key={i}><div className="n disp">{h.n}</div><div className="u">{h.u}</div><div className="d">{h.d}</div></div>)}
    </div>
  );
}
function Steps({ items }) {
  return (
    <div className="coprod-steps" style={{ gridTemplateColumns: 'repeat(' + items.length + ', 1fr)' }}>
      {items.map((s, i) => <div className="cs" key={i}><div className="n">0{i + 1}</div><h5 className="disp">{s.k}</h5><p>{s.p}</p></div>)}
    </div>
  );
}
function EndCta() {
  const C = CLIMACY;
  return (
    <a className="grid-cta" href={STUDY_URL} {...EXT}>
      <div>
        <div className="eyebrow">{C.cta.eyebrow}</div>
        <div className="disp gc-title">{C.cta.title[0]} <span>{C.cta.title[1]}</span></div>
      </div>
      <span className="gc-btn">{CTA_ROUTE.label}<Arrow /></span>
    </a>
  );
}

/* ───────────── POUR QUI · ARCHITECTES ───────────── */
function PageProfessionnels() {
  const formats = [
    { name: 'CLIM L', description: 'Tuile entière', dimensions: '1’856 × 1’128 × 22 mm', power: '455 Wc', weight: '31 kg', image: '/assets/modules/climacy-l.png' },
    { name: 'CLIM M', description: 'Demi-tuile', dimensions: '978 × 1’128 × 22 mm', power: '225 Wc', weight: '15 kg', image: '/assets/modules/climacy-m.png' },
    { name: 'CLIM S', description: 'Quart de tuile', dimensions: '539 × 1’128 × 22 mm', power: '110 Wc', weight: '8,4 kg', image: '/assets/modules/climacy-s.png' },
  ];
  return <div className="pro-page">
    <section className="pro-intro first">
      <div className="eyebrow">Architectes · couvreurs · professionnels du bâtiment</div>
      <h1 className="disp site-hero-title">Une toiture solaire pensée pour votre projet.</h1>
      <p>En rénovation comme en construction neuve, les tuiles Climacy deviennent la couverture du bâtiment. Nous vous accompagnons pour concevoir leur implantation et les intégrer à votre projet.</p>
      <a className="btn btn-lg btnlink" href="mailto:info@climacy.ch?subject=Projet%20professionnel">Parler de mon projet <Arrow /></a>
    </section>
    <section className="pro-formats">
      <div className="eyebrow">Trois formats complémentaires</div>
      <h2 className="disp">Une solution adaptée à la toiture.</h2>
      <p>Entière, demi ou quart : les tuiles se combinent pour s’adapter à la géométrie du toit et composer une couverture solaire harmonieuse.</p>
      <div className="pro-format-grid">{formats.map(format => <article key={format.name}>
        <div className="pro-format-visual"><img src={format.image} alt={format.description + ' Climacy'} /></div>
        <h3 className="disp">{format.name}</h3><p>{format.description}</p><dl className="pro-format-data"><div><dt>Puissance</dt><dd>{format.power}</dd></div><div><dt>Dimensions</dt><dd>{format.dimensions}</dd></div><div><dt>Poids</dt><dd>{format.weight}</dd></div></dl>
      </article>)}</div>
      <div className="pro-specs"><h3 className="disp">L’essentiel en commun</h3><ul><li>Cellules TOPCon bifaciales</li><li>Double verre trempé</li><li>Encapsulant TPO haut de gamme</li><li>Grêle : classe HW4</li><li>Garantie produit : 10 ans</li><li>Plus de 85 % de puissance garantie après 30 ans</li></ul><p>Puissances nominales en conditions de test standard. Données indicatives sujettes à modification.</p><a className="btn btnlink" href="/assets/modules/fiche-technique-climacy.pdf" target="_blank" rel="noopener noreferrer">Voir la fiche technique complète <Arrow /></a></div>
    </section>
    <section className="pro-support">
      <div className="eyebrow">À vos côtés</div><h2 className="disp">Du calepinage aux détails de toiture.</h2>
      <div className="pro-support-grid"><article><h3 className="disp">Un calepinage sur mesure</h3><p>Climacy établit le plan d’implantation des tuiles pour chaque toiture, en tenant compte de sa géométrie, de l’esthétique et de la production.</p></article><article><h3 className="disp">Des finitions soignées</h3><p>Rives, raccords de ferblanterie, faîtages et égouts : les détails sont étudiés pour assurer la cohérence de la toiture.</p></article></div>
      <a className="btn btn-lg btnlink" href="mailto:info@climacy.ch?subject=Projet%20professionnel">Discuter de mon projet <Arrow /></a>
    </section>
  </div>;
}

function PageArchitectes() {
  const A = CLIMACY.audiences.architectes;
  return (
    <React.Fragment>
      <AudTabs tab="architectes" />
      <section className="aud-first">
        <Intro b={A.context} />
        <Boxes items={A.context.cols} />
        <Tagline t={A.context.tagline} />
      </section>
      <Rule />
      <section>
        <Lead b={A.integration} />
        <div className="aud-vs">
          {A.integration.compare.map((c, i) => (
            <div key={i} className={'v' + (i === 1 ? ' good' : '')}><div className="t">{c.h}</div><p>{c.p}</p></div>
          ))}
        </div>
        <Tagline t={A.integration.tagline} />
      </section>
      <Rule />
      <section>
        <Lead b={A.formats} />
        <Cols items={A.formats.cols} />
        <div className="aud-table">
          {A.formats.table.map((r, i) => (
            <div className="row" key={i}><div className="k disp">{r.k}</div><div className="d">{r.d}</div><div className="dim">{r.dim}</div><div className="w">{r.w}</div></div>
          ))}
        </div>
      </section>
      <section className="coprod">
        <Lead b={A.client} />
        <Boxes items={A.client.boxes} />
      </section>
      <section>
        <Lead b={A.support} />
        <Boxes items={A.support.boxes} n={3} />
      </section>
      <Rule />
      <section>
        <Lead b={A.together} />
        <Steps items={A.together.steps} />
        <EndCta />
      </section>
    </React.Fragment>
  );
}

/* ───────────── POUR QUI · PPE ET RÉGIES ───────────── */
function PagePPE() {
  const P = CLIMACY.audiences.ppe;
  return (
    <React.Fragment>
      <AudTabs tab="ppe" />
      <section className="aud-first">
        <Intro b={P.context} />
        <Boxes items={P.context.cols} />
        <Tagline t={P.context.tagline} />
      </section>
      <section className="coprod aud-concrete">
        <div className="eyebrow">{P.concrete.eyebrow}</div>
        <p className="disp big">{P.concrete.text}</p>
      </section>
      <section>
        <Lead b={P.share} />
        <div className="aud-top">{P.share.top}</div>
        <Boxes items={P.share.boxes} />
        <div className="coprod-faq">
          <div className="qa"><q className="disp">{P.share.faq.q}</q><p>{P.share.faq.a}</p></div>
        </div>
      </section>
      <Rule />
      <section>
        <Lead b={P.regie} />
        <ul className="aud-check">
          {P.regie.items.map((it, i) => <li key={i}><strong>{it.h}</strong> : {it.p}</li>)}
        </ul>
        <Tagline t={P.regie.tagline} />
        <EndCta />
      </section>
    </React.Fragment>
  );
}

function PageRessources() {
  const C = CLIMACY;
  const resourcesRef = useRef(null);
  useEffect(() => {
    const root = resourcesRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = [...root.querySelectorAll('.resources-reveal')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .05 });
    items.forEach(item => observer.observe(item));
    root.classList.add('resources-reveal-ready');
    return () => observer.disconnect();
  }, []);
  return (
    <section className="first resources-page" ref={resourcesRef}>
      <div className="seclead">
        <div className="eyebrow">Ressources</div>
        <h2 className="disp">Questions fréquentes</h2>
      </div>
      <div className="faq">
        {C.faq.map((g, i) => (
          <div className="faq-group resources-reveal" key={i}>
            <div className="faq-theme">{g.theme}</div>
            <div className="faq-list">
              {g.items.map((f, j) => (
                <details className="faq-item" key={j} open={i === 0 && j === 0}>
                  <summary><span>{f.q}</span><span className="pm" aria-hidden="true"></span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
      <EndCta />
    </section>
  );
}

/* ───────────── À PROPOS ───────────── */
function PageAPropos() {
  const A = CLIMACY.about;
  const F = A.founder;
  const team = [A.cofounder, F, A.cto, A.sales, A.marketing];
  const teamCarouselRef = useRef(null);
  const [activePerson, setActivePerson] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = teamCarouselRef.current;
      if (!el) return;
      const navOffset = window.innerWidth < 900 ? 64 : 72;
      const stageHeight = el.querySelector('.abv-stage')?.offsetHeight || (window.innerHeight - navOffset);
      const travel = Math.max(1, el.offsetHeight - stageHeight);
      const passed = Math.min(travel, Math.max(0, navOffset - el.getBoundingClientRect().top));
      const next = Math.round((passed / travel) * (team.length - 1));
      setActivePerson(current => current === next ? current : next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [team.length]);

  const goToPerson = (index) => {
    const el = teamCarouselRef.current;
    if (!el) return;
    const navOffset = window.innerWidth < 900 ? 64 : 72;
    const stageHeight = el.querySelector('.abv-stage')?.offsetHeight || (window.innerHeight - navOffset);
    const travel = Math.max(1, el.offsetHeight - stageHeight);
    const start = window.scrollY + el.getBoundingClientRect().top - navOffset;
    const y = start + (travel * index / Math.max(1, team.length - 1));
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <section className="first ab-hero page-intro-section">
        <div className="eyebrow">{A.eyebrow}</div>
        <h2 className="disp ab-title page-intro-title">{A.title[0]} <span className="l2">{A.title[1]}</span></h2>
        <p className="ab-intro page-intro-copy">{A.history.body}</p>
        <div className="stats ab-facts">
          {A.history.facts.map((f, i) => (
            <div className="stat" key={i}><div className="n disp">{f.n}</div><div className="d">{f.d}</div></div>
          ))}
        </div>
      </section>

      <section className="ab-team-lead">
        <div className="eyebrow">L’équipe Climacy</div>
        <h2 className="disp">Une équipe. <span>Des expertises complémentaires.</span></h2>
      </section>

      <section
        className="abv-carousel"
        ref={teamCarouselRef}
        style={{ height: `${team.length * 100}svh` }}
        aria-label="L’équipe Climacy"
      >
        <div className="abv-stage">
          <div className="abv-visual" aria-live="off">
            <div className="abv-track" style={{ transform: `translate3d(0, -${activePerson * 100}%, 0)` }}>
              {team.map((P, i) => (
                <div className={'abv-visual-slide' + (i === activePerson ? ' is-active' : '')} key={P.name} aria-hidden={i !== activePerson}>
                  <div className="abv-portrait-frame">
                    {P.img ? <img src={P.img} alt={P.name} /> : <span className="disp" aria-hidden="true">{P.initials}</span>}
                    <div className="abv-count"><b>0{i + 1}</b><span>/</span><em>0{team.length}</em></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="abv-copy">
            <div className="abv-track" style={{ transform: `translate3d(0, -${activePerson * 100}%, 0)` }}>
              {team.map((P, i) => (
                <article className={'abv-copy-slide' + (i === activePerson ? ' is-active' : '')} key={P.name} aria-hidden={i !== activePerson}>
                  <div className="eyebrow">{P.eyebrow}</div>
                  <h2 className="disp">{P.name}</h2>
                  <div className="abv-role">{P.role}</div>
                  <div className="abv-bio">{P.bio.map((t, j) => <p key={j}>{t}</p>)}</div>
                  {P.qa && (
                    <div className="abv-quote">
                      <div>{P.qa.q}</div>
                      <q className="disp">{P.qa.a}</q>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="abv-pagination" aria-label="Choisir un membre de l’équipe">
            {team.map((P, i) => (
              <button
                type="button"
                className={i === activePerson ? 'is-active' : ''}
                aria-label={P.name}
                aria-current={i === activePerson ? 'true' : undefined}
                onClick={() => goToPerson(i)}
                key={P.name}
              />
            ))}
          </div>

          <div className="abv-arrows">
            <button type="button" aria-label="Profil précédent" disabled={activePerson === 0} onClick={() => goToPerson(activePerson - 1)}>↑</button>
            <button type="button" aria-label="Profil suivant" disabled={activePerson === team.length - 1} onClick={() => goToPerson(activePerson + 1)}>↓</button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

/* ───────────── CONTACT ───────────── */
function PageContact() {
  const C = CLIMACY;
  return (
    <section className="endcta" style={{ height: 820 }}>
      <Img tone="dark" className="bg" src="assets/photos/villa_aerial.jpg" alt="Maison contemporaine avec toiture solaire Climacy" />
      <div className="inner">
        <div className="eyebrow">{C.cta.eyebrow}</div>
        <h2 className="disp">{C.cta.title[0]} <span className="l2">{C.cta.title[1]}</span></h2>
        <p>{C.cta.body}</p>
        <a className="btn btn-lg btnlink" href={STUDY_URL} {...EXT}>{C.cta.button}<Arrow /></a>
        <div className="contactline">
          <a href={'tel:' + C.contact.phone.replace(/\s/g, '')}>{C.contact.phone}</a>
          <a href={'mailto:' + C.contact.email}>{C.contact.email}</a>
          <span>{C.contact.addr[0]}, {C.contact.addr[1]}</span>
        </div>
      </div>
    </section>
  );
}

const PAGES = {
  'accueil': PageAccueil, 'tuile': PageTuile, 'interet': PageInteret, 'financement': PageFinancement, 'realisations': PageRealisations,
  'pour-qui': PagePourQui, 'professionnels': PageProfessionnels, 'architectes': PageArchitectes, 'ppe': PagePPE, 'ressources': PageRessources, 'apropos': PageAPropos, 'contact': PageContact,
};

function Site({ route, heroMedia }) {
  const Page = PAGES[route] || PageAccueil;
  return (
    <div className={`cpage cin route-${route}`} key={route}>
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <SiteNav route={route} />
      <main id="main-content" className="pagefade"><Page heroMedia={heroMedia} /></main>
      <SiteFooter />
      <a className="whatsapp-float" href="https://wa.me/41782495999" target="_blank" rel="noopener noreferrer" aria-label="Contacter Climacy sur WhatsApp (nouvel onglet)">
        <img src="/assets/icons-finance/whatsapp.svg" alt="" />
      </a>
    </div>
  );
}

export { Site, ROUTES, PAGES };
