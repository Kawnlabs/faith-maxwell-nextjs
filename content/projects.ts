import type { MediaSlot } from './media';

export type Project = {
  slug: string;
  title: string;
  location: string;
  type: string;
  status: 'Completed' | 'Live project';
  sector: 'residential' | 'commercial';
  /** homepage grid weight */
  span: 'lead' | 'half' | 'third';
  overview: string;
  challenge: string;
  approach: string;
  result: string;
  scope: string[];
  hero: MediaSlot;
  gallery: MediaSlot[];
};

const shot = (label: string, alt: string, src: string): MediaSlot => ({ src, alt, label });

export const projects: Project[] = [
  {
    slug: 'reigate-whole-house',
    title: 'Whole-house transformation',
    location: 'Reigate, Surrey',
    type: 'Extension + refurbishment',
    status: 'Live project',
    sector: 'residential',
    span: 'lead',
    overview:
      'A family house in Reigate taken from a dated, compartmented layout to a larger, open home — extended on two sides and refurbished throughout while the structure was opened up.',
    challenge:
      'Extending on two elevations while refurbishing the existing house meant the structural work, the services and the finishing trades all had to share one programme without tripping over each other.',
    approach:
      'Groundworks and the double-storey side extension were taken up first, with the rear single-storey following so the roof could be closed in early. Refurbishment then ran room by room behind a weather-tight envelope.',
    result:
      'A significantly larger house with a coherent layout, new services and a consistent finish across old and new. Structural works carry the 10-year warranty.',
    scope: ['Side double-storey extension', 'Rear single-storey extension', 'Whole-house refurbishment', 'Structural alterations', 'New services throughout', 'Internal finishes'],
    hero: shot('Project hero — Reigate 16:9', 'Double-storey side extension and refurbishment in Reigate, Surrey', '/images/reigate-hero.jpg'),
    gallery: [shot('Reigate 01', 'Side extension under construction', '/images/reigate-01.jpg'), shot('Reigate 02', 'Refurbished interior', '/images/reigate-02.jpg'), shot('Reigate 03', 'Completed rear elevation', '/images/reigate-03.jpg')],
  },
  {
    slug: 'sydenhurst-new-build',
    title: 'New build residence',
    location: 'Sydenhurst, Haslemere',
    type: 'New build',
    status: 'Completed',
    sector: 'residential',
    span: 'half',
    overview: 'A complete new-build house delivered from an empty site through to a finished, occupied home.',
    challenge: 'A new build carries every trade in one programme — the sequencing from dig to handover has to be right or the whole schedule moves.',
    approach: 'Groundworks, superstructure, envelope and fit-out run as four clear stages with a single site team and one point of contact for the client throughout.',
    result: 'A finished home built to programme, with structural installation backed by the 10-year warranty.',
    scope: ['Site set out and groundworks', 'Foundations and drainage', 'Superstructure', 'Roof and envelope', 'Internal fit-out', 'External works'],
    hero: shot('Project hero — Sydenhurst 16:9', 'Completed new build house at Sydenhurst, Haslemere', '/images/sydenhurst-hero.jpg'),
    gallery: [shot('Sydenhurst 01', 'Groundworks stage', '/images/sydenhurst-01.jpg'), shot('Sydenhurst 02', 'Superstructure', '/images/sydenhurst-02.jpg'), shot('Sydenhurst 03', 'Completed elevation', '/images/sydenhurst-03.jpg')],
  },
  {
    slug: 'clapham-junction-extension',
    title: 'Rear extension',
    location: 'Clapham Junction, London',
    type: 'Extension',
    status: 'Completed',
    sector: 'residential',
    span: 'half',
    overview: 'A rear extension to a London terrace, adding usable ground-floor space and light to the back of the house.',
    challenge: 'Terraced London sites mean tight access, neighbouring party walls and no room for storing materials on site.',
    approach: 'Careful sequencing and just-in-time deliveries kept the site workable, with structural openings propped and formed before the new envelope went up.',
    result: 'A brighter, larger ground floor that reads as part of the original house rather than an addition.',
    scope: ['Structural openings', 'Rear extension', 'Roof and glazing', 'Internal alterations', 'Finishes'],
    hero: shot('Project hero — Clapham Junction 16:9', 'Rear extension to a Victorian terrace in Clapham Junction, London', '/images/clapham-hero.jpg'),
    gallery: [shot('Clapham 01', 'Structural openings', '/images/clapham-01.jpg'), shot('Clapham 02', 'New glazing', '/images/clapham-02.jpg'), shot('Clapham 03', 'Completed interior', '/images/clapham-03.jpg')],
  },
  {
    slug: 'raynes-park-loft',
    title: 'Loft conversion',
    location: 'Raynes Park, London',
    type: 'Loft conversion',
    status: 'Completed',
    sector: 'residential',
    span: 'third',
    overview: 'Unused roof space converted into habitable accommodation with proper headroom, natural light and a compliant staircase.',
    challenge: 'Getting usable head height and a staircase that works without eating into the floor below.',
    approach: 'Steels in first to carry the new floor, then the dormer to open up the volume, then a fit-out sequence that kept the rest of the house liveable.',
    result: 'A new floor of accommodation, finished to match the rest of the house.',
    scope: ['Structural steels', 'Dormer construction', 'Staircase', 'Insulation and plasterboard', 'Bathroom fit-out', 'Finishes'],
    hero: shot('Project hero — Raynes Park 16:9', 'Completed loft conversion in Raynes Park, London', '/images/raynes-park-hero.jpg'),
    gallery: [shot('Raynes Park 01', 'Dormer construction', '/images/raynes-park-01.jpg'), shot('Raynes Park 02', 'New staircase', '/images/raynes-park-02.jpg'), shot('Raynes Park 03', 'Finished bedroom', '/images/raynes-park-03.jpg')],
  },
  {
    slug: 'thornton-heath-loft',
    title: 'Loft conversion',
    location: 'Thornton Heath, London',
    type: 'Loft conversion',
    status: 'Live project',
    sector: 'residential',
    span: 'third',
    overview: 'A loft conversion currently on site, adding a new floor of accommodation to a London home.',
    challenge: 'Working above an occupied house means dust, noise and access all need managing daily.',
    approach: 'Protected routes, contained work areas and a set weekly update to the client on what is happening next.',
    result: 'In progress — photography and full details to follow on completion.',
    scope: ['Structural steels', 'New floor structure', 'Dormer', 'Staircase', 'Insulation and finishes'],
    hero: shot('Project hero — Thornton Heath 16:9', 'Loft conversion in progress in Thornton Heath, London', '/images/thornton-heath-hero.jpg'),
    gallery: [shot('Thornton Heath 01', 'Steels installed', '/images/thornton-heath-01.jpg'), shot('Thornton Heath 02', 'Dormer framing', '/images/thornton-heath-02.jpg'), shot('Thornton Heath 03', 'Progress view', '/images/thornton-heath-03.jpg')],
  },
  {
    slug: 'tadworth-extensions',
    title: 'Side extensions & whole-house refurbishment',
    location: 'Tadworth, Surrey',
    type: 'Extension + refurbishment',
    status: 'Live project',
    sector: 'residential',
    span: 'third',
    overview: 'Side extensions combined with a full refurbishment of the existing house, currently on site.',
    challenge: 'Two workstreams — new build and refurbishment — running against one programme and one budget.',
    approach: 'Extensions taken to weather-tight first, then refurbishment worked back through the house so trades follow one another cleanly.',
    result: 'In progress — photography and full details to follow on completion.',
    scope: ['Side extensions', 'Structural alterations', 'Whole-house refurbishment', 'Services renewal', 'Kitchen and bathrooms', 'Finishes'],
    hero: shot('Project hero — Tadworth 16:9', 'Side extensions and refurbishment in Tadworth, Surrey', '/images/tadworth-hero.jpg'),
    gallery: [shot('Tadworth 01', 'Extension foundations', '/images/tadworth-01.jpg'), shot('Tadworth 02', 'Structural work', '/images/tadworth-02.jpg'), shot('Tadworth 03', 'Progress view', '/images/tadworth-03.jpg')],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
