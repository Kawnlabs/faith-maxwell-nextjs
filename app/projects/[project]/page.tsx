import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Media from '@/components/Media';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import { projects, projectBySlug } from '@/content/projects';

type Props = { params: { project: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = projectBySlug(params.project);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.location} | ${p.type}`,
    description: p.overview,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.title} — ${p.location}`, description: p.overview },
  };
}

export default function ProjectPage({ params }: Props) {
  const p = projectBySlug(params.project);
  if (!p) notFound();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="pt-32">
        <div className="wrap">
          <Reveal>
            <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-[.75rem] uppercase tracking-[.18em] text-bronze-light transition-colors hover:text-bone">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.3"/></svg>
              Back to all projects
            </Link>
            <p className="eyebrow">{p.status}</p>
            <h1 className="display my-6 max-w-[18ch] text-[clamp(2.3rem,5.5vw,4.4rem)]">{p.title}</h1>
            <p className="text-[.76rem] uppercase tracking-[.18em] text-mist">{p.location} · {p.type}</p>
          </Reveal>
        </div>
        <Reveal delay={1}>
          <div className="mt-10">
            <Media slot={p.hero} ratio="aspect-[21/9]" priority sizes="100vw" />
          </div>
        </Reveal>
      </section>

      <section className="band pt-16">
        <div className="wrap grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <div>
            {[['Overview', p.overview], ['Challenge', p.challenge], ['Approach', p.approach], ['Result', p.result]].map(([h, body], i) => (
              <Reveal key={h} delay={(i % 3) as 0 | 1 | 2}>
                <h2 className="display mb-3 mt-9 text-[1.5rem] first:mt-0">{h}</h2>
                <p className="lede">{body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={1}>
            <div className="border border-bone/15">
              {[['Project type', p.type], ['Location', p.location], ['Status', p.status]].map(([k, v]) => (
                <div key={k} className="border-b border-bone/15 p-5 last:border-b-0">
                  <u className="block text-[.6rem] uppercase tracking-[.2em] text-bronze-light no-underline">{k}</u>
                  <b className="mt-1.5 block text-[.95rem] font-normal">{v}</b>
                </div>
              ))}
            </div>
            <h3 className="display mb-2 mt-9 text-[1.3rem]">Scope of work</h3>
            <ul>
              {p.scope.map((s) => <li key={s} className="border-b border-bone/15 py-2.5 text-[.88rem] text-mist">{s}</li>)}
            </ul>
          </Reveal>
        </div>

        <div className="wrap mt-6">
          <Reveal>
            <h2 className="display mb-5 text-[1.5rem]">Gallery</h2>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {p.gallery.map((g) => <Media key={g.label} slot={g} ratio="aspect-square" sizes="(max-width:640px) 100vw, 33vw" />)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band bg-graphite">
        <div className="wrap">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.6vw,2.8rem)]">Planning a similar project?</h2>
            <p className="lede mt-4">Tell us what you&apos;re looking to achieve and we&apos;ll come back with next steps.</p>
            <Link href="/contact" className="btn mt-7"><span>Request a consultation</span></Link>
          </Reveal>
          <h3 className="display mb-6 mt-16 text-[1.5rem]">Related projects</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) as 0 | 1 | 2}>
                <ProjectCard project={r} forceRatio="aspect-[4/3]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
