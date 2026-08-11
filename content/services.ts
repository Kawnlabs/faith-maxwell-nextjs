export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  points: string[];
  /** editorial grid weight on the homepage */
  span: 'lead' | 'half' | 'third' | 'quarter';
};

export const services: Service[] = [
  {
    slug: 'new-builds', name: 'New builds', span: 'lead',
    short: 'Complete residential schemes taken from foundations through to a finished, warranted home.',
    intro: 'We deliver new build houses from an empty site to a finished home — groundworks, superstructure, envelope and fit-out under one contractor.',
    points: ['Site set out and groundworks', 'Foundations and drainage', 'Superstructure and roof', 'Envelope and weathering', 'Internal fit-out', 'External works and landscaping'],
  },
  {
    slug: 'house-extensions', name: 'House extensions', span: 'half',
    short: 'Single and double-storey, side and rear — detailed to match the existing house.',
    intro: 'Extensions are the majority of what we build. Single-storey, double-storey, side and rear — structurally sound and detailed so the new work reads as part of the original house.',
    points: ['Structural openings and steels', 'Foundations to match existing', 'Brick and render to match', 'Roof and rooflights', 'Glazing and doors', 'Internal finishes'],
  },
  {
    slug: 'loft-conversions', name: 'Loft conversions', span: 'half',
    short: 'Unused roof space turned into rooms with proper headroom and light.',
    intro: 'A loft conversion is the cheapest floor area you will ever add to a house — provided the structure, headroom and staircase are right from the start.',
    points: ['Structural steels and new floor', 'Dormer construction', 'Compliant staircase', 'Insulation and fire separation', 'Bathroom fit-out', 'Finishes to match the house'],
  },
  {
    slug: 'renovation-refurbishment', name: 'Renovation & refurbishment', span: 'third',
    short: 'Whole-house programmes, with services renewed behind the finishes.',
    intro: 'Whole-house refurbishment run room by room, with the services renewed behind the finishes rather than papered over.',
    points: ['Strip out', 'Structural alterations', 'Rewire and re-plumb', 'Plastering and joinery', 'Kitchens and bathrooms', 'Decoration'],
  },
  {
    slug: 'groundworks', name: 'Groundworks', span: 'third',
    short: 'Setting out, excavation, foundations, drainage and slabs.',
    intro: 'The part everything else depends on. We carry out groundworks as a package for other contractors as well as on our own projects.',
    points: ['Site clearance and set out', 'Excavation and muck away', 'Footings and foundations', 'Drainage and services', 'Slabs and oversite', 'Retaining structures'],
  },
  {
    slug: 'rc-frames', name: 'RC frames', span: 'third',
    short: 'Reinforced concrete frames for larger residential and commercial structures.',
    intro: 'Reinforced concrete frame packages for larger schemes, working alongside developers, architects and main contractors.',
    points: ['Formwork', 'Reinforcement fixing', 'Concrete pours', 'Columns, beams and slabs', 'Cores and walls', 'Programme coordination'],
  },
  {
    slug: 'basement-conversions', name: 'Basement conversions', span: 'quarter',
    short: 'New usable floor area below ground, tanked and finished.',
    intro: 'Basement conversions and new basements — underpinning, tanking and finishing to create genuinely usable space below ground.',
    points: ['Underpinning', 'Excavation', 'Tanking and waterproofing', 'Drainage and pumps', 'Lighting and ventilation', 'Finishes'],
  },
  {
    slug: 'kitchens-wardrobes', name: 'Bespoke kitchens & wardrobes', span: 'quarter',
    short: 'Made to the room, not to a catalogue.',
    intro: 'Bespoke kitchens and fitted wardrobes made to suit the room and the way it is used.',
    points: ['Design and setting out', 'Bespoke carcassing', 'Worktops', 'Appliance integration', 'Fitted wardrobes', 'Finishing and adjustment'],
  },
  {
    slug: 'bathrooms', name: 'Bathrooms', span: 'quarter',
    short: 'First fix to final seal, tanked and tiled properly.',
    intro: 'Bathrooms taken from first fix through to the final seal, with the waterproofing done properly behind the tiles.',
    points: ['Strip out', 'First fix plumbing and electrics', 'Tanking', 'Tiling', 'Sanitaryware and brassware', 'Sealing and finishing'],
  },
  {
    slug: 'landscaping-driveways', name: 'Landscaping, driveways & patios', span: 'quarter',
    short: 'Gardens, drives and hard landscaping to finish the site.',
    intro: 'Garden landscaping, driveways and patios — usually the last stage of a build, and the one that makes the whole project read as finished.',
    points: ['Levels and drainage', 'Sub-base preparation', 'Block paving and resin', 'Patios and paths', 'Retaining walls', 'Planting and turfing'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
