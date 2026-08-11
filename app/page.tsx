import Link from 'next/link';
import Hero3D from '@/components/Hero3D';
import TrustBar from '@/components/TrustBar';
import BuildSequence from '@/components/BuildSequence';
import ProjectCard from '@/components/ProjectCard';
import Testimonials from '@/components/Testimonials';
import Locations from '@/components/Locations';
import Reveal from '@/components/Reveal';
import Media from '@/components/Media';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { media } from '@/content/media';
import { company } from '@/content/company';

const values = [
  'Quality craftsmanship', 'Transparent communication', 'Professional project management',
  'Attention to detail', 'Safety on every site', 'Reliability and long-term relationships',
];

const why = [
  ['20+ years of experience', 'Two decades of delivering residential and commercial construction.'],
  ['Fully insured', 'Cover in place on every site we run.'],
  ['10-year structural warranty', 'Structural installations backed for a decade.'],
  ['Residential & commercial', 'Both sides of the industry, under one team.'],
  ['Experienced project management', 'A programme, a point of contact and a site that runs to it.'],
  ['Transparent communication', 'You know what is happening this week and what comes next.'],
  ['Professional craftsmanship', 'Standards held from groundworks to finishes.'],
  ['We work with architects & developers', 'Used to working inside a wider project team.'],
];

const span: Record<string, string> = { lead: 'lg:col-span-6 lg:row-span-2', half: 'lg:col-span-6', third: 'lg:col-span-4', quarter: 'lg:col-span-3' };

