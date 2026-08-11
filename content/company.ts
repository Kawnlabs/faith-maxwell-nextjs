export const company = {
  name: 'Faith & Maxwell Construction',
  shortName: 'Faith & Maxwell',
  tagline: 'Have Faith in Us, We Believe in Better',
  url: 'https://faithandmaxwellconstruction.co.uk',
  phoneOffice: '01932 860 553',
  phoneOfficeHref: '+441932860553',
  phoneMobile: '07562 204 007',
  phoneMobileHref: '+447562204007',
  whatsapp: 'https://wa.me/447562204007',
  email: 'info@faithandmaxwell.co.uk',
  address: {
    line1: 'Long Barn, Cobham Park Road',
    locality: 'Cobham',
    region: 'Surrey',
    postcode: 'KT11 3NE',
    country: 'GB',
  },
  hours: 'Monday–Saturday, 8am–6pm',
  hoursNote: 'Sunday and out of hours: support by text message and WhatsApp',
  yearsExperience: '20+',
  warranty: {
    structural: '10-year warranty on structural installation',
    finishing: '1-year warranty on non-structural and finishing elements',
  },
  areas: ['Surrey', 'London', 'Berkshire', 'Hampshire', 'Kent', 'East Sussex', 'West Sussex'],
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
} as const;

export const budgetRanges = [
  'Under £50k', '£50k–£100k', '£100k–£250k', '£250k–£500k', '£500k+', 'Not sure yet',
] as const;
