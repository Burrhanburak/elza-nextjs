/**
 * Biotherapy Service Page - GEO Optimized
 * URL: /services/biotherapy
 * Target: "Best biotherapy treatment", "biotherapy therapy", "professional biotherapy"
 */

import { Metadata } from 'next';
import { generateGEOMetadata } from '@/components/GEOHead';
import { GEOPageConfig } from '@/lib/geo-content';
import GEOServicePage from '@/components/GEOServicePage';
import GEOSnippets from '@/components/GEOSnippets';
import DynamicFAQ from '@/components/DynamicFAQ';
import BioterapyBenefit from '@/components/BioterapyBenefit';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const mainT = await getTranslations({ locale });
  
  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale,
    service: 'biotherapy'
  };

  const metaTitle = locale === 'tr' ? 'Bioterapi Tedavisi' :
                    locale === 'en' ? 'Biotherapy Treatment' :
                    locale === 'ru' ? 'Биотерапевтическое лечение' :
                    locale === 'az' ? 'Bioterapiya Müalicəsi' : 'Biotherapy Treatment';
  
  const metaDesc = locale === 'tr' ? 'Hücresel işlevi optimize eden, bağışıklık sistemini güçlendiren ve doğal şifa kapasitesini artıran son teknoloji bioterapi tedavisi.' :
                   locale === 'en' ? 'Advanced biotherapy treatment that optimizes cellular function, strengthens the immune system, and enhances natural healing capacity.' :
                   locale === 'ru' ? 'Передовое биотерапевтическое лечение, которое оптимизирует клеточную функцию, укрепляет иммунную систему и улучшает естественную способность к исцелению.' :
                   locale === 'az' ? 'Hüceyrə funksiyasını optimalaşdıran, immun sistemini gücləndrən və təbii şəfa qabiliyyətini artıran qabaqcıl bioterapiya müalicəsi.' :
                   'Advanced biotherapy treatment that optimizes cellular function, strengthens the immune system, and enhances natural healing capacity.';

  return generateGEOMetadata(geoConfig, {
    title: metaTitle + ' | Life Coaching & Bioenergy Therapy 2025',
    description: metaDesc,
    keywords: 'biotherapy, biotherapy treatment, advanced healing, alternative medicine, holistic therapy, biotherapy practitioner, natural healing, therapeutic treatment'
  });
}

