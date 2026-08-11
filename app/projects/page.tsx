import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects | Extensions, Loft Conversions & New Builds in Surrey and London',
  description: 'Completed and live construction projects by Faith & Maxwell Construction across Surrey and London — new builds, extensions, loft conversions and whole-house refurbishments.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <section className="band pt-40">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h1 className="display my-6 text-[clamp(2.4rem,6vw,4.6rem)]">Projects</h1>
          <p className="lede">
            Completed and live schemes across Surrey and London. Every project below is one of ours —
            open any of them for the full case study.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2} className={p.span === 'lead' ? 'lg:col-span-12' : p.span === 'half' ? 'lg:col-span-6' : 'lg:col-span-4'}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
