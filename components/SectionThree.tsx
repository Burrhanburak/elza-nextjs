'use client';

import React from 'react'
import { useTranslations } from 'next-intl';

const SectionThree = () => {
  const t = useTranslations('sectionThree');
  
  return (
    <section className='sm:py-22 py-20 container mx-auto px-4'>
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-6 py-4 lg:py-8'>
          <span data-slot='badge' className='inline-flex items-center justify-center rounded-md border py-0.5 whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-heart size-4' aria-hidden='true'>
              <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'></path>
            </svg>
            <span>{t('badge')}</span>
          </span>
          <h2 className='text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl'>{t('title')}</h2>
          <div className='flex flex-col gap-2'>
            <p className='text-muted-foreground'>{t('description')}</p>
            <p className='inline-flex items-center gap-1 text-primary'>
              <span className='underline'>{t('learnMore')}</span>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-arrow-right size-4' aria-hidden='true'>
                <path d='M5 12h14'></path>
                <path d='m12 5 7 7-7 7'></path>
              </svg>
            </p>
          </div>
        </div>
        <div className='mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3'>
          <div className='flex gap-2.5'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-user-pen mt-0.5 size-[18px] shrink-0' aria-hidden='true'>
              <path d='M11.5 15H7a4 4 0 0 0-4 4v2'></path>
              <path d='M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z'></path>
              <circle cx='10' cy='7' r='4'></circle>
            </svg>
            <div>
              <h3 className='text-lg leading-none tracking-[-0.96px] lg:text-2xl'>{t('services.bioenergy.title')}</h3>
              <p className='mt-2.5 text-sm tracking-[-0.36px] text-muted-foreground'>{t('services.bioenergy.description')}</p>
            </div>
          </div>
          <div className='flex gap-2.5'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-lightbulb mt-0.5 size-[18px] shrink-0' aria-hidden='true'>
              <path d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'></path>
              <path d='M9 18h6'></path>
              <path d='M10 22h4'></path>
            </svg>
            <div>
              <h3 className='text-lg leading-none tracking-[-0.96px] lg:text-2xl'>{t('services.biotherapy.title')}</h3>
              <p className='mt-2.5 text-sm tracking-[-0.36px] text-muted-foreground'>{t('services.biotherapy.description')}</p>
            </div>
          </div>
          <div className='flex gap-2.5'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-shield mt-0.5 size-[18px] shrink-0' aria-hidden='true'>
              <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'></path>
            </svg>
            <div>
              <h3 className='text-lg leading-none tracking-[-0.96px] lg:text-2xl'>{t('services.continuousHealing.title')}</h3>
              <p className='mt-2.5 text-sm tracking-[-0.36px] text-muted-foreground'>{t('services.continuousHealing.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionThree