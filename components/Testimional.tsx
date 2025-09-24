'use client';

import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Testimonial() {
  const t = useTranslations('testimonials');
  // Get testimonials data from translations
  const mainTestimonial = {
    quote: t('mainTestimonial.quote'),
    author: t('mainTestimonial.author'),
    role: t('mainTestimonial.role'),
    videoThumbnail: '/customer/custo-1.png',
  };

  const testimonials = [
    {
      id: 1,
      quote: t('testimonialsList.0.quote'),
      author: t('testimonialsList.0.author'),
      role: t('testimonialsList.0.role'),
      avatar: '/customer/custo-2.png',
      rating: 5,
    },
    {
      id: 2,
      quote: t('testimonialsList.1.quote'),
      author: t('testimonialsList.1.author'),
      role: t('testimonialsList.1.role'),
      avatar: '/customer/custo-3.png',
      rating: 5,
    },
    {
      id: 3,
      quote: t('testimonialsList.2.quote'),
      author: t('testimonialsList.2.author'),
      role: t('testimonialsList.2.role'),
      avatar: '/customer/custo-4.png',
      rating: 5,
    },
    {
      id: 4,
      quote: t('testimonialsList.3.quote'),
      author: t('testimonialsList.3.author'),
      role: t('testimonialsList.3.role'),
      avatar: '/customer/custo-5.png',
      rating: 5,
    },
  ];

  const cardWidth = 320;
  const gap = 24;
  const totalWidth = testimonials.length * (cardWidth + gap);

  return (
    <div className="max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 flex justify-center">
      <div className=" dark:bg-neutral-900  p-4 sm:p-6 md:p-10 lg:p-16  max-w-6xl w-full">
        <div className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12 text-center">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
              {t('pageTitle')}
            </h1>
          </div>
          <div>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              {t('pageDescription')}
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-4 sm:gap-6">
          <div className="grid md:grid-cols-2 dark:bg-neutral-800  rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-16">
            <div className="flex flex-col relative group cursor-pointer">
              <Image
                alt="Video Thumbnail"
                className="w-full  rounded-lg cursor-pointer object-cover border border-neutral-200"
                height={200}
                width={200}
                src={mainTestimonial.videoThumbnail}
              />

              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                <div className="bg-black/80 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1.5 sm:py-2 flex items-center space-x-1.5 sm:space-x-2 text-white">
                  {/* <Play className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                  <span className="font-medium text-xs sm:text-sm">Watch Video</span> */}
                </div>
              </div>
            </div>

            <div className="space-y-5 flex flex-col">
              <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{t('pageTitle')}</span>
              </div>
              <div>
                <blockquote className="font-medium text-base  bg-green-100 dark:bg-green-900/20 sm:text-lg text-neutral-900 dark:text-neutral-100">
                  “{mainTestimonial.quote}”
                </blockquote>
                <div className="space-y-1">
                  <p className="font-semibold text-neutral-900  dark:text-neutral-100 text-sm sm:text-base">
                    {mainTestimonial.author}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {mainTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden mt-8 sm:mt-10">
          <motion.div
            className="flex space-x-4 sm:space-x-6"
            animate={{ x: [-totalWidth, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="flex-shrink-0 w-64 shadow-none sm:w-72 md:w-80 dark:bg-neutral-800 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4 min-h-[180px] sm:min-h-[200px] bg-transparent">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-green-500 text-green-500"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed min-h-12 sm:min-h-16">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Image
                      width={20}
                      height={20}
                      loading="lazy"
                      src={testimonial.avatar || '/placeholder.svg'}
                      alt={testimonial.author}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover  dark:border-neutral-600"
                    />
                    <div>
                      <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
