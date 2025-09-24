/**
 * Life Coaching Service Page - GEO Optimized
 * URL: /services/life-coaching
 * Target: "Best life coach", "professional life coaching", "life coaching services"
 */

import { Metadata } from 'next';
import { generateGEOMetadata } from '@/components/GEOHead';
import { GEOPageConfig } from '@/lib/geo-content';
import GEOServicePage from '@/components/GEOServicePage';
import GEOSnippets from '@/components/GEOSnippets';
import DynamicFAQ from '@/components/DynamicFAQ';
import LifeCoachingBenefit from '@/components/LifeCoachingBenefit';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  
  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale,
    service: 'life-coaching'
  };

  return generateGEOMetadata(geoConfig, {
    title: t('mainServices.lifeCoaching.title') + ' | Life Coaching & Bioenergy Therapy 2025',
    description: t('mainServices.lifeCoaching.description'),
    keywords: 'life coaching, life coach, personal development, goal setting, life transformation, professional coaching, personal coach, career coaching, mindset coaching'
  });
}

export default async function LifeCoachingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  
  const geoConfig: GEOPageConfig = {
    pageType: 'service',
    locale,
    service: 'life-coaching'
  };

  const customContent = {
    hero: {
      title: t('mainServices.lifeCoaching.title'),
      description: t('mainServices.lifeCoaching.description')
    },
    features: [
      {
        title: t('mainServices.lifeCoaching.features.goalSetting.title'),
        description: t('mainServices.lifeCoaching.features.goalSetting.description'),
        icon: '🎯'
      },
      {
        title: t('mainServices.lifeCoaching.features.personalDevelopment.title'),
        description: t('mainServices.lifeCoaching.features.personalDevelopment.description'),
        icon: '📈'
      },
      {
        title: t('mainServices.lifeCoaching.features.mindsetTransformation.title'),
        description: t('mainServices.lifeCoaching.features.mindsetTransformation.description'),
        icon: '🧠'
      },
      {
        title: t('mainServices.lifeCoaching.features.lifeBalance.title'),
        description: t('mainServices.lifeCoaching.features.lifeBalance.description'),
        icon: '⚖️'
      }
    ],
    testimonials: [
      {
        text: 'Working with this life coach transformed my career and personal life. I achieved goals I never thought possible and found true fulfillment.',
        author: 'Sarah T.',
        rating: 5,
        location: 'Istanbul Client'
      },
      {
        text: 'The life coaching sessions gave me clarity, confidence, and a clear roadmap to success. Best investment I\'ve ever made in myself.',
        author: 'David M.',
        rating: 5,
        location: 'Ankara Client'
      }
    ]
  };

  const customSnippets = {
    quickAnswer: 'Life coaching is a professional service that helps individuals clarify their goals, overcome obstacles, and create actionable plans to achieve personal and professional success through personalized guidance and proven strategies.',
    process: 'Life coaching begins with goal clarification and vision setting, followed by identifying obstacles, creating action plans, implementing strategies, and ongoing accountability to ensure success.',
    duration: 'Life coaching sessions typically last 60-90 minutes, with most clients achieving significant breakthroughs within 6-12 sessions over 3-6 months.'
  };

  return (
    <div className="min-h-screen py-20 ">
      {/* Main Service Page */}
      <GEOServicePage config={geoConfig} customContent={customContent} />
      
      {/* AI-Optimized Snippets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
     

  

      </div>
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-16">
      <LifeCoachingBenefit/>
      </div>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <DynamicFAQ 
      config={geoConfig} 
      customFAQs={[
        {
          question: t('lifeCoachingPage.faq.sessions.question'),
          answer: t('lifeCoachingPage.faq.sessions.answer')
        },
        {
          question: t('lifeCoachingPage.faq.goals.question'),
          answer: t('lifeCoachingPage.faq.goals.answer')
        },
        {
          question: t('lifeCoachingPage.faq.difference.question'),
          answer: t('lifeCoachingPage.faq.difference.answer')
        },
        {
          question: t('lifeCoachingPage.faq.results.question'),
          answer: t('lifeCoachingPage.faq.results.answer')
        }
      ]}
      showSearch={true}
    />
   </div>
    </div>
  );
}
