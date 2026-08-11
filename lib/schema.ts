import { company } from '@/content/company';
import { services } from '@/content/services';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: company.name,
  slogan: company.tagline,
  url: company.url,
  telephone: `+44${company.phoneOfficeHref.slice(3)}`,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.line1,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postcode,
    addressCountry: company.address.country,
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  }],
  areaServed: company.areas.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.short },
    })),
  },
};

export const serviceSchema = (name: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: name,
  description,
  provider: { '@type': 'GeneralContractor', name: company.name, url: company.url },
  areaServed: company.areas.map((a) => ({ '@type': 'AdministrativeArea', name: a })),
});
