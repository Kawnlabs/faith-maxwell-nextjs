'use client';

import { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

/**
 * Four camera moves through one house, driven by scroll position.
 * The section is 4 screens tall; the canvas sticks while the camera flies.
 */
const BEATS = [
  { eyebrow: 'Sydenhurst, Haslemere', title: 'Building better.', em: 'Creating spaces that last.' },
  { eyebrow: 'The approach', title: 'Every detail', em: 'considered.' },
  { eyebrow: 'The elevation', title: 'Craftsmanship', em: 'you can stand in front of.' },
  { eyebrow: 'The whole site', title: 'From first dig', em: 'to final finish.' },
];

export default function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  const current = BEATS[beat];

  return (
    <section ref={wrapRef} className="relative h-[180svh]" aria-label="Faith & Maxwell Construction introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroScene wrapRef={wrapRef} onBeat={setBeat} onReady={handleReady} />

        {/* fallback + grade */}
        <div
          className={`pointer-events-none absolute inset-0 bg-ink transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(125% 90% at 75% 25%, rgba(12,13,14,0) 30%, rgba(12,13,14,.6) 100%), linear-gradient(to top, rgba(12,13,14,.95) 3%, rgba(12,13,14,.5) 32%, rgba(12,13,14,.05) 68%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full max-w-site flex-col justify-end px-5 pb-12 sm:px-10 lg:px-16">
          <p className="eyebrow">{current.eyebrow}</p>
          <h1 className="display mt-5 max-w-[15ch] text-[clamp(2.6rem,7vw,6rem)] leading-[1.02]">
            {current.title}
            <br />
            <em className="not-italic text-bronze-light">{current.em}</em>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.3vw,1.14rem)] text-bone/80">
            Faith &amp; Maxwell Construction delivers high-quality residential and commercial construction
            across Surrey, London and surrounding areas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn" href="/contact"><span>Request a consultation</span></Link>
            <Link className="btn btn-ghost" href="/projects"><span>Explore our projects</span></Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-bone/15 pt-5">
            {['20+ years experience', 'Fully insured', '10-year structural warranty'].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[.72rem] uppercase tracking-[.16em] text-mist">
                <i className="block h-[5px] w-[5px] rotate-45 bg-bronze" aria-hidden />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {BEATS.map((b, i) => (
            <span
              key={b.eyebrow}
              className={`h-8 w-[2px] transition-colors duration-500 ${i === beat ? 'bg-bronze-light' : 'bg-bone/20'}`}
            />
          ))}
        </div>
        <p className="pointer-events-none absolute bottom-5 right-5 z-10 hidden text-[.62rem] uppercase tracking-[.22em] text-bone/40 lg:block">
          Scroll to move through the site
        </p>
      </div>
    </section>
  );
}
