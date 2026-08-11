import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { services, serviceBySlug } from '@/content/services';
import { company } from '@/content/company';
import { serviceSchema } from '@/lib/schema';

type Props = { params: { service: string } };

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = serviceBySlug(params.service);
  if (!s) return {};
  return {
    title: `${s.name} in Surrey & London`,
    description: `${s.intro} Faith & Maxwell Construction, based in Cobham, Surrey.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: Props) {
  const s = serviceBySlug(params.service);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(s.name, s.intro)) }} />
      <section className="band pt-40">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Service</p>
            <h1 className="display my-6 text-[clamp(2.3rem,5.5vw,4.2rem)]">{s.name}</h1>
            <p className="lede">{s.intro}</p>
            <p className="lede mt-4">
              We work across {company.areas.slice(0, 4).join(', ')} and surrounding areas, for homeowners,
              developers, architects and construction companies.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn"><span>Request a consultation</span></Link>
              <Link href="/projects" className="btn btn-ghost"><span>See related projects</span></Link>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="display mb-4 text-[1.4rem]">What&apos;s included</h2>
            <ul>
              {s.points.map((p) => (
                <li key={p} className="flex items-baseline gap-3 border-t border-bone/15 py-3.5 text-[.9rem] text-mist">
                  <i className="h-[5px] w-[5px] flex-none rotate-45 bg-bronze" aria-hidden />{p}
                </li>
              ))}
            </ul>
            <div className="mt-9 border border-bone/15 p-6">
              <b className="font-display text-[1.2rem] font-light text-bronze-light">Warranty</b>
              <p className="mt-2 text-[.88rem] text-mist">{company.warranty.structural}, and {company.warranty.finishing.toLowerCase()}.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band bg-graphite">
        <div className="wrap">
          <h2 className="display mb-6 text-[1.5rem]">Other services</h2>
          <div className="grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="bg-graphite p-6 transition-colors hover:bg-ink">
                <h3 className="display text-[1.15rem]">{o.name}</h3>
                <p className="mt-2 text-[.84rem] text-mist">{o.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
