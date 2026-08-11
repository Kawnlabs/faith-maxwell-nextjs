import type { Metadata } from 'next';
import EnquiryForm from '@/components/EnquiryForm';
import Media from '@/components/Media';
import Reveal from '@/components/Reveal';
import { media } from '@/content/media';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: 'Contact | Request a Construction Consultation in Surrey & London',
  description: 'Talk to Faith & Maxwell Construction about a new build, extension, loft conversion, refurbishment or commercial project. Call 01932 860 553 or request a consultation online.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <section className="on-bone band bg-bone pt-40 text-ink">
      <div className="wrap grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Enquiries</p>
          <h1 className="display my-6 text-[clamp(2.3rem,5.5vw,4.2rem)]">Let&apos;s talk about<br />your <span className="italic font-light">project</span></h1>
          <p className="lede">
            Whether you&apos;re planning a new build, extension, refurbishment or another construction project,
            tell us what you&apos;re looking to achieve.
          </p>
          <EnquiryForm />
        </Reveal>

        <Reveal delay={1}>
          <Media slot={media.contactAside} ratio="aspect-square" sizes="(max-width:1024px) 100vw, 40vw" />
          <ul className="mt-8">
            {[
              ['Office', <a key="o" className="hover:text-bronze" href={`tel:${company.phoneOfficeHref}`}>{company.phoneOffice}</a>],
              ['Mobile', <a key="m" className="hover:text-bronze" href={`tel:${company.phoneMobileHref}`}>{company.phoneMobile}</a>],
              ['Email', <a key="e" className="hover:text-bronze" href={`mailto:${company.email}`}>{company.email}</a>],
              ['Address', <>{company.address.line1}<br />{company.address.locality}, {company.address.region}, {company.address.postcode}</>],
              ['Hours', <>{company.hours}<br /><span className="text-[.85rem] text-[#6B665D]">{company.hoursNote}</span></>],
            ].map(([label, value], i) => (
              <li key={i} className="border-t border-ink/10 py-4">
                <u className="mb-1.5 block text-[.62rem] uppercase tracking-[.2em] text-[#7A756B] no-underline">{label as string}</u>
                <b className="text-[1.06rem] font-normal">{value}</b>
              </li>
            ))}
          </ul>
          <a href={company.whatsapp} target="_blank" rel="noopener"
             className="mt-7 inline-flex items-center gap-3 border border-ink/30 px-5 py-3.5 text-[.76rem] uppercase tracking-[.14em] transition-colors hover:border-ink hover:bg-ink hover:text-bone">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20z" /></svg>
            Message us on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
