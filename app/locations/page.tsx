import type { Metadata } from 'next';
import Link from 'next/link';
import Locations from '@/components/Locations';
import Reveal from '@/components/Reveal';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: 'Service Areas | Builders in Surrey, London, Kent, Sussex & Berkshire',
  description: 'Faith & Maxwell Construction works across Surrey, London, Berkshire, Hampshire, Kent, East Sussex and West Sussex from our base in Cobham, Surrey.',
  alternates: { canonical: '/locations' },
};

const detail: Record<string, string> = {
  Surrey: 'Our home county, with the office at Cobham. Extensions, loft conversions, refurbishments and new builds throughout.',
  London: 'Terraced and semi-detached work across south and south-west London — rear extensions, lofts and whole-house refurbishments on tight sites.',
  Berkshire: 'Residential construction and groundworks packages within easy reach of the M3 and M4 corridors.',
  Hampshire: 'New builds and larger residential schemes across the county.',
  Kent: 'Extensions, refurbishments and groundworks throughout Kent.',
  'East Sussex': 'Residential construction and refurbishment work across East Sussex.',
  'West Sussex': 'Extensions, new builds and landscaping across West Sussex.',
};

export default function LocationsPage() {
  return (
    <>
      <section className="pt-40">
        <div className="wrap">
          <Reveal>
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-[.75rem] uppercase tracking-[.18em] text-bronze-light transition-colors hover:text-bone">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.3"/></svg>
              Back to Home
            </Link>
            <p className="eyebrow">Where we work</p>
            <h1 className="display my-6 text-[clamp(2.4rem,6vw,4.6rem)]">Service areas</h1>
            <p className="lede">
              Based at {company.address.line1}, {company.address.locality}, {company.address.postcode} — working
              across the South East. If your site sits near the edge of the map, ask.
            </p>
          </Reveal>
        </div>
      </section>

      <Locations />

      <section className="band bg-graphite pt-0">
        <div className="wrap grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-3">
          {company.areas.map((a, i) => (
            <Reveal key={a} delay={(i % 3) as 0 | 1 | 2}>
              <div className="flex h-full flex-col gap-2.5 bg-graphite p-8">
                <h2 className="font-display text-[1.35rem] font-light">{a}</h2>
                <p className="text-[.86rem] text-mist">{detail[a]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
