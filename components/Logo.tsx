import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Luxury Architectural F&M Structural Mark */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-none transition-transform duration-500 hover:scale-105"
        aria-label="Faith & Maxwell Construction Logo"
      >
        <defs>
          <linearGradient id="fmGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C799" />
            <stop offset="50%" stopColor="#C5A880" />
            <stop offset="100%" stopColor="#8A6D46" />
          </linearGradient>
          <linearGradient id="fmDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#141414" />
          </linearGradient>
        </defs>

        {/* Outer Architectural Crest Square Frame with cutout corners */}
        <rect x="2" y="2" width="36" height="36" rx="2" stroke="url(#fmGoldGrad)" strokeWidth="1.2" strokeOpacity="0.4" fill="url(#fmDarkGrad)" />
        
        {/* Roofline Gable Accent */}
        <path d="M7 16L20 6L33 16" stroke="url(#fmGoldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Monogram 'F' Structure (Left Pillar + Horizontal Beam) */}
        <path d="M12 13V31" stroke="url(#fmGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 18H21" stroke="url(#fmGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 24H18" stroke="url(#fmGoldGrad)" strokeWidth="1.4" strokeLinecap="round" />

        {/* Monogram 'M' Structure (Interlocking Right Arch & Beams) */}
        <path d="M20 31V19L27 27L34 19V31" stroke="url(#fmGoldGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Baseline Foundation Beam */}
        <line x1="9" y1="31" x2="35" y2="31" stroke="url(#fmGoldGrad)" strokeWidth="1.2" strokeOpacity="0.6" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[1.18rem] font-normal tracking-[.02em] text-bone">
            Faith <span className="font-light text-bronze-light">&amp;</span> Maxwell
          </span>
          <span className="mt-1 text-[.55rem] uppercase tracking-[.32em] text-mist">
            Construction
          </span>
        </div>
      )}
    </div>
  );
}