export default async function BiotherapyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' }); // For GEOServicePage
  const mainT = await getTranslations({ locale }); // No namespace - get root level
  const biotherapyT = await getTranslations({ locale, namespace: 'biotherapyPage' });
  
  // Safe translation with fallback
  const getLabel = (key: string, fallback: string) => t(key, { default: fallback });

  // Load testimonials from translations (supports array or object-of-indices)
  const testimonialsRaw = biotherapyT.raw('testimonials', { default: [] as unknown }) as unknown;
  const testimonialsFromI18n: Array<{ text: string; author: string; location: string; rating?: number }>
    = Array.isArray(testimonialsRaw)
      ? (testimonialsRaw as Array<{ text: string; author: string; location: string; rating?: number }>)
      : (testimonialsRaw && typeof testimonialsRaw === 'object'
        ? Object.values(testimonialsRaw as Record<string, { text: string; author: string; location: string; rating?: number }>)
        : []);

  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale,
    service: 'biotherapy'
  };

  // Use hard-coded values since translation paths are problematic
  const bioTitle = locale === 'tr' ? 'Bioterapi Tedavisi' : 
                   locale === 'en' ? 'Biotherapy Treatment' :
                   locale === 'ru' ? 'Биотерапевтическое лечение' :
                   locale === 'az' ? 'Bioterapiya Müalicəsi' : 'Biotherapy Treatment';
  
  const bioDesc = locale === 'tr' ? 'Hücresel işlevi optimize eden, bağışıklık sistemini güçlendiren ve doğal şifa kapasitesini artıran son teknoloji bioterapi tedavisi.' :
                  locale === 'en' ? 'Advanced biotherapy treatment that optimizes cellular function, strengthens the immune system, and enhances natural healing capacity.' :
                  locale === 'ru' ? 'Передовое биотерапевтическое лечение, которое оптимизирует клеточную функцию, укрепляет иммунную систему и улучшает естественную способность к исцелению.' :
                  locale === 'az' ? 'Hüceyrə funksiyasını optimalaşdıran, immun sistemini gücləndrən və təbii şəfa qabiliyyətini artıran qabaqcıl bioterapiya müalicəsi.' :
                  'Advanced biotherapy treatment that optimizes cellular function, strengthens the immune system, and enhances natural healing capacity.';
  
  const customContent = {
    hero: {
      title: bioTitle,
      description: bioDesc
    },
    features: [
      {
        title: locale === 'tr' ? 'Hücresel Yenilenme' :
               locale === 'en' ? 'Cellular Regeneration' :
               locale === 'ru' ? 'Клеточная регенерация' :
               locale === 'az' ? 'Hüceyrə Yenilənməsi' : 'Cellular Regeneration',
        description: locale === 'tr' ? 'Hücre onarımı ve yenilenme süreçlerini uyarmak için gelişmiş teknikler' :
                     locale === 'en' ? 'Advanced techniques to stimulate cellular repair and regeneration processes' :
                     locale === 'ru' ? 'Передовые техники для стимуляции процессов клеточного восстановления и регенерации' :
                     locale === 'az' ? 'Hüceyrə bərpası və yenilənmə proseslərini stimullaşdırmaq üçün inkişaf etmiş texnikalar' :
                     'Advanced techniques to stimulate cellular repair and regeneration processes',
        icon: '🔬'
      },
      {
        title: locale === 'tr' ? 'Bağışıklık Sistemi Desteği' :
               locale === 'en' ? 'Immune System Support' :
               locale === 'ru' ? 'Поддержка иммунной системы' :
               locale === 'az' ? 'İmmun Sistemi Dəstəyi' : 'Immune System Support',
        description: locale === 'tr' ? 'Vücudunuzun doğal savunma mekanizmalarının güçlendirilmesi ve dengelenmesi' :
                     locale === 'en' ? 'Strengthening and balancing your body\'s natural defense mechanisms' :
                     locale === 'ru' ? 'Укрепление и балансировка естественных защитных механизмов вашего тела' :
                     locale === 'az' ? 'Bədəninizin təbii müdafiə mexanizmlərinin gücləndirilməsi və balanslaşdırılması' :
                     'Strengthening and balancing your body\'s natural defense mechanisms',
        icon: '🛡️'
      },
      {
        title: locale === 'tr' ? 'Detoksifikasyon' :
               locale === 'en' ? 'Detoxification' :
               locale === 'ru' ? 'Детоксикация' :
               locale === 'az' ? 'Detoksifikasiya' : 'Detoxification',
        description: locale === 'tr' ? 'Toksinleri elimine etmek ve canlılığı restore etmek için kapsamlı detoks protokolleri' :
                     locale === 'en' ? 'Comprehensive detox protocols to eliminate toxins and restore vitality' :
                     locale === 'ru' ? 'Комплексные протоколы детоксикации для устранения токсинов и восстановления жизненной силы' :
                     locale === 'az' ? 'Toksinləri aradan qaldırmaq və canlılığı bərpa etmək üçün hərtərəfli detoks protokolları' :
                     'Comprehensive detox protocols to eliminate toxins and restore vitality',
        icon: '🌿'
      },
      {
        title: locale === 'tr' ? 'Metabolik Optimizasyon' :
               locale === 'en' ? 'Metabolic Optimization' :
               locale === 'ru' ? 'Метаболическая оптимизация' :
               locale === 'az' ? 'Metabolik Optimallaşdırma' : 'Metabolic Optimization',
        description: locale === 'tr' ? 'Gelişmiş enerji ve sağlık için metabolik fonksiyonun artırılması' :
                     locale === 'en' ? 'Enhancement of metabolic function for improved energy and health' :
                     locale === 'ru' ? 'Улучшение метаболической функции для повышения энергии и здоровья' :
                     locale === 'az' ? 'Təkmiləşdirilmiş enerji və sağlamlıq üçün metabolik funksiyanın artırılması' :
                     'Enhancement of metabolic function for improved energy and health',
        icon: '⚡'
      }
    ],
    testimonials: (testimonialsFromI18n.length > 0
      ? testimonialsFromI18n.map(ti => ({
          text: ti.text,
          author: ti.author,
          location: ti.location,
          rating: ti.rating ?? 5,
        }))
      : [
          {
            text: 'The biotherapy treatment helped me recover from chronic illness when nothing else worked. The approach is truly revolutionary.',
            author: 'Elena S.',
            location: 'Istanbul Client',
            rating: 5,
          },
          {
            text: 'After months of biotherapy sessions, my energy levels and overall health have dramatically improved. Highly recommend this treatment.',
            author: 'Ayse A.',
            location: 'Ankara Client',
            rating: 5,
          },
        ])
  };

  const customSnippets = {
    quickAnswer: biotherapyT('snippets.quickAnswer'),
    process: biotherapyT('snippets.process'),
    duration: biotherapyT('snippets.duration')
  };

  return (
    <div className="min-h-screen px-2 ">
      {/* Main Service Page */}
      <GEOServicePage config={geoConfig} customContent={customContent} />
      
      {/* Benefits Tabs */}
      <BioterapyBenefit />
      
      {/* AI-Optimized Snippets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
   

        {/* Detailed Information Sections */}
        {/* <div className="grid lg:grid-cols-2 gap-12 mb-16"> */}
          {/* What is Biotherapy? */}
          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What is Biotherapy and How Does it Work?
            </h2>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4">
                Biotherapy is an advanced healing modality that combines cutting-edge scientific understanding with holistic treatment approaches. This innovative therapy works at the cellular level to optimize biological functions, enhance the body's natural healing capacity, and restore optimal health through personalized treatment protocols.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike conventional treatments that often focus on symptoms, biotherapy addresses the root causes of health imbalances by working with the body's innate healing mechanisms. Through advanced techniques and technologies, practitioners can identify and correct cellular dysfunction, optimize metabolic processes, and strengthen the immune system.
              </p>
              <h3 className="text-xl font-semibold mb-3">Key Principles:</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Cellular optimization and regeneration</li>
                <li>Immune system strengthening and balancing</li>
                <li>Comprehensive detoxification protocols</li>
                <li>Metabolic function enhancement</li>
                <li>Personalized treatment approaches</li>
              </ul>
            </div>
          </section> */}

          {/* Treatment Applications */}
          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Conditions Can Biotherapy Treatment Address?
            </h2>
            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4">
                Biotherapy treatment has shown remarkable effectiveness in addressing a wide range of health conditions and optimizing overall wellness. The comprehensive approach makes it suitable for both acute health issues and long-term wellness optimization.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Physical Health:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Chronic fatigue syndrome</li>
                    <li>• Autoimmune disorders</li>
                    <li>• Metabolic dysfunction</li>
                    <li>• Digestive disorders</li>
                    <li>• Hormonal imbalances</li>
                    <li>• Recovery from illness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Wellness Optimization:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Enhanced immune function</li>
                    <li>• Increased energy and vitality</li>
                    <li>• Improved mental clarity</li>
                    <li>• Better stress resilience</li>
                    <li>• Accelerated healing</li>
                    <li>• Anti-aging support</li>
                  </ul>
                </div>
              </div>
            </div>
          </section> */}
        {/* </div> */}

        {/* Treatment Methods */}
        {/* <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Advanced Biotherapy Treatment Methods
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🔬</div>
              <h3 className="text-lg font-semibold mb-3">Cellular Analysis</h3>
              <p className="text-gray-700 text-sm">
                Advanced assessment of cellular function and health using cutting-edge diagnostic techniques to identify areas requiring optimization and healing.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">⚕️</div>
              <h3 className="text-lg font-semibold mb-3">Therapeutic Protocols</h3>
              <p className="text-gray-700 text-sm">
                Customized treatment protocols designed to address specific health concerns and optimize biological function through targeted therapeutic interventions.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-lg font-semibold mb-3">Regenerative Support</h3>
              <p className="text-gray-700 text-sm">
                Advanced techniques to stimulate the body's natural regenerative processes and enhance healing at the cellular and tissue levels.
              </p>
            </div>
          </div>
        </section> */}

        {/* Treatment Process */}
        {/* <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Biotherapy Treatment Journey
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">1</div>
              <h3 className="font-semibold mb-2">Comprehensive Assessment</h3>
              <p className="text-sm text-gray-600">Detailed health evaluation and cellular function analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">2</div>
              <h3 className="font-semibold mb-2">Custom Protocol Design</h3>
              <p className="text-sm text-gray-600">Personalized treatment plan based on your specific needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">3</div>
              <h3 className="font-semibold mb-2">Treatment Sessions</h3>
              <p className="text-sm text-gray-600">Regular sessions using advanced biotherapy techniques</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto">4</div>
              <h3 className="font-semibold mb-2">Progress Monitoring</h3>
              <p className="text-sm text-gray-600">Ongoing assessment and protocol optimization</p>
            </div>
          </div>
        </section> */}

        {/* Dynamic FAQ */}
        <DynamicFAQ 
          config={geoConfig} 
          customFAQs={[
            {
              question: biotherapyT('faq.results.question'),
              answer: biotherapyT('faq.results.answer')
            },
            {
              question: biotherapyT('faq.safety.question'),
              answer: biotherapyT('faq.safety.answer')
            },
            {
              question: biotherapyT('faq.difference.question'),
              answer: biotherapyT('faq.difference.answer')
            },
            {
              question: biotherapyT('faq.combination.question'),
              answer: biotherapyT('faq.combination.answer')
            }
          ]}
          showSearch={true}
        />
      </div>
    </div>
  );
}