/**
 * Bioenergy Therapy Service Page - GEO Optimized
 * URL: /services/bioenergy
 * Target: "Best bioenergy therapy", "bioenergy healing", "professional bioenergy"
 */

import { Metadata } from 'next';
import { generateGEOMetadata } from '@/components/GEOHead';
import { GEOPageConfig } from '@/lib/geo-content';
import GEOServicePage from '@/components/GEOServicePage';
import GEOSnippets from '@/components/GEOSnippets';
import DynamicFAQ from '@/components/DynamicFAQ';
import DynamicH1 from '@/components/DynamicH1';
import { UserRoundSearch, Haze, Scale, Star,} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  
  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale,
    service: 'bioenergy'
  };

  return generateGEOMetadata(geoConfig, {
    title: t('mainServices.bioenergy.title') + ' | Life Coaching & Bioenergy Therapy 2025',
    description: t('mainServices.bioenergy.description'),
    keywords: 'bioenergy therapy, energy healing, chakra balancing, holistic healing, bioenergy practitioner, energy medicine, spiritual healing, alternative therapy'
  });
}

export default async function BioenergyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const bioenergyT = await getTranslations({ locale, namespace: 'bioenergyPage' });
  
  // Safe translation with fallback
  const getLabel = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };

  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale,
    service: 'bioenergy'
  };

  const customContent = {
    hero: {
      title: t('mainServices.bioenergy.title'),
      description: t('mainServices.bioenergy.description')
    },
    features: [
      {
        title: t('mainServices.bioenergy.features.energyAssessment.title'),
        description: t('mainServices.bioenergy.features.energyAssessment.description'),
        icon: <UserRoundSearch />
      },
      {
        title: t('mainServices.bioenergy.features.chakraBalancing.title'),
        description: t('mainServices.bioenergy.features.chakraBalancing.description'),
        icon: <Scale />
      },
      {
        title: t('mainServices.bioenergy.features.auraCleansing.title'),
        description: t('mainServices.bioenergy.features.auraCleansing.description'),
        icon:   <Haze />
      },
      {
        title: t('mainServices.bioenergy.features.energyHealing.title'),
        description: t('mainServices.bioenergy.features.energyHealing.description'),
        icon: <Star />
      }
    ],
    testimonials: [
      {
        text: 'The bioenergy therapy sessions completely transformed my energy levels. I feel more balanced and vibrant than I have in years.',
        author: 'Maria K.',
        rating: 5,
        location: 'Istanbul Client'
      },
      {
        text: 'After struggling with chronic fatigue, bioenergy healing gave me my life back. The results were immediate and lasting.',
        author: 'Ahmed R.',
        rating: 5,
        location: 'Ankara Client'
      }
    ]
  };

  const customSnippets = {
    quickAnswer: bioenergyT('snippets.quickAnswer'),
    process: t('mainServices.bioenergy.process'),
    duration: t('mainServices.bioenergy.results')
  };

  // JSON-LD Schema for Bioenergy Page
  const bioenergySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professional Bioenergy Therapy",
    "url": `https://elazadarya.com/${locale}/services/bioenergy`,
    "description": "Professional bioenergy healing therapy for energy balance, chakra alignment, and holistic wellness",
    "serviceType": "Alternative Medicine",
    "provider": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Certified Bioenergy Therapist",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Bioenergy Therapy Practitioner"
      }
    },
    "offers": {
      "@type": "Offer",
      "name": "Bioenergy Therapy Session",
      "description": "Professional bioenergy healing session for energy balance and wellness"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Turkey"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://elazadarya.com/${locale}/services/bioenergy`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bioenergySchema) }}
      />
      
      <div className="min-h-screen sm:py-20">
        {/* Dynamic H1 Hero Section */}
      <section className=" py-17 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <DynamicH1
              service="bioenergy"
              pageType="service"
              locale={locale}
              fallbackCity="Istanbul"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              staticH1="Professional Bioenergy Therapy - Transform Your Energy, Transform Your Life"
            />
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {customContent.hero.description}
            </p>
            
            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {getLabel('whyChoose.reasons.certified.title', 'Certified Professional')}
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {getLabel('whyChoose.reasons.proven.title', '500+ Success Stories')}
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {getLabel('whyChoose.reasons.personalized.title', 'Personalized Approach')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#006241] text-white px-8 py-4 rounded-lg font-semibold   transition-colors">
                <Link href={`/${locale}/contact`}>{t('cta.primaryButton')}</Link>
              </button>
              <button className="border-2 border-[#006241] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#006241] hover:text-white transition-colors">
                <Link href={`/${locale}/about/biography`}>{t('cta.secondaryButton')}</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {customContent.features?.map((feature, index) => (
            <div key={index} className="bg-background relative z-20 flex h-full flex-col items-start justify-start gap-2 rounded-3xl p-5 border shadow-sm hover:shadow-md transition-shadow">
              <div className="size-15 mb-12 flex items-center justify-center rounded-2xl text-[#006241] bg-[#016341]">
                <span className="text-2xl text-white">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-medium tracking-tight mb-2">{feature.title}</h3>
              <p className="text-black text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        {/* <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Client Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {customContent.testimonials?.map((testimonial, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-800 italic mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="text-yellow-400 mr-2">{'★'.repeat(testimonial.rating)}</div>
                  <span className="font-semibold">{testimonial.author}</span>
                  <span className="text-gray-600 ml-2">- {testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </div>
      
      {/* AI-Optimized Snippets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
     

        {/* Detailed Information Sections */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* What is Bioenergy Therapy? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {bioenergyT('detailedSections.whatIs.title')}
            </h2>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4">
                {bioenergyT('detailedSections.whatIs.description')}
              </p>
              <p className="text-gray-700 mb-4">
                {bioenergyT('detailedSections.whatIs.sessionDescription')}
              </p>
              <h3 className="text-xl font-semibold mb-3">{bioenergyT('detailedSections.whatIs.scientificFoundation.title')}</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {bioenergyT.raw('detailedSections.whatIs.scientificFoundation.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Conditions Treated */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {bioenergyT('detailedSections.conditions.title')}
            </h2>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4">
                {bioenergyT('detailedSections.conditions.description')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{bioenergyT('detailedSections.conditions.physical.title')}</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {bioenergyT.raw('detailedSections.conditions.physical.items').map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{bioenergyT('detailedSections.conditions.emotional.title')}</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {bioenergyT.raw('detailedSections.conditions.emotional.items').map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

     

        {/* Dynamic FAQ */}
        <DynamicFAQ 
          config={geoConfig} 
          customFAQs={[
            {
              question: t('bioenergyPage.faq.sessions.question'),
              answer: t('bioenergyPage.faq.sessions.answer')
            },
            {
              question: t('bioenergyPage.faq.safety.question'),
              answer: t('bioenergyPage.faq.safety.answer')
            },
            {
              question: t('bioenergyPage.faq.firstSession.question'),
              answer: t('bioenergyPage.faq.firstSession.answer')
            }
          ]}
          showSearch={true}
        />
      </div>
    </div>
    </>
  );
}