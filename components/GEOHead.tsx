/**
 * GEO Head Component
 * Dynamic meta tags and schema markup for AI optimization
 */

import { Metadata } from 'next';
import { GEOSchemaGenerator, SchemaConfig } from '@/lib/geo-schema';
import { GEOContentGenerator, GEOPageConfig } from '@/lib/geo-content';

interface GEOHeadProps {
  config: GEOPageConfig;
  customMeta?: Partial<Metadata>;
  schemaConfig?: Partial<SchemaConfig>;
}

export function generateGEOMetadata(config: GEOPageConfig, customMeta?: Partial<Metadata>): Metadata {
  const contentGenerator = new GEOContentGenerator(config.locale);
  const baseUrl = 'https://elazadarya.com';
  
  // Generate dynamic title
  const title = generateDynamicTitle(config);
  
  // Generate AI-optimized description
  const description = contentGenerator.generateMetaDescription(config);
  
  // Generate canonical URL
  const canonical = generateCanonicalUrl(config, baseUrl);
  
  // Generate Open Graph data
  const openGraph = generateOpenGraphData(config, title, description, baseUrl);
  
  // Generate Twitter Card data
  const twitter = generateTwitterData(title, description);

  return {
    title,
    description,
    keywords: generateKeywords(config),
    authors: [{ name: 'Elza Darya', url: baseUrl }],
    creator: 'Elza Darya',
    publisher: 'Elza Darya',
    alternates: {
      canonical,
      languages: generateHreflangAlternates(config, baseUrl)
    },
    openGraph,
    twitter,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: {
        'facebook-domain-verification': process.env.FACEBOOK_DOMAIN_VERIFICATION || '',
      }
    },
    ...customMeta
  };
}

export function generateSchemaMarkup(config: GEOPageConfig, schemaConfig?: Partial<SchemaConfig>): string[] {
  const schemaGenerator = new GEOSchemaGenerator();
  const contentGenerator = new GEOContentGenerator(config.locale);
  
  const fullSchemaConfig: SchemaConfig = {
    pageType: config.pageType,
    locale: config.locale,
    pathname: generatePathname(config),
    city: config.city,
    state: config.state,
    service: config.service,
    businessName: 'Elza Darya',
    businessType: 'HealthAndBeautyBusiness',
    description: contentGenerator.generateMetaDescription(config),
    author: {
      name: 'Elza Darya',
      jobTitle: 'Professional Life Coach & Bioenergy Therapist',
      sameAs: [
        'https://instagram.com/elzadarya',
        'https://facebook.com/elzadarya'
      ]
    },
    faq: contentGenerator.generateDynamicFAQ(config),
    ...schemaConfig
  };

  const schemas = schemaGenerator.generateAllSchemas(fullSchemaConfig);
  return schemas.map(schema => JSON.stringify(schema));
}

// Helper functions
function generateDynamicTitle(config: GEOPageConfig): string {
  const currentYear = new Date().getFullYear();
  const city = config.city || '';
  const service = config.service ? capitalizeService(config.service) : '';
  
  const titleTemplates: { [key: string]: string } = {
    'home': `Professional Life Coach & Bioenergy Therapist | Elza Darya ${currentYear}`,
    'services': `Professional Wellness Services | Expert Care | Elza Darya ${currentYear}`,
    'about': `About Elza Darya | Professional Biography & Credentials ${currentYear}`,
    'contact': `Contact Elza Darya | Book Your Wellness Consultation ${currentYear}`,
    'blog': `Wellness Blog | Expert Tips & Insights | Elza Darya ${currentYear}`,
    'books': `Published Books | Elza Darya | Wellness & Personal Development ${currentYear}`,
    'poems': `Poetry Collection | Inspirational Poems | Elza Darya ${currentYear}`
  };

  // Service-specific titles
  if (config.pageType === 'service' && service) {
    if (city) {
      return `Best ${service} in ${city} ${currentYear} | Professional ${service} Services`;
    }
    return `Professional ${service} Services | Expert ${service} | Elza Darya ${currentYear}`;
  }

  // Location-specific titles
  if (config.pageType === 'location' && city) {
    return `Professional Wellness Services in ${city} ${currentYear} | Elza Darya`;
  }

  return titleTemplates[config.pageType] || titleTemplates.home;
}

function generateKeywords(config: GEOPageConfig): string {
  const baseKeywords = [
    'life coach',
    'bioenergy therapy',
    'personal development',
    'wellness services',
    'holistic healing',
    'stress management',
    'life transformation'
  ];

  const serviceKeywords: { [key: string]: string[] } = {
    'bioenergy': ['bioenergy therapy', 'energy healing', 'chakra balancing', 'holistic healing'],
    'biotherapy': ['biotherapy', 'alternative medicine', 'natural healing', 'therapeutic treatment'],
    'life-coaching': ['life coaching', 'personal coach', 'goal setting', 'life transformation']
  };

  let keywords = [...baseKeywords];

  if (config.service && serviceKeywords[config.service]) {
    keywords = [...keywords, ...serviceKeywords[config.service]];
  }

  if (config.city) {
    keywords = keywords.map(keyword => `${keyword} ${config.city}`).concat(keywords);
  }

  return keywords.join(', ');
}

function generateCanonicalUrl(config: GEOPageConfig, baseUrl: string): string {
  return `${baseUrl}${generatePathname(config)}`;
}

function generatePathname(config: GEOPageConfig): string {
  let pathname = `/${config.locale}`;
  
  if (config.pageType !== 'home') {
    pathname += `/${config.pageType}`;
  }
  
  if (config.service) {
    pathname += `/${config.service}`;
  }
  
  if (config.city && config.state) {
    pathname += `/${config.state.toLowerCase()}/${config.city.toLowerCase().replace(/\s+/g, '-')}`;
  }
  
  if (config.slug) {
    pathname += `/${config.slug}`;
  }
  
  return pathname;
}

function generateHreflangAlternates(config: GEOPageConfig, baseUrl: string): { [key: string]: string } {
  const locales = ['en', 'tr', 'ru', 'az'];
  const alternates: { [key: string]: string } = {};
  
  locales.forEach(locale => {
    const altConfig = { ...config, locale };
    alternates[locale] = `${baseUrl}${generatePathname(altConfig)}`;
  });
  
  return alternates;
}

function generateOpenGraphData(config: GEOPageConfig, title: string, description: string, baseUrl: string): any {
  return {
    title,
    description,
    url: `${baseUrl}${generatePathname(config)}`,
    siteName: 'Elza Darya',
    locale: config.locale,
    type: 'website',
    images: [
      {
        url: `${baseUrl}/elza-darya-logo.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Elza Darya - Professional Life Coach & Bioenergy Therapist'
      }
    ]
  };
}

function generateTwitterData(title: string, description: string): any {
  return {
    card: 'summary_large_image',
    title,
    description,
    creator: '@elzadarya',
    images: ['https://elazadarya.com/elza-darya-logo.jpeg']
  };
}

function capitalizeService(service: string): string {
  const serviceMap: { [key: string]: string } = {
    'bioenergy': 'Bioenergy Therapy',
    'biotherapy': 'Biotherapy',
    'life-coaching': 'Life Coaching',
    'personal-development': 'Personal Development',
    'stress-management': 'Stress Management'
  };

  return serviceMap[service] || service.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Component for rendering schema markup
export function GEOSchemaMarkup({ config, schemaConfig }: { config: GEOPageConfig; schemaConfig?: Partial<SchemaConfig> }) {
  const schemas = generateSchemaMarkup(config, schemaConfig);
  
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
    </>
  );
}

export default GEOSchemaMarkup;
