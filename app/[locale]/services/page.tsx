/**
 * Services Overview Page - GEO Optimized
 * URL: /services
 * Target: "Professional wellness services", "holistic health services", "life coaching services"
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { generateGEOMetadata } from '@/components/GEOHead';
import { GEOPageConfig } from '@/lib/geo-content';
import GEOSnippets from '@/components/GEOSnippets';

import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  
  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale
  };

  return generateGEOMetadata(geoConfig, {
    title: t('pageTitle') + ' | Life Coaching & Bioenergy Therapy 2025',
    description: t('description'),
    keywords: 'wellness services, life coaching, bioenergy therapy, biotherapy, holistic health, personal development, professional coaching, alternative medicine',
    openGraph: {
      title: t('pageTitle') + ' | Life Coaching & Bioenergy Therapy 2025',
      description: t('description'),
      url: `https://elazadarya.com/${locale}/services`,
      type: 'website',
      images: ['/ogm.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: t('pageTitle') + ' | Life Coaching & Bioenergy Therapy 2025',
      description: t('description'),
      images: ['/ogm.png']
    },
    alternates: {
      canonical: `https://elazadarya.com/${locale}/services`
    }
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  
  // Safe translation with fallback for optional header labels
  const getLabel = (key: string, fallback: string) => {
    try {
      return t(key);
    } catch {
      return fallback;
    }
  };

  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale
  };

  const services = [
    {
      title: t('mainServices.lifeCoaching.title'),
      slug: 'life-coaching',
      description: t('mainServices.lifeCoaching.description'),
      benefits: t.raw('mainServices.lifeCoaching.benefits') as string[],
      duration: t('mainServices.lifeCoaching.duration'),
      icon: '🎯',
      color: 'blue'
    },
    {
      title: t('mainServices.bioenergy.title'),
      slug: 'bioenergy',
      description: t('mainServices.bioenergy.description'),
      benefits: t.raw('mainServices.bioenergy.benefits') as string[],
      duration: t('mainServices.bioenergy.duration'),
      icon: '⚡',
      color: 'blue'
    },
    {
      title: t('mainServices.biotherapy.title'),
      slug: 'biotherapy',
      description: t('mainServices.biotherapy.description'),
      benefits: t.raw('mainServices.biotherapy.benefits') as string[],
      duration: t('mainServices.biotherapy.duration'),
      icon: '🔬',
      color: 'purple'
    }
  ];

  // JSON-LD Schema for Services Page
  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Wellness Services - Elza Darya",
    "url": `https://elazadarya.com/${locale}/services`,
    "description": "Professional life coaching, bioenergy therapy, and biotherapy services for holistic wellness and personal transformation",
    "provider": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Professional Life Coach & Bioenergy Therapist"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Wellness Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Life Coaching",
          "description": "Professional life coaching for personal development and goal achievement",
          "serviceType": "Counseling",
          "provider": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        },
        {
          "@type": "Service", 
          "name": "Bioenergy Therapy",
          "description": "Professional bioenergy healing therapy for energy balance and wellness",
          "serviceType": "Alternative Medicine",
          "provider": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        },
        {
          "@type": "Service",
          "name": "Biotherapy",
          "description": "Advanced biotherapy treatments for holistic health and healing",
          "serviceType": "Alternative Medicine", 
          "provider": {
            "@type": "Person",
            "name": "Elza Darya"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('pageTitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {t('description')}
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t('whyChoose.reasons.certified.title')}
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t('whyChoose.reasons.proven.title')}
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t('whyChoose.reasons.personalized.title')}
              </span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t('whyChoose.reasons.support.title')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#006241]/80 text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#006241]/70 transition-colors">
                <Link href={`/${locale}/contact`}>{t('cta.primaryButton')}</Link>
              </button>
              <button className="border-2 border-[#006241]/80 text-[#006241]/80 px-8 py-4 rounded-lg font-semibold  transition-colors">
                <Link href={`/${locale}/services`}>{t('cta.secondaryButton')}</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('pageSubtitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className='bg-white rounded-2xl border overflow-hidden'>
                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <span className={`text-${service.color}-600 mr-2`}>✓</span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-900">Duration:</span>
                        <div className="text-gray-600">{service.duration}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link 
                      href={`/${locale}/services/${service.slug}`}
                      className='bg-[#006241] text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-[#006241]/70 transition-colors'
                    >
                      Learn More {service.title}
                    </Link>
                
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Comparison */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('comparison.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">{getLabel('comparison.headers.service', 'Service')}</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">{getLabel('comparison.headers.bestFor', 'Best For')}</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">{getLabel('comparison.headers.focusArea', 'Focus Area')}</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">{getLabel('comparison.headers.timeline', 'Timeline')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{t('mainServices.lifeCoaching.title')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.lifeCoaching.bestFor')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.lifeCoaching.focusArea')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.lifeCoaching.timeline')}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{t('mainServices.bioenergy.title')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.bioenergy.bestFor')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.bioenergy.focusArea')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.bioenergy.timeline')}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium text-gray-900">{t('mainServices.biotherapy.title')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.biotherapy.bestFor')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.biotherapy.focusArea')}</td>
                    <td className="py-4 px-4 text-gray-700">{t('comparison.biotherapy.timeline')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('whyChoose.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('whyChoose.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-[#006241]/10 p-10 rounded-md h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                👨‍⚕️
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyChoose.reasons.certified.title')}</h3>
              <p className="text-gray-600 text-sm">{t('whyChoose.reasons.certified.description')}</p>
            </div>
            
            <div className="text-center bg-[#006241]/10 p-10 rounded-md h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-white text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                🎯
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyChoose.reasons.personalized.title')}</h3>
              <p className="text-gray-600 text-sm">{t('whyChoose.reasons.personalized.description')}</p>
            </div>
            
            <div className="text-center bg-[#006241]/10 p-10 rounded-md h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-white text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                📊
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyChoose.reasons.proven.title')}</h3>
              <p className="text-gray-600 text-sm">{t('whyChoose.reasons.proven.description')}</p>
            </div>
            
            <div className="text-center bg-[#006241]/10 p-10 rounded-md h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-white text-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                🤝
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('whyChoose.reasons.support.title')}</h3>
              <p className="text-gray-600 text-sm">{t('whyChoose.reasons.support.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Optimized Snippets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {getLabel('snippets.title', 'Complete Guide to Our Wellness Services')}
          </h2>
          <GEOSnippets 
            config={geoConfig} 
            customSnippets={{
              quickAnswer: getLabel('snippets.quickAnswer', 'Our professional wellness services include life coaching for personal development, bioenergy therapy for energy healing, and biotherapy for cellular health optimization, all delivered by certified practitioners.'),
              process: getLabel('snippets.process', 'Our wellness services begin with comprehensive consultation, followed by personalized treatment plans, regular sessions using proven techniques, and ongoing support for lasting transformation.'),
              duration: getLabel('snippets.duration', 'Sessions range from 60-120 minutes depending on the service, with most clients seeing significant improvements within 4-8 weeks of consistent treatment.')
            }}
            keyBenefits={{
              title: getLabel('snippets.keyBenefits.title', 'Key Benefits of Wellness Service:'),
              items: t.raw('snippets.keyBenefits.items') as string[] || [
                'Stress reduction and emotional balance',
                'Improved energy levels and vitality', 
                'Enhanced self-awareness and clarity',
                'Personal growth and transformation',
                'Holistic approach to wellness',
                'Professional, certified care'
              ]
            }}
            quickAnswerTitle={getLabel('snippets.title', 'Quick Answer: What is Wellness Service?')}
          />
        </div>

        {/* Dynamic FAQ */}
        {/* <DynamicFAQ 
          config={geoConfig} 
          customFAQs={[
            {
              question: getLabel('servicesPage.faq.whichService.question', 'Which wellness service is best for me?'),
              answer: getLabel('servicesPage.faq.whichService.answer', 'The best service depends on your specific goals and needs. Life coaching is ideal for personal development and goal achievement, bioenergy therapy for energy imbalances and stress relief, and biotherapy for health optimization. We offer free consultations to help determine the most suitable approach.')
            },
            {
              question: getLabel('servicesPage.faq.willItWork.question', 'How do I know if wellness services will work for me?'),
              answer: getLabel('servicesPage.faq.willItWork.answer', 'Our services have helped thousands of clients achieve their wellness goals. During your initial consultation, we assess your specific situation and create a personalized plan with clear milestones to track your progress.')
            },
            {
              question: getLabel('servicesPage.faq.combineServices.question', 'Can I combine different wellness services?'),
              answer: getLabel('servicesPage.faq.combineServices.answer', 'Yes, many clients benefit from combining services. For example, life coaching with bioenergy therapy can address both personal development and energy balance simultaneously. We create integrated treatment plans for optimal results.')
            },
            {
              question: getLabel('servicesPage.faq.qualifications.question', 'What qualifications do your practitioners have?'),
              answer: getLabel('servicesPage.faq.qualifications.answer', 'All our practitioners are certified professionals with extensive training in their respective fields. They undergo regular continuing education and maintain professional certifications to ensure the highest quality of care.')
            }
          ]}
          showSearch={true}
        /> */}
      </div>

      </div>
    </>
  );
}
