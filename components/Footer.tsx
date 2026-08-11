import Link from 'next/link';
import { company } from '@/content/company';
import { services } from '@/content/services';

export default function Footer() {
  const head = 'mb-5 text-[.65rem] font-medium uppercase tracking-[.22em] text-bronze-light';
  const item = 'text-[.88rem] text-mist transition-colors hover:text-bone';
  return (
    <footer className="bg-ink pt-[clamp(60px,8vw,100px)]">
      <div className="wrap">
        <div className="grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <b className="block font-display text-[1.5rem] font-normal">{company.shortName}</b>
            <i className="mt-2.5 block font-display text-[1.02rem] font-light italic text-mist">“{company.tagline}”</i>
            <p className="mt-5 max-w-[34ch] text-[.86rem] text-mist">
              Construction company based in {company.address.locality}, {company.address.region}, working across London and the South East.
            </p>
          </div>
          <div>
            <h5 className={head}>Services</h5>
            <ul className="grid gap-2.5">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}><Link className={item} href={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className={head}>Company</h5>
            <ul className="grid gap-2.5">
              {[['/about', 'About'], ['/projects', 'Projects'], ['/residential', 'Residential'], ['/commercial', 'Commercial'], ['/locations', 'Locations'], ['/contact', 'Contact']].map(([h, l]) => (
                <li key={h}><Link className={item} href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className={head}>Get in touch</h5>
            <ul className="grid gap-2.5">
              <li><a className={item} href={`tel:${company.phoneOfficeHref}`}>{company.phoneOffice}</a></li>
              <li><a className={item} href={`tel:${company.phoneMobileHref}`}>{company.phoneMobile}</a></li>
              <li><a className={item} href={`mailto:${company.email}`}>{company.email}</a></li>
              <li className="text-[.86rem] leading-relaxed text-mist">
                {company.address.line1}<br />{company.address.locality}, {company.address.region}, {company.address.postcode}
              </li>
            </ul>
            <h5 className={`${head} mt-6`}>Follow</h5>
            <ul className="flex gap-5">
              {company.social.map((s) => <li key={s.label}><a className={item} href={s.href}>{s.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-4 border-t border-bone/15 py-6 pb-[calc(24px+env(safe-area-inset-bottom))] text-[.74rem] text-mist/70">
          <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
          <nav className="flex gap-6">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
