import { testimonials, hasPlaceholders } from '@/content/testimonials';
import Reveal from './Reveal';

export default function Testimonials() {
  return (
    <section className="band">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Client feedback</p>
          <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">In their words</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.context} delay={(i % 3) as 0 | 1 | 2}>
              <article className="flex h-full flex-col gap-4 border border-bone/15 bg-gradient-to-b from-bone/[.03] to-transparent p-7">
                <div className="text-[.8rem] tracking-[.28em] text-bronze-light" aria-label="Five out of five stars">★★★★★</div>
                <p className="font-display text-[1.08rem] font-light leading-snug">{t.quote}</p>
                <footer className="mt-auto border-t border-bone/15 pt-4 text-[.72rem] uppercase tracking-[.14em] text-mist">
                  {t.name} · {t.context}
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
        {hasPlaceholders && (
          <p className="mt-7 inline-block border border-dashed border-bone/15 px-3 py-2.5 text-[.62rem] uppercase tracking-[.14em] text-mist/60">
            Placeholders — to be filled with the genuine reviews from the current site. No reviews invented here.
          </p>
        )}
      </div>
    </section>
  );
}
