import type { Metadata } from 'next';
import Link from 'next/link';
import Media from '@/components/Media';
import Reveal from '@/components/Reveal';
import { media } from '@/content/media';

export const metadata: Metadata = {
  title: 'Commercial Construction | Groundworks & RC Frames in Surrey and London',
  description: 'Faith & Maxwell Construction works with developers, architects, builders and construction companies — groundworks packages, RC frames and large-scale construction across Surrey and London.',
  alternates: { canonical: '/commercial' },
};

const partners = ['Developers', 'Architects', 'Builders', 'Construction companies', 'Commercial clients'];
const strengths = [
  ['Professional project delivery', 'Programmes we hold to, and site teams that work inside a wider project structure.'],
  ['Experienced teams', 'Crews used to commercial sites, not just domestic work.'],
  ['Groundworks', 'Setting out, excavation, foundations, drainage and slabs as a standalone package.'],
  ['RC frames', 'Formwork, reinforcement and pours for columns, beams, slabs and cores.'],
  ['Large-scale capability', 'From single packages through to full schemes.'],
  ['Collaboration', 'Used to reporting into architects, PMs and main contractors.'],
];

export default function CommercialPage() {
  return (
    <>
      <section className="band pt-40">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-[.75rem] uppercase tracking-[.18em] text-bronze-light transition-colors hover:text-bone">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.3"/></svg>
              Back to Home
            </Link>
            <p className="eyebrow">Commercial</p>
            <h1 className="display my-6 text-[clamp(2.3rem,5.5vw,4.2rem)]">Construction expertise for <span className="italic font-light">commercial projects</span></h1>
            <p className="lede">
              Alongside our residential work we deliver packages and full schemes for professional clients —
              groundworks, reinforced concrete frames and large-scale construction.
            </p>
            <ul className="my-8 grid gap-x-6 sm:grid-cols-2">
              {partners.map((p) => <li key={p} className="border-t border-bone/15 py-2.5 text-[.88rem] text-mist">{p}</li>)}
            </ul>
            <Link href="/contact" className="btn"><span>Discuss a commercial project</span></Link>
          </Reveal>
          <Reveal delay={1}>
            <Media slot={media.commercial} ratio="aspect-[16/10]" sizes="(max-width:1024px) 100vw, 50vw" />
          </Reveal>
        </div>
      </section>

      <section className="band bg-graphite">
        <div className="wrap">
          <Reveal><h2 className="display mb-10 text-[clamp(1.9rem,4vw,3.2rem)]">What we bring to a site</h2></Reveal>
          <div className="grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex h-full flex-col gap-2.5 bg-graphite p-8">
                  <u className="text-[.6rem] tracking-[.2em] text-bronze-light no-underline">{String(i + 1).padStart(2, '0')}</u>
                  <b className="font-display text-[1.25rem] font-light">{t}</b>
                  <p className="text-[.85rem] text-mist">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
