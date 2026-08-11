import type { Metadata } from 'next';
import { Fraunces, Archivo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileDock from '@/components/MobileDock';
import { company } from '@/content/company';
import { localBusinessSchema } from '@/lib/schema';

const display = Fraunces({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-display', display: 'swap' });
const sans = Archivo({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: 'Faith & Maxwell Construction | Builders in Surrey, London & the South East',
    template: '%s | Faith & Maxwell Construction',
  },
  description:
    'Faith & Maxwell Construction deliver new builds, house extensions, loft conversions, groundworks and refurbishments across Surrey, London, Berkshire, Hampshire, Kent and Sussex. 20+ years’ experience, fully insured, 10-year structural warranty.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: company.name,
    title: 'Faith & Maxwell Construction | Building Better. Creating Spaces That Last.',
    description: 'High-quality residential and commercial construction across Surrey, London and surrounding areas.',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#0C0D0E' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body className="pb-[66px] lg:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  );
}
