import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import LenisScrollProvider from '@/components/providers/lenis-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 
import WhatsAppWrapper from '@/components/WhatsAppWrapper';


        
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// Generate hreflang alternates
function generateHreflangAlternates(pathname: string) {
  const baseUrl = `https://elazadarya.com`;
  const locales = [
    { code: 'en', hreflang: 'en' },
    { code: 'tr', hreflang: 'tr' },
    { code: 'ru', hreflang: 'ru' },
    { code: 'az', hreflang: 'az' },
  ];
  
  // Remove current locale from pathname to get the page path
  const pathSegments = pathname.split('/').filter(Boolean);
  const pagePath = pathSegments.length > 1 ? '/' + pathSegments.slice(1).join('/') : '';
  
  return locales.map(locale => ({
    hreflang: locale.hreflang,
    href: `${baseUrl}/${locale.code}${pagePath}`
  }));
}

// Helper function to get page type from pathname
function getPageType(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return 'home';
  return segments[1]; // Gets the page name after locale
}

// Helper function to get slug from pathname
function getSlugFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 2) {
    return segments[2]; // Gets the slug after page type
  }
  return null;
}

// Helper function to get language code
function getLanguageCode(locale: string): string {
  const languageMap: { [key: string]: string } = {
    'en': 'en-US',
    'tr': 'tr-TR',
    'ru': 'ru-RU',
    'az': 'az-AZ'
  };
  return languageMap[locale] || 'en-US';
}

