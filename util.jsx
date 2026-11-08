import React from 'react';
import { CLIMACY } from './content.js';

// Shared atoms for the Climacy landing-page directions.
// Exported to window so each direction file can use them.

const MARK_SRC = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22173%22%20zoomAndPan%3D%22magnify%22%20viewBox%3D%220%200%20129.75%20170.249993%22%20height%3D%22227%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20version%3D%221.0%22%3E%3Cdefs%3E%3CclipPath%20id%3D%22863368b98d%22%3E%3Cpath%20d%3D%22M%200.300781%200.371094%20L%20122.402344%200.371094%20L%20122.402344%20160.632812%20L%200.300781%20160.632812%20Z%20M%200.300781%200.371094%20%22%20clip-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%22b025f6abaa%22%3E%3Cpath%20d%3D%22M%20122.402344%200.371094%20L%200.300781%200.371094%20L%200.300781%20160.636719%20L%20122.402344%20160.636719%20L%20122.402344%2083.429688%20L%2072.738281%2084.632812%20C%2068.703125%2084.828125%2066.140625%2086.703125%2066.046875%2090.492188%20L%2063.347656%20138.808594%20C%2063.292969%20139.800781%2062.472656%20140.574219%2061.480469%20140.574219%20C%2060.488281%20140.574219%2059.667969%20139.800781%2059.613281%20138.808594%20L%2056.914062%2090.492188%20C%2056.738281%2083.5%2056.738281%2077.28125%2056.914062%2070.289062%20L%2059.613281%2021.972656%20C%2059.667969%2020.980469%2060.488281%2020.203125%2061.480469%2020.203125%20C%2062.472656%2020.203125%2063.292969%2020.980469%2063.347656%2021.972656%20L%2066.046875%2070.289062%20C%2066.1875%2075.910156%2068.65625%2077.644531%2072.738281%2077.84375%20L%20122.402344%2079.042969%20Z%20M%20122.402344%200.371094%20%22%20clip-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%22cf26eda786%22%3E%3Cpath%20d%3D%22M%200.300781%200.371094%20L%20122.402344%200.371094%20L%20122.402344%20160.632812%20L%200.300781%20160.632812%20Z%20M%200.300781%200.371094%20%22%20clip-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%227806d5c465%22%3E%3Cpath%20d%3D%22M%20122.402344%200.371094%20L%200.300781%200.371094%20L%200.300781%20160.636719%20L%20122.402344%20160.636719%20L%20122.402344%2083.429688%20L%2072.738281%2084.632812%20C%2068.703125%2084.828125%2066.140625%2086.703125%2066.046875%2090.492188%20L%2063.347656%20138.808594%20C%2063.292969%20139.800781%2062.472656%20140.574219%2061.480469%20140.574219%20C%2060.488281%20140.574219%2059.667969%20139.800781%2059.613281%20138.808594%20L%2056.914062%2090.492188%20C%2056.738281%2083.5%2056.738281%2077.28125%2056.914062%2070.289062%20L%2059.613281%2021.972656%20C%2059.667969%2020.980469%2060.488281%2020.203125%2061.480469%2020.203125%20C%2062.472656%2020.203125%2063.292969%2020.980469%2063.347656%2021.972656%20L%2066.046875%2070.289062%20C%2066.1875%2075.910156%2068.65625%2077.644531%2072.738281%2077.84375%20L%20122.402344%2079.042969%20Z%20M%20122.402344%200.371094%20%22%20clip-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%2264a722e569%22%3E%3Crect%20x%3D%220%22%20width%3D%22123%22%20y%3D%220%22%20height%3D%22161%22%3E%3C%2Frect%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%221407ee92bc%22%3E%3Crect%20x%3D%220%22%20width%3D%22123%22%20y%3D%220%22%20height%3D%22161%22%3E%3C%2Frect%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20transform%3D%22matrix(1%2C%200%2C%200%2C%201%2C%204%2C%204)%22%3E%3Cg%20clip-path%3D%22url(%231407ee92bc)%22%3E%3Cg%20clip-path%3D%22url(%23863368b98d)%22%3E%3Cg%20clip-path%3D%22url(%23b025f6abaa)%22%3E%3Cg%20transform%3D%22matrix(1%2C%200%2C%200%2C%201%2C%20-0.000000000000000888%2C%20-0.000000000000000888)%22%3E%3Cg%20clip-path%3D%22url(%2364a722e569)%22%3E%3Cg%20clip-path%3D%22url(%23cf26eda786)%22%3E%3Cg%20clip-path%3D%22url(%237806d5c465)%22%3E%3Cpath%20fill%3D%22%23231f20%22%20d%3D%22M%200.300781%200.371094%20L%20122.402344%200.371094%20L%20122.402344%20160.632812%20L%200.300781%20160.632812%20Z%20M%200.300781%200.371094%20%22%20fill-opacity%3D%221%22%20fill-rule%3D%22nonzero%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\")";

function Logo({ dark, size }) {
  return (
    <span className={'logo' + (dark ? ' on-dark' : '')}>
      <span className="mark" style={{ ['--mark-src']: MARK_SRC, width: (size || 26), height: (size || 26) * 1.27 }}></span>
      <span className="word">climacy</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg className="arr" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 5h15M12 1l4 4-4 4"></path>
    </svg>
  );
}

// Placeholder image block. tone: 'light' | 'dark'. label = monospace caption.
function Ph({ label, tone, style, className }) {
  return (
    <div className={'ph' + (tone === 'dark' ? ' ph-dark' : '') + (className ? ' ' + className : '')} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

// Looping muted video block, same footprint as <Ph>. poster gives a clean
// first paint and a fallback frame.
function Vid({ src, poster, tone, style, className }) {
  return (
    <div className={'ph vid' + (tone === 'dark' ? ' ph-dark' : '') + (className ? ' ' + className : '')} style={style}>
      <video className="vidEl" autoPlay muted loop playsInline preload="metadata" poster={poster} src={src}></video>
    </div>
  );
}

// Real photo block, same footprint as <Ph>/<Vid>.
function Img({ src, alt, tone, style, className, eager = false }) {
  return (
    <div className={'ph' + (tone === 'dark' ? ' ph-dark' : '') + (className ? ' ' + className : '')} style={style}>
      <img className="coverimg" src={src} alt={alt || ''} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </div>
  );
}

function Btn({ children, ghost, lg, dark }) {
  return (
    <button className={'btn' + (ghost ? ' btn-ghost' : '') + (lg ? ' btn-lg' : '')}>
      {children}
      {!ghost && <Arrow />}
    </button>
  );
}

// Footer is structurally shared; skin classes style it per direction.
function Footer({ dark }) {
  const f = CLIMACY.footer;
  return (
    <footer>
      <div className="fcol brandcol">
        <Logo dark={dark} size={24} />
        <div className="word" style={{ display: 'none' }}></div>
        <div className="addr">{f.addr}<br />{f.tag}</div>
        <div className="claim">{CLIMACY.claim}</div>
      </div>
      {f.cols.map((c, i) => (
        <div className="fcol" key={i}>
          <h5>{c.h}</h5>
          {c.items.map((it, j) => <a key={j} href="#">{it}</a>)}
        </div>
      ))}
    </footer>
  );
}

export { Logo, Arrow, Ph, Vid, Img, Btn, Footer, MARK_SRC };
