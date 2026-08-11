import Link from 'next/link';
import type { Project } from '@/content/projects';
import Media from './Media';

const ratio: Record<Project['span'], string> = {
  lead: 'aspect-[21/9]',
  half: 'aspect-[16/10]',
  third: 'aspect-square',
};

export default function ProjectCard({ project, forceRatio }: { project: Project; forceRatio?: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative">
        <span className="absolute left-4 top-4 z-10 border border-bone/15 bg-ink/70 px-3 py-1.5 text-[.6rem] uppercase tracking-[.18em] text-bronze-light backdrop-blur">
          {project.status}
        </span>
        <Media slot={project.hero} ratio={forceRatio ?? ratio[project.span]} sizes="(max-width:900px) 100vw, 50vw" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-5 border-t border-bone/15 pt-5">
        <div>
          <h3 className="display text-[clamp(1.25rem,1.9vw,1.75rem)]">{project.title}</h3>
          <p className="mt-2 text-[.72rem] uppercase tracking-[.17em] text-mist">{project.location} · {project.type}</p>
        </div>
        <span className="grid h-11 w-11 flex-none place-items-center border border-bone/15 transition-all duration-500 group-hover:-rotate-45 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 13L13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.3" /></svg>
        </span>
      </div>
    </Link>
  );
}
