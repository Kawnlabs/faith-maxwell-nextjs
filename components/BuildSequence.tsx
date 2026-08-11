'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const BuildScene = dynamic(() => import('./BuildScene'), {
  ssr: false,
  loading: () => <div className="h-[clamp(340px,54vh,560px)] w-full bg-[#0d0f11]" />,
});

const STAGES = [
  { no: '01', name: 'Groundworks', copy: 'Site set out, dig and muck away, footings and foundations poured, drainage laid and the slab cast level and true.' },
  { no: '02', name: 'Structure & RC frame', copy: 'Columns, beams and floor slabs — reinforced concrete and structural steel that carry everything above.' },
  { no: '03', name: 'Envelope', copy: 'Walls, roof and parapet close the building in. Once it is weather-tight, the internal trades can start.' },
  { no: '04', name: 'Fit-out & finish', copy: 'Glazing, bronze screening, joinery, services and landscaping. The stage where the building becomes a home.' },
];

export default function BuildSequence() {
  const [stage, setStage] = useState(0);

  const s = STAGES[stage];

  return (
    <div>
      <div className="relative border border-bone/15 bg-gradient-to-b from-[#101214] to-[#0B0C0D]">
        <div className="pointer-events-none absolute left-6 top-5 z-10">
          <small className="text-[.62rem] uppercase tracking-[.22em] text-bronze-light">Stage {s.no}</small>
          <b className="block font-display text-[1.5rem] font-light">{s.name}</b>
        </div>
        <BuildScene stage={stage} label={s.name} />
        <p className="pointer-events-none absolute bottom-6 right-6 z-10 hidden max-w-[34ch] text-right text-[.88rem] text-mist md:block">{s.copy}</p>
      </div>

      <div className="grid grid-cols-2 border border-t-0 border-bone/15 lg:grid-cols-4" role="tablist" aria-label="Construction stages">
        {STAGES.map((st, i) => (
          <button
            key={st.no}
            role="tab"
            aria-selected={i === stage}
            onClick={() => setStage(i)}
            className={`relative border-b border-r border-bone/15 px-5 py-5 text-left transition-colors last:border-r-0 hover:bg-bone/[.03] lg:border-b-0 ${
              i === stage ? 'before:absolute before:inset-x-0 before:-top-px before:h-0.5 before:bg-bronze' : ''
            }`}
          >
            <u className="block text-[.62rem] tracking-[.2em] text-bronze-light no-underline">{st.no}</u>
            <b className={`mt-2 block text-[.92rem] font-medium transition-colors ${i === stage ? 'text-bone' : 'text-bone/60'}`}>{st.name}</b>
          </button>
        ))}
      </div>
      <p className="mt-4 text-[.88rem] text-mist md:hidden">{s.copy}</p>
    </div>
  );
}
