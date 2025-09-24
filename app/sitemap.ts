/**
 * Dynamic Sitemap Generation for GEO Optimization
 * Includes all pages, services, and location-based URLs
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elazadarya.com';
  const locales = ['en', 'tr', 'ru', 'az'];
  const services = ['bioenergy', 'biotherapy', 'life-coaching'];
  const locations = {
    'turkey': ['istanbul', 'ankara', 'izmir', 'bursa', 'antalya'],
    'usa': ['new-york', 'los-angeles', 'chicago'],
    'uk': ['london', 'birmingham', 'manchester']
  };

  const sitemap: MetadataRoute.Sitemap = [];

  // Add main pages for each locale
  locales.forEach(locale => {
    // Home page
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Services overview
    sitemap.push({
      url: `${baseUrl}/${locale}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Individual service pages
    services.forEach(service => {
      sitemap.push({
        url: `${baseUrl}/${locale}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // About pages
    sitemap.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    sitemap.push({
      url: `${baseUrl}/${locale}/about/biography`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    sitemap.push({
      url: `${baseUrl}/${locale}/about/certificates`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    sitemap.push({
      url: `${baseUrl}/${locale}/about/awards-achievements`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    // Contact page
    sitemap.push({
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Blog pages
    sitemap.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });

    // Books pages
    sitemap.push({
      url: `${baseUrl}/${locale}/books`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Poems pages
    sitemap.push({
      url: `${baseUrl}/${locale}/poems`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Local SEO pages - Service + Location combinations
    services.forEach(service => {
      Object.entries(locations).forEach(([state, cities]) => {
        cities.forEach(city => {
          sitemap.push({
            url: `${baseUrl}/${locale}/services/${service}/${state}/${city}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        });
      });
    });
  });

  return sitemap;
}

// Generate static sitemap for better SEO
export function generateStaticParams() {
  return [];
}
