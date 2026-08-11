import Link from 'next/link';
import { company } from '@/content/company';

export default function MobileDock() {
  const item = 'flex flex-col items-center gap-1.5 border-r border-bone/15 px-2 py-3.5 text-[.63rem] uppercase tracking-[.14em] text-mist last:border-r-0';
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[95] grid grid-cols-4 border-t border-bone/15 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Quick navigation"
    >
      <Link href="/" className={item}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V9.5z" /></svg>
        Home
      </Link>
      <a href={`tel:${company.phoneOfficeHref}`} className={item}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.4 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.4 1.8.6 2.8.7a2 2 0 011.7 2z" /></svg>
        Call
      </a>
      <a href={company.whatsapp} target="_blank" rel="noopener" className={`${item} text-bronze-light`}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20z" /></svg>
        WhatsApp
      </a>
      <Link href="/contact" className={item}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
        Enquire
      </Link>
    </nav>
  );
}
