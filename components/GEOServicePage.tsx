/**
 * GEO Service Page Component
 * Reusable component for service pages with AI optimization
 */

import { GEOPageConfig, GEOContentGenerator } from '@/lib/geo-content';
import  BioterapyBenefit from './BioterapyBenefit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface GEOServicePageProps {
  config: GEOPageConfig;
  customContent?: {
    hero?: {
      title?: string;
      subtitle?: string;
      description?: string;
    };
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    testimonials?: Array<{
      text: string;
      author: string;
      rating: number;
      location?: string;
    }>;
  };
}

export default function GEOServicePage({ config, customContent }: GEOServicePageProps) {
  const contentGenerator = new GEOContentGenerator(config.locale);
  const t = useTranslations('services.geoServicePage');
  
  // Generate AI-optimized content
  const headings = contentGenerator.generateConversationalHeadings(config);
  const snippetContent = contentGenerator.generateSnippetContent(config);
  const localContent = contentGenerator.generateLocalContent(config);
  const comparisonContent = contentGenerator.generateComparisonContent(config);
  const howToSteps = contentGenerator.generateHowToContent(config);
  const faqItems = contentGenerator.generateDynamicFAQ(config);

  const serviceName = config.service ? 
    config.service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
    'Wellness Service';

  const locationText = config.city ? `in ${config.city}` : '';
  const fullLocationText = config.city && config.state ? `${config.city}, ${config.state}` : '';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className=" py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {customContent?.hero?.title || 
               (config.service === 'biotherapy' && config.locale === 'tr' ? 'Bioterapi Tedavisi' :
               (config.city ? t('hero.bestService', { serviceName, locationText }) : t('hero.professionalService', { serviceName })))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {customContent?.hero?.description || 
               (config.service === 'biotherapy' && config.locale === 'tr' ? 'Hücresel işlevi optimize eden, bağışıklık sistemini güçlendiren ve doğal şifa kapasitesini artıran son teknoloji bioterapi tedavisi.' :
               t(`content.definition.${config.service}`))}
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t('trustSignals.certified')}
              </span>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ {t('trustSignals.stories')}
              </span>
              {config.city && (
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ {t('trustSignals.serving', { city: config.city })}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${config.locale}/contact`} className="bg-[#006241]/80 text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#006241]/70 transition-colors text-center">
                {t('buttons.getInTouch')}
              </Link>
              <Link href={`/${config.locale}/about/biography`} className="border-2 border-[#006241]/80 text-[#006241]/80 px-8 py-4 rounded-lg font-semibold hover:bg-[#006241]/80 hover:text-white transition-colors text-center">
                {t('buttons.viewStories')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Service Definition */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {headings[0] || t('sections.whatIs', { serviceName })}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-4">{t(`content.definition.${config.service}`)}</p>
                <p className="text-gray-700 mb-6">{t(`content.benefits.${config.service}`)}</p>
                
                {/* Benefits List */}
                <h3 className="text-xl font-semibold mb-4">{t('benefits.title', { serviceName })}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {(Array.isArray(t.raw('benefits.items')) ? t.raw('benefits.items') : []).map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Why Choose Our Service */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {headings[1] || t('sections.whyChoose', { serviceName })}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">{t(`content.experience.${config.service}`)}</p>
                <p className="text-gray-700 mb-6">{t(`content.personalized.${config.service}`)}</p>
                
                {/* Features Grid */}
                {config.service === 'biotherapy' ? (
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className="bg-[#006241]/10 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🔬 {config.locale === 'tr' ? 'Hücresel Yenilenme' :
                             config.locale === 'en' ? 'Cellular Regeneration' :
                             config.locale === 'ru' ? 'Клеточная регенерация' :
                             config.locale === 'az' ? 'Hüceyrə Yeniləpnməsi' : 'Cellular Regeneration'}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {config.locale === 'tr' ? 'Hücre onarımı ve yenilenme süreçlerini uyarmak için gelişmiş teknikler' :
                         config.locale === 'en' ? 'Advanced techniques to stimulate cellular repair and regeneration processes' :
                         config.locale === 'ru' ? 'Передовые техники для стимуляции процессов клеточного восстановления и регенерации' :
                         config.locale === 'az' ? 'Hüceyrə bərpası və yeniləsppnmə proseslərini stimullaşdırmaq üçün inkişaf etmiş texnikalar' :
                         'Advanced techniques to stimulate cellular repair and regeneration processes'}
                      </p>
                    </div>
                    <div className="bg-[#006241]/10 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🛡️ {config.locale === 'tr' ? 'Bağışıklık Sistemi Desteği' :
                             config.locale === 'en' ? 'Immune System Support' :
                             config.locale === 'ru' ? 'Поддержка иммунной системы' :
                             config.locale === 'az' ? 'İmmun Sistemi Dəstəyi' : 'Immune System Support'}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {config.locale === 'tr' ? 'Vücudunuzun doğal savunma mekanizmalarının güçlendirilmesi ve dengelenmesi' :
                         config.locale === 'en' ? 'Strengthening and balancing your body\'s natural defense mechanisms' :
                         config.locale === 'ru' ? 'Укрепление и балансировка естественных защитных механизмов вашего тела' :
                         config.locale === 'az' ? 'Bədəninizin təbii müdafiə mexanizmlərinin gücləndirilməsi və balanslaşdırılması' :
                         'Strengthening and balancing your body\'s natural defense mechanisms'}
                      </p>
                    </div>
                    <div className="bg-[#006241]/10 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        🌿 {config.locale === 'tr' ? 'Detoksifikasyon' :
                             config.locale === 'en' ? 'Detoxification' :
                             config.locale === 'ru' ? 'Детоксикация' :
                             config.locale === 'az' ? 'Detoksifikasiya' : 'Detoxification'}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {config.locale === 'tr' ? 'Toksinleri elimine etmek ve canlılığı restore etmek için kapsamlı detoks protokolleri' :
                         config.locale === 'en' ? 'Comprehensive detox protocols to eliminate toxins and restore vitality' :
                         config.locale === 'ru' ? 'Комплексные протоколы детоксикации для устранения токсинов и восстановления жизненной силы' :
                         config.locale === 'az' ? 'Toksinləri aradan qaldırmaq və canlılığı bərpa etmək üçün hərtərəfli detoks protokolları' :
                         'Comprehensive detox protocols to eliminate toxins and restore vitality'}
                      </p>
                    </div>
                    <div className="bg-[#006241]/10 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        ⚡ {config.locale === 'tr' ? 'Metabolik Optimizasyon' :
                             config.locale === 'en' ? 'Metabolic Optimization' :
                             config.locale === 'ru' ? 'Метаболическая оптимизация' :
                             config.locale === 'az' ? 'Metabolik Optimallaşdırma' : 'Metabolic Optimization'}
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {config.locale === 'tr' ? 'Gelişmiş enerji ve sağlık için metabolik fonksiyonun artırılması' :
                         config.locale === 'en' ? 'Enhancement of metabolic function for improved energy and health' :
                         config.locale === 'ru' ? 'Улучшение метаболической функции для повышения энергии и здоровья' :
                         config.locale === 'az' ? 'Təkmilləşdirilmiş enerji və sağlamlıq üçün metabolik funksiyanın artırılması' :
                         'Enhancement of metabolic function for improved energy and health'}
                      </p>
                    </div>
                  </div>
                ) : customContent?.features && (
                  <div className="grid md:grid-cols-2 gap-6 my-8">
                    {customContent.features.map((feature, index) => (
                      <div key={index} className="bg-[#006241]/10 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {feature.icon} {feature.title}
                        </h3>
                        <p className="text-gray-700 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* <BioterapyBenefit /> */}

            {/* Process Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {headings[2] || t('sections.whatToExpected', { serviceName })}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">{t(`content.process.${config.service}`)}</p>
                
                {/* Process Steps */}
                <div className="space-y-4">
                  {(Array.isArray(t.raw('process.steps')) ? t.raw('process.steps') : []).map((step: any, index: number) => (
                    <div key={index} className="flex gap-4 p-4 bg-[#006241]/10 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#006241] text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-700 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
         
          </div>

       
        </div>

        {/* FAQ Section */}
        {/* <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions About {serviceName}{locationText}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section> */}

        {/* CTA Section */}
        {/* <section className="mt-16 bg-[#006241] rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your {serviceName} Journey{locationText}?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join {config.city ? `hundreds of ${config.city} residents` : 'thousands of clients'} who have transformed their lives through our professional {serviceName.toLowerCase()} services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
              {config.city ? `Call ${config.city} Office` : 'Call Now'}
            </button>
          </div>
        </section> */}
      </div>
    </div>
  );
}
