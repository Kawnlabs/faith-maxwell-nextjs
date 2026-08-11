import Image from 'next/image';
import type { MediaSlot } from '@/content/media';

/**
 * Renders real photography when the media manifest has a src, and an
 * architectural placeholder frame (with the required shot labelled) when it
 * doesn't. Swapping in photos is a content change, never a code change.
 */
export default function Media({
  slot, ratio = 'aspect-[16/10]', className = '', priority = false, sizes = '(max-width:900px) 100vw, 50vw',
}: { slot: MediaSlot; ratio?: string; className?: string; priority?: boolean; sizes?: string }) {
  if (slot.src) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1100ms] ease-arch hover:scale-[1.05]"
        />
      </div>
    );
  }
  return (
    <div
      className={`group relative overflow-hidden bg-gradient-to-br from-slate to-graphite ${ratio} ${className}`}
      role="img"
      aria-label={slot.alt}
    >
      <div
        className="absolute inset-0 transition-transform duration-[1100ms] ease-arch group-hover:scale-[1.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(242,239,233,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(242,239,233,.05) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div
        className="absolute inset-0 transition-transform duration-[1100ms] ease-arch group-hover:scale-[1.06]"
        style={{
          background:
            'radial-gradient(70% 60% at 30% 12%, rgba(156,122,78,.32), transparent 62%), linear-gradient(115deg, transparent 42%, rgba(242,239,233,.07) 42.4%, rgba(242,239,233,.07) 47%, transparent 47.4%)',
        }}
      />
      <span className="absolute bottom-3 left-4 z-10 text-[.6rem] uppercase tracking-[.2em] text-bone/40">
        {slot.label}
      </span>
    </div>
  );
}
