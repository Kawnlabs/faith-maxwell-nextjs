'use client';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconHeight = size === 'sm' ? 40 : size === 'lg' ? 62 : 48;
  const textSize = size === 'sm' ? 'text-[1.1rem]' : size === 'lg' ? 'text-[1.45rem]' : 'text-[1.26rem]';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Official Triple-Gable House Roof Icon */}
      <Image
        src="/images/logo_icon.png"
        alt="Faith & Maxwell Construction Logo Mark"
        width={120}
        height={50}
        style={{ height: `${iconHeight}px`, width: 'auto' }}
        className="flex-none object-contain transition-transform duration-300 hover:scale-[1.04]"
        priority
      />

      {/* Side-by-side Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-normal tracking-[.02em] text-bone ${textSize}`}>
            Faith <span className="font-light text-bronze-light">&amp;</span> Maxwell
          </span>
          <span className="mt-1 text-[.56rem] uppercase tracking-[.32em] text-bronze-light font-medium">
            Construction
          </span>
        </div>
      )}
    </div>
  );
}
