import type { Metadata } from 'next';
import Link from 'next/link';
import Media from '@/components/Media';
import Reveal from '@/components/Reveal';
import Testimonials from '@/components/Testimonials';
import { media } from '@/content/media';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: 'About | Construction Company in Cobham, Surrey',
  description: 'Faith & Maxwell Construction has over 20 years of experience delivering residential and commercial construction for homeowners, developers, architects and builders across Surrey and London.',
  alternates: { canonical: '/about' },
};

const values = [
  ['Quality craftsmanship', 'Standards that hold from groundworks through to the final coat of paint.'],
  ['Transparent communication', 'You know what is happening this week and what comes next.'],
  ['Professional project management', 'A clear programme and one point of contact throughout.'],
  ['Attention to detail', 'The junctions and finishes are where a build is judged.'],
  ['Safety', 'Sites run properly, for our teams and for the people living next to them.'],
  ['Reliability', 'Long-term relationships built on turning up and finishing.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="band pt-40">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal>
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-[.75rem] uppercase tracking-[.18em] text-bronze-light transition-colors hover:text-bone">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.3"/></svg>
              Back to Home
            </Link>
            <p className="eyebrow">About the company</p>
            <h1 className="display my-6 text-[clamp(2.3rem,5.5vw,4.2rem)]">Experience you<br />can <span className="italic font-light">build on</span></h1>
            <p className="lede">
              For over twenty years Faith &amp; Maxwell Construction has delivered construction projects for
              homeowners, developers, architects, builders and commercial clients — from single-storey
              extensions to large new-build schemes.
            </p>
            <p className="lede mt-4">
              We are based at {company.address.line1}, {company.address.locality}, and work across
              {' '}{company.areas.join(', ')} and surrounding areas. The company is fully insured, and
              structural installations are backed by a 10-year warranty.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="btn"><span>See our projects</span></Link>
              <Link href="/contact" className="btn btn-ghost"><span>Talk to us</span></Link>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <Media slot={media.aboutPortrait} ratio="aspect-[4/5]" sizes="(max-width:1024px) 100vw, 45vw" />
          </Reveal>
        </div>
      </section>

      <section className="on-bone band bg-bone text-ink">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.6rem)]">What every project gets</h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex h-full flex-col gap-2.5 bg-bone p-8">
                  <u className="text-[.6rem] tracking-[.2em] text-bronze no-underline">{String(i + 1).padStart(2, '0')}</u>
                  <b className="font-display text-[1.3rem] font-light">{t}</b>
                  <p className="text-[.86rem] text-[#6B665D]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
