import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag } from '@/components/ui/tag'
import { useTranslations, useLocale } from 'next-intl'

export const HeaderSectionTwo = () => {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <section className="relative min-h-screen flex items-end bg-transparent" id="hero-section">
  <div className="absolute inset-0 rounded-[12px] sm:rounded-[16px] overflow-hidden bg-transparent">

    <Image
      src="/elza-darya-logo.jpeg"
      alt="Background"
      width={1920}
      height={1080}
      sizes="100vw"
      priority
      className="w-full h-full object-cover"
    />
    {/* Blur + Gradient Overlay */}
   
  </div>

  {/* Shadow Overlay */}
  <div 
    className="absolute inset-0 z-[1]"
    style={{
      background: 'linear-gradient(179.98deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.4) 80%)'
    }}
  ></div>

    {/* Main Container */}
    <div className="relative z-[3] w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-16 pt-40">
      {/* Content Wrapper */}
      <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-[150px]">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-3">
        
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Elza Darya - Professional Life Coach & Bioenergy Therapist
          </h1>
          
          {/* Subtitle */}
          {t('hero.subtitle') && (
            <h2 className="text-lg md:text-xl text-gray-200 mt-4 font-medium">
            Professional life coaching and bioenergy therapy services for personal transformation and holistic wellness.
            </h2>
          )}

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-3">
            <Link href={`/${locale}/bioenergy`}>
            <Tag size="lg" variant="glass">
            Bioenergy Therapy
            </Tag>
            </Link>
           
            <Link href={`/${locale}/biotherapy`}>
            <Tag size="lg" variant="glass" className="">
            Biotherapy
            </Tag>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 flex-col gap-8 max-w-[352px] lg:max-w-[330px] xl:max-w-[352px]">
          {/* Description */}
          <div className="flex flex-col justify-start">
            <p 
              className="text-white text-base leading-relaxed"
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                wordWrap: 'break-word'
              }}
            >
              Elza Darya - Professional Life Coach & Bioenergy Therapist
            </p>
          </div>
          
          {/* CTA Button */}
          <Link
            href={`/${locale}/contact`}
            className="bg-white text-[rgb(28,39,6)] px-8 py-4 rounded-[60px] text-base font-medium hover:bg-gray-100 transition-colors text-center inline-block w-fit"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}