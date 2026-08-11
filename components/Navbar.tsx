'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { company } from '@/content/company';

const links = [
  ['/about', 'About'], ['/services', 'Services'], ['/projects', 'Projects'],
  ['/residential', 'Residential'], ['/commercial', 'Commercial'],
  ['/locations', 'Locations'], ['/contact', 'Contact'],
] as const;

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          solid ? 'border-b border-bone/15 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className={`mx-auto flex max-w-site items-center gap-9 px-5 transition-all duration-500 sm:px-10 lg:px-16 ${solid ? 'py-3.5' : 'py-5'}`}>
          <Link href="/" className="flex flex-none flex-col leading-none">
            <b className="font-display text-[1.16rem] font-normal">{company.shortName}</b>
            <small className="mt-1.5 text-[.55rem] uppercase tracking-[.3em] text-mist">Construction</small>
          </Link>

          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="group relative py-1.5 text-[.78rem] uppercase tracking-[.09em] text-bone/75 transition-colors hover:text-bone"
              >
                {label}
                <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-bronze-light transition-[width] duration-500 ease-arch group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="btn hidden flex-none px-5 py-3 text-[.72rem] lg:inline-flex">
            <span>Request a consultation</span>
          </Link>

          <button
            className="ml-auto p-2.5 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`my-1.5 block h-px w-6 bg-bone transition-all duration-400 ${
                  open && i === 0 ? 'translate-y-[7px] rotate-45' : ''
                } ${open && i === 1 ? 'opacity-0' : ''} ${open && i === 2 ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            ))}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[85] flex flex-col gap-0.5 bg-ink px-5 pb-10 pt-28 transition-transform duration-[600ms] ease-arch sm:px-10 lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {links.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b border-bone/15 py-3 font-display text-[1.85rem] font-light">
            {label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="btn mt-7 justify-center"><span>Request a consultation</span></Link>
      </div>
    </>
  );
}