// Generate page-specific schema
function generatePageSchema(pageType: string, locale: string, messages: any, pathname: string) {
  const baseUrl = `https://elazadarya.com`;
  const fullUrl = `${baseUrl}${pathname}`;
  const slug = getSlugFromPath(pathname);
  
  let pageSchema: any = {};
  
  switch (pageType) {
    case 'home':
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Elza Darya - Professional Life Coach & Bioenergy Therapist",
        "url": fullUrl,
        "description": "Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness.",
        "inLanguage": getLanguageCode(locale),
        "alternateName": "Elza Darya Wellness",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/${locale}/services?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "sameAs": [
          "https://instagram.com/elzadarya",
          "https://facebook.com/elzadarya"
        ]
      };
      break;
      
    case 'about':
      if (slug === 'biography') {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Biography - Elza Darya",
          "url": fullUrl,
          "description": "Professional biography of Elza Darya - Certified life coach and bioenergy therapist",
          "inLanguage": getLanguageCode(locale),
          "mainEntity": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Professional Life Coach & Bioenergy Therapist",
            "description": "Certified professional specializing in life coaching, bioenergy therapy, and holistic wellness",
            "knowsAbout": ["Life Coaching", "Bioenergy Therapy", "Personal Development", "Holistic Wellness"],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "Certified Life Coach"
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "name": "Bioenergy Therapy Practitioner"
              }
            ]
          }
        };
      } else if (slug === 'awards-achievements') {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Awards & Achievements - Elza Darya",
          "url": fullUrl,
          "description": "Professional awards and achievements of Elza Darya in wellness and personal development",
          "inLanguage": getLanguageCode(locale),
          "mainEntity": {
            "@type": "ItemList",
            "name": "Professional Awards & Achievements",
            "description": "Recognition and achievements in the field of wellness and personal development"
          }
        };
      } else if (slug === 'certificates-and-diploma') {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Certificates & Diplomas - Elza Darya",
          "url": fullUrl,
          "description": "Professional certifications and educational qualifications of Elza Darya",
          "inLanguage": getLanguageCode(locale),
          "mainEntity": {
            "@type": "ItemList",
            "name": "Professional Certifications & Diplomas",
            "description": "Educational credentials and professional certifications"
          }
        };
      } else {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Elza Darya",
          "url": fullUrl,
          "description": "Learn about Elza Darya - Professional life coach and bioenergy therapist",
          "inLanguage": getLanguageCode(locale),
          "mainEntity": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Professional Life Coach & Bioenergy Therapist"
          }
        };
      }
      break;
      
    case 'services':
      if (slug === 'bioenergy') {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Bioenergy Therapy Services",
          "url": fullUrl,
          "description": "Professional bioenergy therapy for energy healing and holistic wellness",
          "inLanguage": getLanguageCode(locale),
          "provider": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Bioenergy Therapist"
          },
          "serviceType": "Alternative Medicine",
          "offers": {
            "@type": "Offer",
            "name": "Bioenergy Therapy Session",
            "description": "Professional bioenergy healing session for energy balance and wellness"
          }
        };
      } else if (slug === 'biotherapy') {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Biotherapy Treatment Services",
          "url": fullUrl,
          "description": "Advanced biotherapy treatments for holistic health and healing",
          "inLanguage": getLanguageCode(locale),
          "provider": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Biotherapy Practitioner"
          },
          "serviceType": "Alternative Medicine",
          "offers": {
            "@type": "Offer",
            "name": "Biotherapy Treatment",
            "description": "Professional biotherapy treatment for health and wellness"
          }
        };
      } else if (slug === 'life-coaching') {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Life Coaching Services",
          "url": fullUrl,
          "description": "Professional life coaching for personal development and goal achievement",
          "inLanguage": getLanguageCode(locale),
          "provider": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Certified Life Coach"
          },
          "serviceType": "Counseling",
          "offers": {
            "@type": "Offer",
            "name": "Life Coaching Session",
            "description": "Personalized life coaching session for goal achievement and personal growth"
          }
        };
      } else {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Wellness Services",
          "url": fullUrl,
          "description": "Professional wellness services including life coaching and bioenergy therapy",
          "inLanguage": getLanguageCode(locale),
          "provider": {
            "@type": "Person",
            "name": "Elza Darya"
          },
          "serviceType": "Wellness Services"
        };
      }
      break;
      
    case 'contact':
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Elza Darya",
        "url": fullUrl,
        "description": "Get in touch with Elza Darya for wellness consultations and appointments",
        "inLanguage": getLanguageCode(locale),
        "mainEntity": {
          "@type": "Person",
          "name": "Elza Darya",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["en", "tr", "ru", "az"]
          }
        }
      };
      break;
      
    case 'blog':
      if (slug) {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "name": `Blog Post - ${slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ')}`,
          "url": fullUrl,
          "description": "Wellness and personal development insights from professional life coach Elza Darya",
          "inLanguage": getLanguageCode(locale),
          "author": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Professional Life Coach & Bioenergy Therapist"
          },
          "publisher": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        };
      } else {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Wellness Blog - Elza Darya",
          "url": fullUrl,
          "description": "Professional insights on wellness, personal development, and holistic healing",
          "inLanguage": getLanguageCode(locale),
          "author": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        };
      }
      break;
      
    case 'books':
      if (slug) {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "Book",
          "name": slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
          "url": fullUrl,
          "description": "Published book by professional life coach and author Elza Darya",
          "inLanguage": getLanguageCode(locale),
          "author": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Author & Life Coach"
          },
          "publisher": {
            "@type": "Person",
            "name": "Elza Darya"
          },
          "genre": ["Self-Help", "Personal Development", "Wellness"]
        };
      } else {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Published Books - Elza Darya",
          "url": fullUrl,
          "description": "Books published by professional life coach and author Elza Darya",
          "inLanguage": getLanguageCode(locale),
          "mainEntity": {
            "@type": "ItemList",
            "name": "Published Books",
            "description": "Collection of books on wellness and personal development"
          }
        };
      }
      break;
      
    case 'poems':
      if (slug) {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
          "url": fullUrl,
          "description": "Inspirational poetry by Elza Darya",
          "inLanguage": getLanguageCode(locale),
          "author": {
            "@type": "Person",
            "name": "Elza Darya",
            "jobTitle": "Poet & Life Coach"
          },
          "genre": "Poetry",
          "creativeWorkStatus": "Published"
        };
      } else {
        pageSchema = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Poetry Collection - Elza Darya",
          "url": fullUrl,
          "description": "Inspirational poetry collection by life coach and poet Elza Darya",
          "inLanguage": getLanguageCode(locale),
          "mainEntity": {
            "@type": "ItemList",
            "name": "Poetry Collection",
            "description": "Inspirational poems for personal reflection and growth"
          }
        };
      }
      break;
      
    case 'privacy-policy':
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy - Elza Darya",
        "url": fullUrl,
        "description": "Privacy policy and data protection information for Elza Darya services",
        "inLanguage": getLanguageCode(locale),
        "mainEntity": {
          "@type": "Article",
          "name": "Privacy Policy",
          "author": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        }
      };
      break;
      
    case 'terms-of-service':
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service - Elza Darya",
        "url": fullUrl,
        "description": "Terms of service and conditions for Elza Darya wellness services",
        "inLanguage": getLanguageCode(locale),
        "mainEntity": {
          "@type": "Article",
          "name": "Terms of Service",
          "author": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        }
      };
      break;
      
    default:
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Elza Darya - Professional Life Coach & Bioenergy Therapist",
        "url": fullUrl,
        "description": "Professional wellness and personal development services",
        "inLanguage": getLanguageCode(locale)
      };
  }
  
  return pageSchema;
}

