import type { MetadataRoute } from 'next';
import { company } from '@/content/company';
import { services } from '@/content/services';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/about', '/services', '/projects', '/residential', '/commercial', '/locations', '/contact'];
  return [
    ...routes.map((r) => ({ url: `${company.url}${r}`, lastModified: now, priority: r === '' ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${company.url}/services/${s.slug}`, lastModified: now, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${company.url}/projects/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
