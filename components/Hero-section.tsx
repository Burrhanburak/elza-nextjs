import Image from 'next/image';
import React from 'react'
import { useTranslations } from 'next-intl';
import DynamicH1 from './DynamicH1';
import DynamicSubtitle from './DynamicSubtitle';
import Link from 'next/link';

interface HeroSectionProps {
  locale?: string;
}

const HeroSection = ({ locale = 'en' }: HeroSectionProps) => {
  const t = useTranslations('hero');
  return (
    <section 
    className="w-full  flex items-start justify-center relative overflow-visible pt-16  px-4 sm:pt-20  sm:px-6 lg:items-center lg:px-[30px] "
    // style={{ 
    //   background: 'linear-gradient(190deg, var(--token-0ee9c6f7-b8b9-4ba6-b343-9c3d3fc7c423, rgba(250, 145, 75, .12)) 0%, rgba(255, 255, 255, 0) 55.00000000000001%, rgba(255, 255, 255, 0) 100%)'
    // }}
    id="about-section"
  >
    <div 
      className=" rounded-[16px] sm:rounded-[20px] lg:rounded-[30px] flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-[40px] w-full max-w-7xl min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-5rem)] lg:h-[920px] overflow-hidden p-4 sm:p-6 lg:p-[70px] relative will-change-transform "
      style={{
        alignContent: 'flex-start',
        flexWrap: 'nowrap'
      }}
    >
      {/* Left Side - Content */}
      <div className=" lg:max-w-[380px] w-full flex flex-col justify-center lg:justify-between items-start gap-6 sm:gap-8 lg:gap-0 min-h-full">
        
        {/* Mobile: Stacked Content */}
        <div className="flex flex-col items-start gap-6 w-full lg:hidden">
          {/* Dynamic H1 Title */}
          <DynamicH1
            service="wellness"
            pageType="home"
            locale={locale}
            fallbackCity="Istanbul"
            className="text-3xl sm:text-4xl font-bold text-[rgb(38,14,1)] leading-tight"
            staticH1={t('title')}
          />

          {/* Professional Subtitle */}
          <p className="text-base sm:text-lg font-medium text-[rgb(38,14,1)]">
            {t('subtitle')}
          </p>

          {/* Wellness Message */}
          <p className="text-sm sm:text-base text-[rgb(38,14,1)] opacity-80 font-medium">
            {t('wellness')}
          </p>
          
          {/* Wellness Description */}
          <p className="text-xs sm:text-sm text-[rgb(38,14,1)] opacity-70 leading-relaxed">
            {t('wellnessDescription')}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-[rgb(250,230,190)] rounded-[20px] px-3 py-1.5 shadow-xl">
              <span className="text-[rgb(38,14,1)] font-medium text-xs">{t('tags.clarity')}</span>
            </div>
            <div className="bg-[rgb(255,232,248)] rounded-[20px] px-3 py-1.5 shadow-xl">
              <span className="text-[rgb(38,14,1)] font-medium text-xs">{t('tags.stress')}</span>
            </div>
            <div className="bg-[rgb(215,229,255)] rounded-[20px] px-3 py-1.5 shadow-xl">
              <span className="text-[rgb(38,14,1)] font-medium text-xs">{t('tags.awareness')}</span>
            </div>
          </div>

          {/* Mobile CTA Button */}
          <Link 
            href="/contact"
            className="bg-[#206d4e] shadow-xl rounded-[80px] p-1 inline-flex items-center gap-4 hover:bg-[#206d4e] transition-colors duration-300"
          >
            <div className="bg-white rounded-full p-4 flex items-center justify-center w-12 h-11">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 256 256" 
                className="w-6 h-6 fill-[#206d4e]"
              >
                <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"/>
              </svg>
            </div>
            <span className="text-white font-medium pr-6">Ücretsiz Danışmanlık</span>
          </Link>
        </div>

        {/* Desktop: Original Layout */}
        <div className="hidden lg:flex flex-col justify-between items-start w-full h-full">
          {/* Top Section */}
          <div className="flex flex-col items-start gap-8 w-full">
            {/* Dynamic H1 Title - Desktop */}
            <div className="w-full">
              <DynamicH1
                service="wellness"
                pageType="home"
                locale={locale}
                fallbackCity="Istanbul"
                className="text-6xl font-bold text-[rgb(38,14,1)] leading-tight"
                staticH1={t('title')}
              />
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/contact"
                className="bg-[#206d4e]  shadow-xl rounded-[80px] p-1 inline-flex items-center gap-4 hover:bg-[#206d4e] transition-colors duration-300 mb-2"
              >
                <div className="bg-white rounded-full p-4 flex items-center justify-center w-12 h-13">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 256 256" 
                    className="w-6 h-6 fill-[#206d4e]"
                  >
                    <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"/>
                  </svg>
                </div>
                <span className="text-white font-medium pr-6">Danışma Başvurusu</span>
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-start gap-6 w-full">
            {/* Professional Subtitle - Desktop */}
            <p className="text-xl font-medium text-[rgb(38,14,1)]">
              {t('subtitle')}
            </p>

            {/* Wellness Message - Desktop */}
            <p className="text-lg text-[rgb(38,14,1)] opacity-80 font-medium">
              {t('wellness')}
            </p>
            
            {/* Wellness Description - Desktop */}
            <p className="text-base text-[rgb(38,14,1)] opacity-70 leading-relaxed max-w-lg">
              {t('wellnessDescription')}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-[rgb(250,230,190)] rounded-[24px] px-4 py-2 shadow-xl">
                <span className="text-[rgb(38,14,1)] font-medium text-sm">{t('tags.clarity')}</span>
              </div>
              <div className="bg-[rgb(255,232,248)] rounded-[24px] px-4 py-2 shadow-xl">
                <span className="text-[rgb(38,14,1)] font-medium text-sm">{t('tags.stress')}</span>
              </div>
              <div className="bg-[rgb(215,229,255)] rounded-[24px] px-4 py-2 shadow-xl">
                <span className="text-[rgb(38,14,1)] font-medium text-sm">{t('tags.awareness')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

            {/* Right Side - Image */}
      <div className="flex-[1.2] lg:max-w-[600px] w-full flex-shrink-0 min-h-[500px] sm:min-h-[250px] lg:min-h-[600px] bg-gray-200 rounded-[12px] sm:rounded-[16px] relative overflow-hidden">
        <Image 
          src="/elza-darya-logo.jpeg" 
          alt="Hero Image" 
          fill 
          className='object-cover rounded-[12px] sm:rounded-[16px] shadow-xl' 
        />
      </div>

    
    </div>
  </section>
);
}

export default HeroSection;