export default function Home() {
  return (
    <>
      <Hero3D />
      <TrustBar />

      {/* ABOUT */}
      <section className="on-bone band bg-bone text-ink" id="about">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">About the company</p>
            <h2 className="display my-6 text-[clamp(2rem,4.6vw,3.9rem)]">
              Experience you<br />can <span className="italic font-light">build on</span>
            </h2>
            <p className="lede">
              For over twenty years we have delivered construction projects for homeowners, developers,
              architects, builders and commercial clients — from single-storey extensions to large new-build schemes.
            </p>
            <p className="lede mt-4">
              We run every project the same way: a clear programme, one point of contact, and site standards
              that hold from groundworks through to the final coat of paint.
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {values.map((v, i) => (
                <li key={v} className="flex items-baseline gap-3 border-t border-ink/10 py-3 text-[.9rem]">
                  <i className="flex-none text-[.66rem] not-italic tracking-[.1em] text-bronze">0{i + 1}</i>{v}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn btn-ghost mt-9"><span>More about Faith &amp; Maxwell</span></Link>
          </Reveal>
          <Reveal delay={2}>
            <Media slot={media.aboutPortrait} ratio="aspect-[4/5]" sizes="(max-width:1024px) 100vw, 45vw" />
          </Reveal>
        </div>
      </section>

      {/* BUILD SEQUENCE */}
      <section className="band bg-graphite">
        <div className="wrap">
          <Reveal>
            <div className="mb-11 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="eyebrow">How a project takes shape</p>
                <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">From ground to <span className="italic font-light">finish</span></h2>
              </div>
              <p className="lede max-w-[40ch]">Every scheme we build follows the same four stages. Step through them — the model rebuilds as you go.</p>
            </div>
          </Reveal>
          <Reveal delay={1}><BuildSequence /></Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="band" id="services">
        <div className="wrap">
          <Reveal>
            <div className="mb-13 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="eyebrow">What we build</p>
                <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">Services</h2>
              </div>
              <p className="lede max-w-[42ch]">One experienced contractor across structure, envelope and finishes — so the project stays with a single team from first dig to handover.</p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) as 0 | 1 | 2} className={span[s.span]}>
                <Link
                  href={`/services/${s.slug}`}
                  className={`group relative flex h-full flex-col justify-end overflow-hidden border border-bone/15 bg-[#101214] p-7 ${s.span === 'lead' ? 'min-h-[440px]' : 'min-h-[270px]'}`}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-slate to-[#111315] transition-transform duration-[1150ms] ease-arch group-hover:scale-[1.06]" aria-hidden />
                  <span className="absolute inset-0" style={{ background: 'radial-gradient(85% 70% at 22% 8%, rgba(156,122,78,.28), transparent 58%)' }} aria-hidden />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/95 via-[#0a0b0c]/25 to-transparent" aria-hidden />
                  <span className="absolute right-6 top-6 z-10 text-[.63rem] tracking-[.2em] text-bone/35">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="relative z-10 font-display text-[1.45rem] font-light">{s.name}</h3>
                  <p className="relative z-10 mt-2 max-w-[40ch] text-[.87rem] text-mist">{s.short}</p>
                  <span className="relative z-10 mt-4 inline-flex items-center gap-2.5 text-[.72rem] uppercase tracking-[.18em] text-bronze-light">
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

      {/* PROJECTS */}
      <section className="band bg-graphite" id="projects">
        <div className="wrap">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">Projects</h2>
              </div>
              <p className="lede max-w-[40ch]">Completed and live schemes across Surrey and London. Open any project for the full case study.</p>
            </div>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-12">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2} className={p.span === 'lead' ? 'lg:col-span-12' : p.span === 'half' ? 'lg:col-span-6' : 'lg:col-span-4'}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="grid lg:grid-cols-2">
        {[
          { href: '/residential', eyebrow: 'Residential', title: 'Transforming houses into homes', copy: 'More space, better function and a finish that lasts — managed by one contractor from planning conditions to the final snag.', list: ['Extensions', 'Loft conversions', 'Renovations', 'Refurbishments', 'New builds', 'Kitchens', 'Bathrooms', 'Basements', 'Landscaping', 'Driveways & patios'], cta: 'Discuss your project' },
          { href: '/commercial', eyebrow: 'Commercial', title: 'Construction expertise for commercial projects', copy: 'We work alongside developers, architects, builders and construction companies — delivering packages and full schemes with experienced site teams.', list: ['Developers', 'Architects', 'Builders', 'Construction companies', 'Groundworks packages', 'RC frames', 'Large-scale capability', 'Partner collaboration'], cta: 'Discuss a commercial project' },
        ].map((s, i) => (
          <Reveal key={s.href} delay={i as 0 | 1}>
            <div className={`h-full px-6 py-14 sm:px-12 sm:py-20 ${i === 0 ? 'border-b border-bone/15 lg:border-b-0 lg:border-r' : ''}`}>
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 className="display my-5 text-[clamp(1.8rem,3.4vw,2.9rem)]">{s.title}</h2>
              <p className="lede">{s.copy}</p>
              <ul className="my-7 grid gap-x-6 sm:grid-cols-2">
                {s.list.map((l) => <li key={l} className="border-t border-bone/15 py-2.5 text-[.87rem] text-mist">{l}</li>)}
              </ul>
              <Link href={s.href} className="btn btn-ghost"><span>{s.cta}</span></Link>
            </div>
          </Reveal>
        ))}
      </section>

      {/* WHY */}
      <section className="on-bone band bg-bone text-ink">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Why Faith &amp; Maxwell</p>
            <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">Reasons clients keep<br />coming <span className="italic font-light">back</span></h2>
          </Reveal>
          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="group flex h-full min-h-[172px] flex-col gap-2.5 bg-bone p-7 transition-colors duration-500 hover:bg-ink hover:text-bone">
                  <u className="text-[.6rem] tracking-[.2em] text-bronze no-underline">{String(i + 1).padStart(2, '0')}</u>
                  <b className="font-display text-[1.28rem] font-light leading-snug">{t}</b>
                  <p className="text-[.83rem] text-[#6B665D] transition-colors group-hover:text-mist">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* WARRANTY */}
      <section className="band bg-graphite">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Peace of mind</p>
            <h2 className="display my-5 text-[clamp(2rem,4.6vw,3.9rem)]">Built with <span className="italic font-light">confidence</span></h2>
            <p className="lede">
              Structural installations are backed by a 10-year warranty, with a 1-year warranty covering
              non-structural and finishing elements. The company is fully insured.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="grid gap-3.5">
              {[
                ['10 years', 'Warranty on structural installation.'],
                ['1 year', 'Warranty on non-structural and finishing elements.'],
                ['Insured', 'Fully insured professional service on every project.'],
                ['Mon–Sat', `${company.hours.split(', ')[1]}. ${company.hoursNote}`],
              ].map(([b, s]) => (
                <div key={b} className="flex items-baseline gap-6 border border-bone/15 p-7 transition-colors duration-500 hover:border-bronze">
                  <b className="min-w-[110px] flex-none font-display text-[2.1rem] font-light leading-none text-bronze-light">{b}</b>
                  <span className="text-[.9rem] text-mist">{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Locations />

      {/* CONTACT TEASER */}
      <section className="on-bone band bg-bone text-ink">
        <div className="wrap flex flex-col items-start gap-8">
          <Reveal>
            <p className="eyebrow">Enquiries</p>
            <h2 className="display my-5 text-[clamp(2rem,4.6vw,3.9rem)]">Let&apos;s talk about<br />your <span className="italic font-light">project</span></h2>
            <p className="lede">
              Whether you&apos;re planning a new build, extension, refurbishment or another construction project,
              tell us what you&apos;re looking to achieve.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn"><span>Request a consultation</span></Link>
              <a href={company.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost"><span>Message us on WhatsApp</span></a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
