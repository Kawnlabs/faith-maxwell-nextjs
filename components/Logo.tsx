'use client';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const h = size === 'sm' ? 42 : size === 'lg' ? 68 : 52;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Faith & Maxwell Construction"
        width={180}
        height={60}
        style={{ height: `${h}px`, width: 'auto' }}
        className="object-contain transition-transform duration-300 hover:scale-[1.02]"
        priority
      />
    </div>
  );
}
