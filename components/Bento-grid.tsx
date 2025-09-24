"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {  AvatarGroupDemo } from './circle-testimonal';
import { CardStackDemo } from './card-stack';
import { useTranslations } from 'next-intl';

interface BentoGridProps {
  dict?: any;
}

const BentoGrid = ({ dict }: BentoGridProps) => {
  const t = useTranslations('servicesSection');
  const { scrollYProgress } = useScroll();
  
  // Transform values for zoom effect on Elara Voss portrait
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1.4, 1.8]);

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-center h-min px-[30px] max-[809px]:px-[14px]">
      <div className="flex flex-col items-center justify-center gap-[15px] max-[809px]:gap-3 h-min max-w-[1440px] overflow-hidden p-0 relative w-full">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-5 h-min justify-start overflow-visible p-0 relative w-full z-[1]">
          <div className="relative w-auto h-auto">
            <div className=" rounded-[3px] opacity-100">
              <div className="flex flex-col justify-start flex-shrink-0 p-2">
              <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-[#206d4e] opacity-100"></div>
              {t('badge')}
            </span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full">
            <div className="flex flex-col justify-start flex-shrink-0">
              <h2 className="text-center text-6xl font-bold">
                {t('title')}
              </h2>
            </div>
            
            <div className="flex flex-col justify-start flex-shrink-0 mt-4">
              <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('description')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Wrapper */}
        <div className="flex flex-row max-[809px]:flex-col items-center justify-center gap-[10px] h-min overflow-hidden p-0 relative w-full">
          
          {/* Left Column */}
          <div className="flex flex-col items-center justify-center gap-[10px] h-auto overflow-hidden p-0 relative flex-1 max-[809px]:flex-none max-[809px]:h-min max-[809px]:w-full">
            
            {/* Top Row */}
            <div className="flex flex-row max-[809px]:flex-col items-center justify-center gap-[10px] h-[300px] max-[809px]:h-min overflow-hidden p-0 relative w-full">
              
              {/* Rooted in Nature Card */}
              <div className="bg-[#ede9dd] rounded-[10px] flex flex-col items-center justify-end gap-[10px] h-full max-[809px]:h-[300px] overflow-hidden p-5 relative flex-1 max-[809px]:flex-none max-[809px]:w-full">
                {/* Title */}
                <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto z-[2]">
                  <h5 className="text-center text-[rgb(255,252,245)] text-lg font-semibold">{t('services.bioenergy.title')}</h5>
                </div>
                
                {/* Icon */}
                <div className="absolute top-5 left-5 flex items-center justify-center gap-0 h-min overflow-hidden p-0 w-min z-[2]">
                  <div className="w-6 h-6 text-[rgb(255,252,245)]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                    </svg>
                  </div>
                </div>

                {/* Mockup Image */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[189px] h-[270px] overflow-visible z-[2]">
                  <div className="absolute inset-0 rounded-inherit">
                    <img 
                      src="/phone.png" 
                      alt="Mockup"
                      className="block w-full h-full object-cover object-center rounded-inherit"
                    />
                  </div>
                </div>

                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full block object-cover bg-[#d8e3cf] rounded-none cursor-auto"
                    style={{ objectPosition: '50% 50%' }}
                  >
                    <source src="/elza-yoga.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Truly Personal Card handle on the left */}
              <div className="bg-[#285646] rounded-[10px] flex flex-col items-start justify-start gap-[10px] h-full max-[809px]:h-[300px] overflow-hidden p-5 relative flex-1 max-[809px]:flex-none max-[809px]:w-full">
                <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto">
                  <h5 className="text-lg font-semibold text-white">{t('services.biotherapy.title')}</h5>
                </div>
                
                <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto max-w-[230px]">
                  <p className="text-sm text-white">{t('services.biotherapy.description')}</p>
                </div>

                {/* Left Hand Image */}
                <div className="absolute bottom-0 -left-[30px] w-[200px] h-[117px] overflow-visible z-[1]">
                  <div className="absolute inset-0 rounded-inherit">
                    <img 
                      src="/lef-hand.png" 
                      alt="Left Hand"
                      className="block w-full h-full object-cover object-center rounded-inherit"
                    />
                  </div>
                </div>

                {/* Right Hand Image */}
                <div className="absolute bottom-[30px] right-0 w-[150px] h-[83px] overflow-visible z-[1]">
                  <div className="absolute inset-0 rounded-inherit">
                    <img 
                      src="/right-hand.png" 
                      alt="Right Hand"
                      className="block w-full h-full object-cover object-center rounded-inherit"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Your Healing Timeline Card */}
            <div className="rounded-[10px] flex flex-col items-start justify-start gap-[10px] h-[309px] max-[809px]:h-[300px] overflow-hidden p-5 relative w-full">
              <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto">
                <h5 className="text-lg font-semibold text-gray-800">{t('services.continuousHealing.title')}</h5>
              </div>
              
              <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto max-w-[300px]">
                <p className="text-sm text-gray-700">{t('services.continuousHealing.description')}</p>
              </div>

              {/* Rotating Circle Container */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-[100px] max-[809px]:top-[120px] w-full h-[350px] max-w-[350px] pointer-events-none z-[1] aspect-square">
                <motion.div 
                  className="flex items-center justify-center flex-row flex-nowrap gap-0 h-[350px] w-[350px] overflow-visible p-0 relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ height: '100%', maxWidth: '100%', width: '100%', opacity: 1, willChange: 'transform', transform: 'perspective(1200px)' }}
                >
                  <div className="relative w-full h-full">
                    {/* Image 1 - 0° (Top) */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateY(-80px)' }}>
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img 
                          src="/customer/custo-6.png" 
                          alt="customer"
                          className="block w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Image 2 - 60° (Top Right) */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateX(70px) translateY(-40px)' }}>
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img 
                          src="/customer/custo-5.png" 
                          alt="customer"
                          className="block w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Image 3 - 120° (Bottom Right) */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateX(70px) translateY(40px)' }}>
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img 
                            src="/customer/custo-4.png" 
                            alt="customer"
                          className="block w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Image 4 - 180° (Bottom) */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateY(80px)' }}>
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img 
                          src="/customer/custo-2.png" 
                          alt="customer"
                          className="block w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Image 5 - 240° (Bottom Left) */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateX(-70px) translateY(40px)' }}>
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img 
                          src="/customer/custo-3.png" 
                          alt="customer"
                          className="block w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>

                    {/* Image 6 - 300° (Top Left) */}
                    <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) translateX(-70px) translateY(-40px)' }}>
                      <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img 
                          src="/customer/custo-1.png" 
                          alt="Portrait 6"
                          className="block w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Overlay Gradient */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden z-[1] flex-none" style={{
                background: 'linear-gradient(180deg, rgba(84, 84, 84, 0) 0%, var(--token-a8c246f0-e965-42b6-a8e0-f47aac8381f9, rgb(237, 233, 221)) 100%)'
              }}></div>

              {/* Plus Icon */}
              <div className="absolute bottom-5 right-5 w-6 h-6 text-[rgb(37,67,54)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-row max-[809px]:flex-col items-center justify-center gap-[10px] h-min overflow-hidden p-0 relative flex-1 max-[809px]:flex-none max-[809px]:w-full">
            
            {/* Personalized Care Card */}
            <div className="bg-[#206d4e] rounded-[10px] flex flex-col items-start justify-end gap-0 h-[610px] max-[809px]:h-[600px] overflow-hidden p-5 relative w-full">
              <div className="absolute top-5 left-0 right-0 flex justify-center z-[3]">
                <div className="bg-black/50 rounded-lg flex items-center justify-center overflow-hidden p-2 backdrop-blur-sm max-w-[280px]">
                  <p className="text-white text-center text-sm">{t('personalizedCare.description')}</p>
                </div>
              </div>
              
              <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto max-w-[300px] z-[2]">
                <h5 className="text-lg font-semibold text-[rgb(255,252,245)]">{t('personalizedCare.title')}</h5>
              </div>

              {/* Main Portrait Image */}
              <motion.div 
                className="w-full h-full absolute inset-0 rounded-lg overflow-hidden"
            
              >
                <img 
                  src="/elza-screen.png" 
                  alt="Elara Voss Portrait"
                  className="block w-full h-full object-cover object-center rounded-inherit"
                />
            
              </motion.div>

              {/* Plus Icon */}
              <div className="absolute top-5 right-5 w-6 h-6 text-[rgb(255,252,245)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Testimonials and Client Satisfaction */}
        <div className="flex flex-row max-[809px]:flex-col items-center justify-center gap-[10px] max-[809px]:gap-[10px] h-min overflow-hidden p-0 relative w-full">
          
          {/* Testimonials Card */}
          <div className="bg-[#d8e3cf] rounded-[10px] flex flex-col items-center justify-center gap-0 h-[300px] overflow-hidden p-5 relative flex-1 max-[809px]:w-full">
            <div className="relative w-full h-auto z-[1]">
              <div className="flex flex-col items-center justify-center gap-0 h-min w-full relative">
                
            <CardStackDemo dict={dict}/>
              </div>
            </div>
          </div>

          {/* Client Satisfaction Card */}
          <div className="bg-[#d8e3cf]  rounded-[10px] flex flex-col items-end justify-start gap-[10px] h-[300px] overflow-hidden p-5 relative flex-1 max-[809px]:w-full">
            
            {/* Client Images */}
            <div className="absolute bottom-5 left-5 flex items-center justify-start h-min overflow-visible w-auto z-[1]">
              <AvatarGroupDemo/>
            </div>

            {/* 98% Text */}
            <div className="relative w-auto h-auto">
              <p className="m-0 opacity-0 pointer-events-none top-20 left-5 select-none text-center font-['Inter_Display'] text-6xl font-semibold tracking-[-0.1em] leading-[0.8em]">98%</p>
              <p className="absolute inset-0 select-none m-0 text-[rgb(37,67,54)] no-underline text-center font-['Inter_Display'] text-6xl font-semibold tracking-[-0.1em] leading-[0.8em]">98%</p>
            </div>

            <div className="flex flex-col justify-start flex-shrink-0 relative w-full h-auto">
              <p className="text-right text-sm text-gray-700">{t('successRate')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;