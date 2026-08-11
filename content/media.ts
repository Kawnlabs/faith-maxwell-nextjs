/**
 * Single source of truth for photography.
 *
 * Every image slot on the site is declared here. While `src` is null the
 * component renders an architectural placeholder frame with the label shown.
 * To go live: drop the file into /public/images and set `src`.
 * Nothing else in the codebase needs to change.
 */
export type MediaSlot = {
  /** e.g. '/images/hero.jpg' — null renders a labelled placeholder */
  src: string | null;
  /** Written for SEO and screen readers. Keep it descriptive, not keyword-stuffed. */
  alt: string;
  /** Shown inside the placeholder frame so the client knows what to supply */
  label: string;
};

export const media = {
  aboutPortrait: {
    src: '/images/about-portrait.jpg',
    alt: 'Faith & Maxwell Construction team on site in Surrey',
    label: 'Company / site photography — portrait 4:5',
  },
  contactAside: {
    src: '/images/contact-aside.jpg',
    alt: 'Completed Faith & Maxwell Construction project',
    label: 'Team or completed project — square',
  },
  residential: {
    src: '/images/residential-hero.jpg',
    alt: 'Completed house extension with open-plan kitchen and garden doors',
    label: 'Residential hero — 16:10',
  },
  commercial: {
    src: '/images/commercial-hero.jpg',
    alt: 'Reinforced concrete frame under construction on a commercial site',
    label: 'Commercial hero — 16:10',
  },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;
