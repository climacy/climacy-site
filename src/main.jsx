import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Site, PAGES, ROUTES } from '../pages/site.jsx';
import '../climacy.css';

const PATH_TO_ROUTE = {
  '/': 'accueil',
  '/accueil/': 'accueil',
  '/tuile/': 'tuile',
  '/interet/': 'interet',
  '/realisations/': 'realisations',
  '/pour-qui/': 'pour-qui',
  '/professionnels/': 'professionnels',
  '/architectes/': 'architectes',
  '/ppe/': 'ppe',
  '/financement/': 'financement',
  '/ressources/': 'ressources',
  '/a-propos/': 'apropos',
  '/contact/': 'contact',
};

function normalizePath(pathname) {
  const clean = pathname.replace(/\/index\.html$/, '/');
  return clean.endsWith('/') ? clean : `${clean}/`;
}

function readRoute() {
  const hashRoute = (window.location.hash || '').replace(/^#\/?/, '');
  if (PAGES[hashRoute]) return hashRoute;
  return PATH_TO_ROUTE[normalizePath(window.location.pathname)] || 'accueil';
}

function App() {
  const [route, setRoute] = useState(readRoute());

  useEffect(() => {
    const onLocationChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onLocationChange);
    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('hashchange', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  useEffect(() => {
    const extra = { architectes: 'Architectes', ppe: 'PPE et régies' };
    const current = ROUTES.find((item) => item.id === route);
    document.title = `Climacy · ${extra[route] || current?.label || 'Accueil'}`;
  }, [route]);

  return <Site route={route} heroMedia="video" />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const stage = document.getElementById('stage');
const wrap = document.getElementById('stage-wrap');
const root = document.getElementById('root');
const mobile = window.matchMedia('(max-width: 899px)');

function fitStage() {
  stage.classList.add('stage-fluid');
  wrap.classList.add('stage-fluid-wrap');
  stage.style.transform = 'none';
  wrap.style.height = 'auto';
}

mobile.addEventListener?.('change', fitStage);
new ResizeObserver(fitStage).observe(root);
window.addEventListener('resize', fitStage, { passive: true });
window.addEventListener('load', fitStage, { once: true });
document.fonts?.ready.then(fitStage);
requestAnimationFrame(() => requestAnimationFrame(fitStage));