// Generate dynamic breadcrumb list
function generateBreadcrumbList(pageType: string, locale: string, messages: any, pathname: string) {
  const baseUrl = `https://elazadarya.com`;
  const slug = getSlugFromPath(pathname);
  
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${baseUrl}/${locale}`
    }
  ];
  
  // Add page-specific breadcrumb
  if (pageType !== 'home') {
    let pageName = '';
    switch (pageType) {
      case 'about':
        pageName = 'About';
        break;
      case 'services':
        pageName = 'Services';
        break;
      case 'contact':
        pageName = 'Contact';
        break;
      case 'blog':
        pageName = 'Blog';
        break;
      case 'books':
        pageName = 'Books';
        break;
      case 'poems':
        pageName = 'Poems';
        break;
      case 'privacy-policy':
        pageName = 'Privacy Policy';
        break;
      case 'terms-of-service':
        pageName = 'Terms of Service';
        break;
      default:
        pageName = pageType.charAt(0).toUpperCase() + pageType.slice(1);
    }
    
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageName,
      "item": `${baseUrl}/${locale}/${pageType}`
    });
    
    // Add slug-specific breadcrumb for detailed pages
    if (slug) {
      const slugName = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 3,
        "name": slugName,
        "item": `${baseUrl}${pathname}`
      });
    }
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
}

// Generate organization schema
function generateOrganizationSchema(locale: string, messages: any) {
  const baseUrl = `https://elazadarya.com`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elza Darya",
    "url": `${baseUrl}/${locale}`,
    "logo": `${baseUrl}/elza-logo.svg`,
    "description": "Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness",
    "founder": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Life Coach & Bioenergy Therapist"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "Istanbul"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Turkey"
    },
    "knowsAbout": [
      "Life Coaching",
      "Bioenergy Therapy", 
      "Personal Development",
      "Stress Management",
      "Wellness Coaching"
    ],
    "sameAs": [
      "https://instagram.com/elzadarya",
      "https://facebook.com/elzadarya"
    ]
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  try {
    const messages = await getMessages({ locale });
    
    return {
      title: "Elza Darya - Professional Life Coach & Bioenergy Therapist",
      description: "Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness.",
      keywords: "life coach, bioenergy therapy, personal development, wellness services, holistic healing, stress management, life transformation",
      metadataBase: new URL('https://elazadarya.com'),
      alternates: {
        canonical: `https://elazadarya.com/${locale}`,
        languages: {
          'en': '/en',
          'tr': '/tr',
          'ru': '/ru',
          'az': '/az',
          'x-default': '/en'
        }
      },
      icons: {
        icon: [
          {
            url: "/elza-logo.svg", 
            href: "/elza-logo.svg", 
          },
        ],
        apple: [
          {
            url: "/elza-logo.svg",
            sizes: "180x180",
            type: "image/svg+xml",
          },
        ],
      },
      manifest: '/manifest.webmanifest',
      openGraph: {
        title: "Elza Darya - Professional Life Coach & Bioenergy Therapist",
        description: "Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness.",
        url: `https://elazadarya.com/${locale}`,
        siteName: 'Elza Darya',
        locale: locale,
        type: 'website',
        images: [
          {
            url: "/ogm.png",
            width: 1200,
            height: 630,
            alt: "Elza Darya - Professional Life Coach & Bioenergy Therapist",
          },
          {
            url: "/ogm.png",
            width: 800,
            height: 600,
            alt: "Elza Darya Logo",
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: "Elza Darya - Professional Life Coach & Bioenergy Therapist",
        description: "Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness.",
        images: ["/ogm.png"],
        creator: '@elzadarya',
        site: '@elzadarya'
      },
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
      }
    };
  } catch (error) {
    console.error("Error loading metadata for locale:", locale, error);
  }
  
  // Fallback metadata
  return {
    title: "Elza Darya - Professional Life Coach & Bioenergy Therapist",
    description: "Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness.",
    keywords: "life coach, bioenergy therapy, personal development, wellness services, holistic healing",
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate locale
  const validLocales = ['en', 'tr', 'ru','az'];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  // Get current pathname
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  // Get page type from pathname
  const pageType = getPageType(pathname);
  
  // Get messages for the current locale
  const messages = await getMessages();
  
  console.log('🌐 Layout - Current locale:', locale);
  console.log('🌐 Layout - Current page type:', pageType);
  console.log('🌐 Layout - Current pathname:', pathname);
  
  // Generate schemas based on page type
  const pageSchema = generatePageSchema(pageType, locale, messages, pathname);
  const breadcrumbList = generateBreadcrumbList(pageType, locale, messages, pathname);
  const organizationSchema = generateOrganizationSchema(locale, messages);
  
  // Generate hreflang alternates
  const hreflangAlternates = generateHreflangAlternates(pathname);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* CSP Override for Paddle */}
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors *; frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Paddle.js v2 Script - Gerçek Client Token ile */}
        <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              Paddle.Environment.set("sandbox");
              Paddle.Initialize({ 
                token: "test_239484656d3f3b25dbab173442b"
              });
            `,
          }}
        />
        
        {/* Hreflang alternates */}
        {hreflangAlternates.map((alternate) => (
          <link
            key={alternate.hreflang}
            rel="alternate"
            hrefLang={alternate.hreflang}
            href={alternate.href}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://elazadarya.com/en${pathname.replace(/^\/[a-z]{2}/, '')}`}
        />
        
        {/* Dynamic JSON-LD Schema */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} 
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} 
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-satoshi antialiased `}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisScrollProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <WhatsAppWrapper service={pageType as 'bioenergy' | 'books' | 'poems' | 'biotherapist'} />
              {/* <GeoDebug /> */}
            </div>
          </LenisScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
