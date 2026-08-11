'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function Reveal({ children, delay = 0, className = '' }:
  { children: ReactNode; delay?: 0 | 1 | 2 | 3; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.unobserve(e.target); } }),
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[900ms] ease-arch ${seen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`}
      style={{ transitionDelay: `${delay * 90}ms` }}
    >
      {children}
    </div>
  );
}
