'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Logo } from '@/components/logo';
import { ArrowUpRight, Instagram, Twitter, Linkedin, Eye, Facebook } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params?.locale as string || 'en';

  return (
    <footer className="relative w-full overflow-hidden">
      {/* Main Container */}
      <div className="relative w-full  rounded-t-[30px] overflow-hidden">
        
        {/* Content Container */}
        <div className="relative z-[4] flex flex-col items-start justify-between max-w-[1440px] mx-auto px-[50px] pt-[80px] pb-[50px] gap-[90px] lg:gap-[116px]">
          
          {/* Main Content Section */}
          <div className="w-full flex flex-col items-center justify-start gap-[44px] max-w-[810px] mx-auto">
            
            {/* Hero Text Section */}
            <div className="flex flex-col items-center justify-start gap-6 w-full">
              
              {/* Main Heading */}
              <div className="text-center">
                <h2 className="text-[32px] md:text-[56px] leading-[100%] tracking-[-0.05em] font-bold text-white">
                  <span 
                    className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent"
                    style={{backgroundImage: 'radial-gradient(50% 306.999% at 50% 57.0833%, rgb(0, 98, 65, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%)'}}
                  >
                    {t('ctaTitle').split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < t('ctaTitle').split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
              
              {/* Subtitle */}
              <div className="text-center text-[#006241]/80 text-sm leading-[129%] max-w-md">
                <p>{t('ctaSubtitle')}</p>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="relative group flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-white/20 rounded-full text-[#006241]/80 text-sm leading-[129%] hover:bg-white/5 transition-all duration-300"
                >
                  <span>{t('ctaButton')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                  <div className="absolute inset-0 bg-[#006241] rounded-[60px] blur-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>
                
                <Link
                  href={`/${locale}/services`}
                  className="flex items-center gap-3 px-6 py-3 bg-white border border-[#006241]/80 rounded-full text-[#006241]/80 text-sm leading-[129%] hover:bg-white/90 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('ctaSecondary')}</span>
                </Link>
              </div>
            </div>
            
            {/* Links Container */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-[60px] min-h-min overflow-visible p-0 relative min-w-min">
              
              {/* Quick Links */}
              <div className="flex flex-col items-start  gap-[22px] min-h-min overflow-visible p-0 relative min-w-min">
                <h3 className="text-[#006241]/80 text-sm leading-[129%] uppercase tracking-wider font-medium">
                  {t('quickLinks')}
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: t('links.home'), href: `/${locale}` },
                    { label: t('links.services'), href: `/${locale}/services` },
                    { label: t('links.about'), href: `/${locale}/about` },
                    { label: t('links.contact'), href: `/${locale}/contact` }
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center justify-between text-[#006241]/60 hover:text-[#006241]/80 text-sm leading-[129%] transition-colors duration-300 max-w-[200px]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Services */}
              <div className="flex flex-col items-start  gap-[22px] min-h-min overflow-visible p-0 relative min-w-min">
                <h3 className="text-[#006241]/80 text-sm leading-[129%] uppercase tracking-wider font-medium">
                  {t('ourServices')}
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: t('links.bioenergy'), href: `/${locale}/services/bioenergy` },
                    { label: t('links.biotherapy'), href: `/${locale}/services/biotherapy` },
                    { label: t('links.blog'), href: `/${locale}/blog` },
                    { label: t('links.books'), href: `/${locale}/books` },
                    { label: t('links.poems'), href: `/${locale}/poems` },
                
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center justify-between text-[#006241]/60 hover:text-[#006241]/80 text-sm leading-[129%] transition-colors duration-300 max-w-[200px]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* About Section */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-start justify-center gap-[22px] min-h-min overflow-visible p-0 relative w-full md:w-[225px]">
                <h3 className="text-[#006241]/80 text-sm leading-[129%] uppercase tracking-wider font-medium">
                  {t('links.about')}
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: t('links.biography'), href: `/${locale}/about/biography` },
                    { label: t('links.certificates'), href: `/${locale}/about/certificates-and-diploma` },
                   
                    { label: t('links.awards'), href: `/${locale}/about/awards-achievements` },
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center justify-between text-[#006241]/60 hover:text-[#006241]/80 text-sm leading-[129%] transition-colors duration-300 max-w-[200px]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-[#006241]/60 text-sm leading-[129%] max-w-[225px]">
                  <p>{t('address')}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[#006241]/60 text-sm leading-[129%]">
                    <span className="text-[#006241]/60">{t('contact.email')}:</span> {t('email')}
                  </div>
                  <div className="text-[#006241]/60 text-sm leading-[129%]">
                    <span className="text-[#006241]/60">{t('contact.phone')}:</span> {t('phone')}
                  </div>
                </div>
              </div>
              {/* Contact Us - spans 2 columns on mobile, 1 column on desktop */}
              
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="w-full flex flex-col gap-6">
            {/* Legal Text */}
            <div className="text-[#006241]/80 text-sm leading-[129%] text-left max-w-2xl">
              {/* <p className="break-words">{t('legal')}</p> */}
            </div>
            
            {/* Copyright and Legal Links */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                <div className="text-[#006241]/80 text-sm leading-[129%]">
                  {t('copyright')}
                </div>
                
                {/* Legal Links */}
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className="text-[#006241]/60 hover:text-[#006241]/80 transition-colors duration-300"
                  >
                    {t('privacy')}
                  </Link>
                  <span className="text-[#006241]/40">|</span>
                  <Link
                    href={`/${locale}/terms-of-service`}
                    className="text-[#006241]/60 hover:text-[#006241]/80 transition-colors duration-300"
                  >
                    {t('terms')}
                  </Link>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { 
                    href: t('social.instagram.url'), 
                    icon: Instagram,
                    alt: "Instagram"
                  },
                  { 
                      href: t('social.facebook.url'), 
                    icon: Facebook,
                    alt: "facebook"
                  },
                
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity duration-300 text-[#006241]/80"
                    >
                      <IconComponent className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        
        {/* Logo Background */}
        <div className="absolute bottom-[-9px] left-1/2 transform -translate-x-1/2 w-[600px] sm:w-[500px] md:w-[800px] lg:w-[1200px] xl:w-[1400px] h-[80px] sm:h-[66px] md:h-[106px] lg:h-[159px] xl:h-[186px] opacity-40 pointer-events-none z-0">
          <Image
            src="/green-elza.svg"
            alt="Background logo"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 600px, (max-width: 768px) 500px, (max-width: 1024px) 800px, (max-width: 1280px) 1200px, 1400px"
          />
        </div>
        
        {/* Top Logo */}
        <div className="absolute top-[-180px] left-[70px] w-[226px] h-auto z-[1]">
          <Logo className="text-white"  />
        </div>
        
        {/* Layered Blur Effect */}
        <div className="absolute bottom-[180px] left-0 right-0 h-[136px] z-[2]">
          
          <div style={{position: 'absolute', inset: '0px', overflow: 'hidden'}}>
            <div 
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgba(0, 0, 0, 0) 37.5%)',
                backdropFilter: 'blur(0.3125px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[2] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 12.5%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 50%)',
                backdropFilter: 'blur(0.625px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[3] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 25%, rgb(0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 62.5%)',
                backdropFilter: 'blur(1.25px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[4] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 37.5%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 75%)',
                backdropFilter: 'blur(2.5px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[5] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgb(0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 87.5%)',
                backdropFilter: 'blur(5px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[6] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 62.5%, rgb(0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
                backdropFilter: 'blur(10px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[7] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 75%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)',
                backdropFilter: 'blur(20px)',
                opacity: 1
              }}
            />
            <div 
              className="absolute inset-0 z-[8] pointer-events-none"
              style={{
                maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)',
                backdropFilter: 'blur(40px)',
                opacity: 1
              }}
            />
          </div>
      
        </div>
        
        {/* Dots Background */}
        {/* <div className="absolute top-0 left-0 right-0 h-[490px] overflow-hidden pointer-events-none z-0">
          <Image
            src="/color-logo.svg"
            alt="Background elaza darya"
            fill
            className="object-cover"
          />
        </div> */}
      </div>
    </footer>
  );
}
