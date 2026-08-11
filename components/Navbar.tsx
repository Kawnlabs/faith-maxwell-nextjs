'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { company } from '@/content/company';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/residential', 'Residential'],
  ['/commercial', 'Commercial'],
  ['/locations', 'Locations'],
  ['/contact', 'Contact'],
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === '/';
  // Always solid black background on all inner pages (/contact, /about, etc.), or on scroll/hover on home page
  const showDarkBg = !isHome || solid || hovered;

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 90) {
        setHovered(true);
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-300 ${
          showDarkBg
            ? 'border-b border-bone/15 bg-[#0C0D0E] shadow-2xl backdrop-blur-2xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className={`mx-auto flex max-w-site items-center gap-8 px-5 transition-all duration-300 sm:px-10 lg:px-16 ${showDarkBg ? 'py-3.5' : 'py-5'}`}>
          <Link href="/" className="flex flex-none items-center gap-3">
            <Logo />
          </Link>

          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {links.map(([href, label]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group relative py-1.5 text-[.78rem] uppercase tracking-[.1em] transition-colors ${
                    active ? 'font-medium text-bronze-light' : 'text-bone/85 hover:text-bone'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px bg-bronze-light transition-[width] duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
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
                className={`my-1.5 block h-px w-6 bg-bone transition-all duration-300 ${
                  open && i === 0 ? 'translate-y-[7px] rotate-45' : ''
                } ${open && i === 1 ? 'opacity-0' : ''} ${open && i === 2 ? '-translate-y-[7px] -rotate-45' : ''}`}
              />
            ))}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[85] flex flex-col gap-0.5 bg-[#0C0D0E] px-5 pb-10 pt-28 transition-transform duration-500 ease-arch sm:px-10 lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`border-b border-bone/15 py-3.5 font-display text-[1.85rem] font-light ${
              pathname === href ? 'text-bronze-light' : 'text-bone'
            }`}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpen(false)} className="btn mt-7 justify-center">
          <span>Request a consultation</span>
        </Link>
      </div>
    </>
  );
}
