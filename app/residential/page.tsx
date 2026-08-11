import type { Metadata } from 'next';
import Link from 'next/link';
import Media from '@/components/Media';
import Reveal from '@/components/Reveal';
import ProjectCard from '@/components/ProjectCard';
import { media } from '@/content/media';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Residential Construction | Extensions, Loft Conversions & Renovations in Surrey',
  description: 'Residential construction across Surrey and London — house extensions, loft conversions, renovations, refurbishments, new builds, kitchens, bathrooms, basements and landscaping.',
  alternates: { canonical: '/residential' },
};

const work = ['Extensions', 'Loft conversions', 'Renovations', 'Refurbishments', 'New builds', 'Kitchens', 'Bathrooms', 'Basements', 'Landscaping', 'Driveways & patios'];
const benefits = [
  ['More space', 'Extensions, lofts and basements that add genuinely usable floor area.'],
  ['Better functionality', 'Layouts reworked around how the house is actually lived in.'],
  ['Higher-quality finishes', 'Detailing and joinery that stands up to daily use.'],
  ['Professional project management', 'One programme, one point of contact, no chasing trades.'],
  ['One construction partner', 'Structure, envelope and finishes under a single contractor.'],
];

export default function ResidentialPage() {
  return (
    <>
      <section className="band pt-40">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Residential</p>
            <h1 className="display my-6 text-[clamp(2.3rem,5.5vw,4.2rem)]">Transforming houses<br />into <span className="italic font-light">homes</span></h1>
            <p className="lede">
              Most of what we build is someone&apos;s home — extended, converted, refurbished or built new.
              That means working cleanly around families, keeping to a programme, and finishing properly.
            </p>
            <ul className="my-8 grid gap-x-6 sm:grid-cols-2">
              {work.map((w) => <li key={w} className="border-t border-bone/15 py-2.5 text-[.88rem] text-mist">{w}</li>)}
            </ul>
            <Link href="/contact" className="btn"><span>Discuss your project</span></Link>
          </Reveal>
          <Reveal delay={1}>
            <Media slot={media.residential} ratio="aspect-[16/10]" sizes="(max-width:1024px) 100vw, 50vw" />
          </Reveal>
        </div>
      </section>

      <section className="on-bone band bg-bone text-ink">
        <div className="wrap">
          <Reveal><h2 className="display text-[clamp(1.9rem,4vw,3.2rem)]">What you get</h2></Reveal>
          <div className="mt-10 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex h-full flex-col gap-2 bg-bone p-6">
                  <b className="font-display text-[1.15rem] font-light">{t}</b>
                  <p className="text-[.83rem] text-[#6B665D]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band bg-graphite">
        <div className="wrap">
          <Reveal><h2 className="display mb-8 text-[clamp(1.8rem,3.6vw,2.8rem)]">Residential projects</h2></Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {projects.filter((p) => p.sector === 'residential').slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}><ProjectCard project={p} forceRatio="aspect-[4/3]" /></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
