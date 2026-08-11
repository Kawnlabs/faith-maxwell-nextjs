import Link from 'next/link';
import { company } from '@/content/company';
import Reveal from './Reveal';

const regions: { name: string; d: string; x: number; y: number; home?: boolean }[] = [
  { name: 'London', d: 'M232 96 L360 82 L392 150 L316 186 L236 160 Z', x: 272, y: 140 },
  { name: 'Surrey', d: 'M156 158 L316 186 L330 268 L192 288 L136 226 Z', x: 196, y: 236, home: true },
  { name: 'Berkshire', d: 'M40 108 L156 118 L156 158 L136 226 L44 196 Z', x: 62, y: 164 },
  { name: 'Hampshire', d: 'M44 196 L136 226 L192 288 L150 372 L44 330 Z', x: 66, y: 290 },
  { name: 'Kent', d: 'M392 150 L560 138 L586 244 L436 268 L330 268 Z', x: 436, y: 216 },
  { name: 'East Sussex', d: 'M330 268 L436 268 L470 372 L336 386 Z', x: 356, y: 330 },
  { name: 'West Sussex', d: 'M192 288 L330 268 L336 386 L214 400 L150 372 Z', x: 212, y: 342 },
];

export default function Locations() {
  return (
    <section className="band">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <p className="eyebrow">Where we work</p>
          <h2 className="display my-5 text-[clamp(2rem,4.6vw,3.9rem)]">
            Serving Surrey,<br />London &amp; <span className="font-display italic font-light">beyond</span>
          </h2>
          <p className="lede">
            Based at {company.address.locality} in {company.address.region}, working across the South East.
            If your site sits near the edge of the map, ask — we travel for the right project.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {[...company.areas, 'Surrounding areas'].map((a) => (
              <li key={a} className="border border-bone/15 px-4 py-2 text-[.74rem] uppercase tracking-[.13em] text-mist transition-colors hover:border-bronze hover:text-bone">{a}</li>
            ))}
          </ul>
          <Link href="/locations" className="btn btn-ghost mt-8"><span>View all areas</span></Link>
        </Reveal>

        <Reveal delay={1}>
          <svg viewBox="0 0 620 480" className="h-auto w-full" role="img" aria-label="Stylised map of the South East of England showing Faith & Maxwell Construction service areas">
            {regions.map((r) => (
              <g key={r.name} className="group">
                <path d={r.d} className={`stroke-bone/15 transition-colors duration-500 group-hover:fill-bronze/30 group-hover:stroke-bronze-light ${r.home ? 'fill-bronze/25' : 'fill-bone/[.045]'}`} strokeWidth="1" />
                <text x={r.x} y={r.y} className="pointer-events-none fill-mist text-[11.5px] uppercase tracking-[.14em] transition-colors group-hover:fill-bone">{r.name}</text>
                {r.home && (
                  <>
                    <circle cx={222} cy={252} r={5} className="fill-bronze-light" />
                    <text x={234} y={258} className="pointer-events-none fill-mist text-[9.5px] tracking-[.1em]">Cobham</text>
                  </>
                )}
              </g>
            ))}
            <line x1="40" y1="424" x2="580" y2="424" className="stroke-bone/10" />
            <text x="40" y="448" className="fill-mist/70 text-[9.5px]">Indicative service map — not to scale</text>
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
