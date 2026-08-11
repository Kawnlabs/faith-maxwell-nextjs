import Reveal from './Reveal';

const cells = [
  ['20+', 'Years of experience'],
  ['10 Year', 'Structural warranty'],
  ['Residential\n& Commercial', 'Construction'],
  ['Fully Insured', 'Professional service'],
];

export default function TrustBar() {
  return (
    <section className="on-bone bg-bone text-ink">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {cells.map(([big, small], i) => (
          <Reveal key={small} delay={(i % 4) as 0 | 1 | 2 | 3}>
            <div className="h-full border-b border-r border-ink/10 px-5 py-8 sm:px-8 sm:py-12 lg:border-b-0 lg:last:border-r-0">
              <b className="block whitespace-pre-line font-display text-[clamp(1.6rem,3.2vw,2.9rem)] font-light leading-none">{big}</b>
              <small className="mt-3 block text-[.71rem] uppercase tracking-[.17em] text-[#6B665D]">{small}</small>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
