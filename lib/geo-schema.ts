/**
 * GEO (Generative Engine Optimization) Schema Generator
 * Dynamic schema markup for AI-friendly content extraction
 */

export interface SchemaConfig {
  pageType: string;
  locale: string;
  pathname: string;
  city?: string;
  state?: string;
  service?: string;
  businessName: string;
  businessType: string;
  description: string;
  author?: {
    name: string;
    jobTitle: string;
    sameAs: string[];
  };
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export class GEOSchemaGenerator {
  private baseUrl: string;
  private businessInfo: any;

  constructor(baseUrl: string = 'https://elazadarya.com') {
    this.baseUrl = baseUrl;
    this.businessInfo = {
      name: 'Elza Darya',
      type: 'HealthAndBeautyBusiness',
      description: 'Professional Life Coach & Bioenergy Therapist providing wellness and personal development services',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressLocality: 'Istanbul',
        postalCode: '34000'
      },
      telephone: '+90 555 123 4567',
      email: 'info@elzadarya.com',
      url: this.baseUrl,
      sameAs: [
        'https://instagram.com/elzadarya',
        'https://facebook.com/elzadarya'
      ]
    };
  }

  // Organization Schema - Core business information
  generateOrganizationSchema(locale: string): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${this.baseUrl}#organization`,
      name: this.businessInfo.name,
      url: this.baseUrl,
      logo: `${this.baseUrl}/elza-logo.svg`,
      description: this.businessInfo.description,
      address: this.businessInfo.address,
      telephone: this.businessInfo.telephone,
      email: this.businessInfo.email,
      sameAs: this.businessInfo.sameAs,
      founder: {
        '@type': 'Person',
        name: 'Elza Darya',
        jobTitle: 'Life Coach & Bioenergy Therapist',
        sameAs: this.businessInfo.sameAs
      },
      areaServed: {
        '@type': 'Country',
        name: 'Turkey'
      },
      knowsAbout: [
        'Life Coaching',
        'Bioenergy Therapy',
        'Personal Development',
        'Stress Management',
        'Wellness Coaching'
      ]
    };
  }

  // Person Schema - Author/Professional
  generatePersonSchema(config: SchemaConfig): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.baseUrl}#person`,
      name: 'Elza Darya',
      jobTitle: 'Professional Life Coach & Bioenergy Therapist',
      description: 'Certified life coach and bioenergy therapist helping individuals transform their lives through holistic wellness approaches.',
      url: this.baseUrl,
      image: `${this.baseUrl}/elza-darya-logo.jpeg`,
      sameAs: this.businessInfo.sameAs,
      worksFor: {
        '@id': `${this.baseUrl}#organization`
      },
      knowsAbout: [
        'Life Coaching',
        'Bioenergy Therapy',
        'Personal Development',
        'Holistic Wellness',
        'Stress Management'
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certified Life Coach'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Bioenergy Therapy Practitioner'
        }
      ]
    };
  }

  // WebPage Schema - Page-specific information
  generateWebPageSchema(config: SchemaConfig): any {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${this.baseUrl}${config.pathname}`,
      url: `${this.baseUrl}${config.pathname}`,
      name: this.generatePageTitle(config),
      description: config.description,
      inLanguage: config.locale,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${this.baseUrl}#website`
      },
      about: {
        '@id': `${this.baseUrl}#organization`
      },
      author: {
        '@id': `${this.baseUrl}#person`
      }
    };

    // Add specific schema based on page type
    if (config.pageType === 'service' || config.pageType === 'bioenergy' || config.pageType === 'biotherapy' || config.pageType === 'life-coaching') {
      return {
        ...baseSchema,
        '@type': 'ServicePage',
        mainEntity: this.generateServiceSchema(config)
      };
    }

    if (config.pageType === 'about' || config.pageType === 'biography') {
      return {
        ...baseSchema,
        '@type': 'AboutPage'
      };
    }

    if (config.pageType === 'contact') {
      return {
        ...baseSchema,
        '@type': 'ContactPage'
      };
    }
    
    if (config.pageType === 'blog') {
      return {
        ...baseSchema,
        '@type': 'Blog'
      };
    }
    
    if (config.pageType === 'books') {
      return {
        ...baseSchema,
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Published Books',
          description: 'Collection of books on wellness and personal development by Elza Darya'
        }
      };
    }
    
    if (config.pageType === 'poems') {
      return {
        ...baseSchema,
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Poetry Collection',
          description: 'Inspirational poetry collection by Elza Darya'
        }
      };
    }
    
    if (config.pageType === 'awards-achievements') {
      return {
        ...baseSchema,
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Awards & Achievements',
          description: 'Professional recognition and achievements in wellness field'
        }
      };
    }
    
    if (config.pageType === 'certificates-and-diploma') {
      return {
        ...baseSchema,
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Certifications & Diplomas',
          description: 'Professional qualifications and educational credentials'
        }
      };
    }

    return baseSchema;
  }

  // Service Schema - For service pages
  generateServiceSchema(config: SchemaConfig): any {
    const serviceMap: { [key: string]: any } = {
      'bioenergy': {
        name: 'Bioenergy Therapy',
        description: 'Professional bioenergy healing therapy for physical and emotional wellness',
        serviceType: 'Alternative Medicine'
      },
      'biotherapy': {
        name: 'Biotherapy Treatment',
        description: 'Advanced biotherapy treatments for holistic health and healing',
        serviceType: 'Alternative Medicine'
      },
      'life-coaching': {
        name: 'Life Coaching',
        description: 'Professional life coaching for personal development and goal achievement',
        serviceType: 'Counseling'
      }
    };

    // Handle page type as service identifier
    let serviceKey = config.service || config.pageType;
    if (config.pageType === 'bioenergy' || config.pageType === 'biotherapy' || config.pageType === 'life-coaching') {
      serviceKey = config.pageType;
    }

    const service = serviceMap[serviceKey] || serviceMap['life-coaching'];

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
      provider: {
        '@id': `${this.baseUrl}#organization`
      },
      areaServed: {
        '@type': 'Country',
        name: 'Turkey'
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${this.baseUrl}${config.pathname}`,
        servicePhone: this.businessInfo.telephone
      }
    };
  }

  // FAQ Schema - Dynamic FAQ generation
  generateFAQSchema(config: SchemaConfig): any | null {
    if (!config.faq || config.faq.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
  }

  // Breadcrumb Schema - Navigation structure
  generateBreadcrumbSchema(config: SchemaConfig): any {
    const breadcrumbs = config.breadcrumbs || this.generateDefaultBreadcrumbs(config);

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${this.baseUrl}${crumb.url}`
      }))
    };
  }

  // Local Business Schema - For location-based services
  generateLocalBusinessSchema(config: SchemaConfig): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${this.baseUrl}#localbusiness`,
      name: this.businessInfo.name,
      description: this.businessInfo.description,
      url: this.baseUrl,
      telephone: this.businessInfo.telephone,
      email: this.businessInfo.email,
      address: this.businessInfo.address,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 41.0082,
        longitude: 28.9784
      },
      openingHours: 'Mo-Fr 09:00-18:00',
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127'
      },
      review: config.reviews?.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating
        },
        reviewBody: review.text,
        datePublished: review.date
      })) || []
    };
  }

  // How-To Schema - For instructional content
  generateHowToSchema(steps: Array<{ name: string; text: string; image?: string }>): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Get Started with Our Services',
      description: 'Step-by-step guide to beginning your wellness journey',
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.image && { image: step.image })
      }))
    };
  }

  // Generate all schemas for a page
  generateAllSchemas(config: SchemaConfig): any[] {
    const schemas = [
      this.generateOrganizationSchema(config.locale),
      this.generatePersonSchema(config),
      this.generateWebPageSchema(config),
      this.generateBreadcrumbSchema(config),
      this.generateLocalBusinessSchema(config)
    ];

    // Add conditional schemas
    const faqSchema = this.generateFAQSchema(config);
    if (faqSchema) schemas.push(faqSchema);

    if (config.pageType === 'service' || config.pageType === 'bioenergy' || config.pageType === 'biotherapy' || config.pageType === 'life-coaching') {
      schemas.push(this.generateServiceSchema(config));
    }

    return schemas.filter(Boolean);
  }

  // Helper methods
  private generatePageTitle(config: SchemaConfig): string {
    const titles: { [key: string]: string } = {
      'home': `${this.businessInfo.name} - Professional Life Coach & Bioenergy Therapist`,
      'services': `Professional Wellness Services - ${this.businessInfo.name}`,
      'about': `About ${this.businessInfo.name} - Professional Biography`,
      'contact': `Contact ${this.businessInfo.name} - Get Your Appointment`,
      'bioenergy': `Professional Bioenergy Therapy - ${this.businessInfo.name}`,
      'biotherapy': `Advanced Biotherapy Treatment - ${this.businessInfo.name}`,
      'life-coaching': `Professional Life Coaching Services - ${this.businessInfo.name}`,
      'blog': `Wellness Blog - ${this.businessInfo.name}`,
      'books': `Published Books - ${this.businessInfo.name}`,
      'poems': `Poetry Collection - ${this.businessInfo.name}`,
      'biography': `Biography - ${this.businessInfo.name}`,
      'awards-achievements': `Awards & Achievements - ${this.businessInfo.name}`,
      'certificates-and-diploma': `Certifications & Diplomas - ${this.businessInfo.name}`,
      'privacy-policy': `Privacy Policy - ${this.businessInfo.name}`,
      'terms-of-service': `Terms of Service - ${this.businessInfo.name}`
    };

    return titles[config.pageType] || `${this.businessInfo.name}`;
  }

  private generateDefaultBreadcrumbs(config: SchemaConfig): Array<{ name: string; url: string }> {
    const breadcrumbs = [{ name: 'Home', url: `/${config.locale}` }];

    const pathSegments = config.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      const pageType = pathSegments[1];
      breadcrumbs.push({ 
        name: this.capitalizeFirst(pageType), 
        url: `/${config.locale}/${pageType}` 
      });

      if (pathSegments.length > 2) {
        const subPage = pathSegments[2];
        breadcrumbs.push({ 
          name: this.capitalizeFirst(subPage.replace('-', ' ')), 
          url: config.pathname 
        });
      }
    }

    return breadcrumbs;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Snippet-friendly content extractor
export class GEOSnippetGenerator {
  static generateSnippet(content: string, maxLength: number = 160): string {
    // Remove HTML tags and extra whitespace
    const cleanContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (cleanContent.length <= maxLength) return cleanContent;
    
    // Find the last complete sentence within the limit
    const truncated = cleanContent.substring(0, maxLength);
    const lastSentence = truncated.lastIndexOf('.');
    
    if (lastSentence > maxLength * 0.7) {
      return truncated.substring(0, lastSentence + 1);
    }
    
    // Fall back to word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
  }

  static generateAnswerSnippet(question: string, answer: string): string {
    return `${question} ${answer}`.substring(0, 300);
  }

  static generateListSnippet(items: string[]): string {
    return items.join(', ').substring(0, 200);
  }
}

export default GEOSchemaGenerator;
