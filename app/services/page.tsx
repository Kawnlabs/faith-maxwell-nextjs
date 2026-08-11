import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Construction Services in Surrey & London | Extensions, New Builds, Groundworks',
  description: 'New builds, house extensions, loft conversions, renovation, groundworks, RC frames, basements, kitchens, bathrooms and landscaping across Surrey, London and the South East.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <section className="band pt-40">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">What we build</p>
          <h1 className="display my-6 text-[clamp(2.4rem,6vw,4.6rem)]">Services</h1>
          <p className="lede">
            One experienced contractor across structure, envelope and finishes — so your project stays with a
            single team from first dig to handover.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) as 0 | 1}>
              <Link href={`/services/${s.slug}`} className="group flex h-full flex-col gap-3 bg-ink p-8 transition-colors duration-500 hover:bg-graphite">
                <u className="text-[.6rem] tracking-[.2em] text-bronze-light no-underline">{String(i + 1).padStart(2, '0')}</u>
                <h2 className="display text-[1.5rem]">{s.name}</h2>
                <p className="text-[.9rem] text-mist">{s.short}</p>
                <span className="mt-auto inline-flex items-center gap-2.5 pt-4 text-[.72rem] uppercase tracking-[.18em] text-bronze-light">
                  View service
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-500 ease-arch group-hover:translate-x-1.5" aria-hidden>
                    <path d="M0 4h18M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
