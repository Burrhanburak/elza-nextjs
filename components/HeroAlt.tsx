'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { Play, Pause, UserRoundSearch } from 'lucide-react';

interface HeroAltProps {
  locale?: string;
}

const HeroAlt = ({ locale = 'en' }: HeroAltProps) => {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Sesi aç ve videoyu oynat
        videoRef.current.muted = false
        setIsMuted(false)
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  return (
    <section 
      className=" flex flex-row flex-nowrap items-center justify-center gap-0 min-h-fit overflow-visible relative w-full px-[60px]  max-[809px]:px-5  max-[809px]:pb-[50px]" 
      id="about-section"
    >
      <main className="flex flex-col items-center justify-start gap-[50px] min-h-fit max-w-[1160px] overflow-visible relative flex-1 w-px p-0 max-[809px]:gap-[30px]">
        {/* Content Wrapper */}
        <div className="flex flex-col items-center justify-start gap-10 min-h-fit overflow-visible relative w-full p-0">
          {/* Header Text */}
          <div className="flex flex-col justify-start flex-shrink-0 relative w-auto h-auto whitespace-pre">
            <p className="text-[rgb(119,45,8)] text-center text-lg ">
              {t('wellness')}
            </p>
          </div>

          {/* Main Title with Icons */}
          <div className="w-full text-center">
            <h1 className="text-2xl sm:text-3xl tracking-tight md:text-5xl lg:text-6xl">
              {locale === 'tr' ? (
                <>
                  <span className="inline-block align-middle mx-0">
                    <img
                      decoding="async"
                      width={48}
                      height={48}
                      src="/terapi.svg"
                      alt=""
                      className="inline-block align-middle w-12 h-12 object-cover"
                    />
                  </span>
                  {t('heroAlt.mainText')}{' '}
                {' '}
                 
                  <span className="inline-block align-middle mx-0">
                    <img
                      decoding="async"
                      width={48}
                      height={48}
                      src="/bio.svg"
                      alt=""
                      className="inline-block align-middle w-12 h-12 object-cover"
                    />
                  </span>
                </>
              ) : (
                <>
                  {t('heroAlt.mainText')}{' '}
                  <span className="inline-block align-middle mx-0">
                    <img
                      decoding="async"
                      width={48}
                      height={48}
                      src="https://framerusercontent.com/images/NNI85O7TEaVIMztLKBsSeCmnQUQ.svg"
                      alt=""
                      className="inline-block align-middle w-12 h-12 object-cover"
                    />
                  </span>
                </>
              )}
            </h1>
          </div>
        </div>

        {/* Client Journeys Section */}
        <section className=" py-12 font-sans md:py-20 w-full mx-auto container items-center justify-center">
          <div className="container mx-auto ">
            <div className="flex flex-col justify-center gap-8 lg:flex-row lg:items-center">
              <div className="flex flex-1 flex-col gap-7">
                <div className="flex w-fit items-center gap-2 rounded-md py-2 ">
                <span data-slot='badge' className='inline-flex items-center justify-center rounded-md border py-0.5 whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm'>
                <UserRoundSearch className='size-4' />
            <span>Hakkımda</span>
          </span>
                </div>
                <h1 className="text-2xl sm:text-3xl tracking-tight md:text-5xl lg:text-6xl">{t('heroAlt.clientJourneys.title')}</h1>
                <p className=" mt-4 max-w-2xl text-1xl text-muted-foreground md:text-3xl">
                  {t('heroAlt.clientJourneys.description')}
                </p>
              </div>
              <div className="flex-1">
                <div className="relative w-full overflow-hidden rounded-3xl">
                  <div style={{position: 'relative', width: '100%', paddingBottom: '100%'}} data-radix-aspect-ratio-wrapper="">
                    <div data-slot="aspect-ratio" style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
                      <div className="size-full h-full">
                        <video 
                          ref={videoRef}
                          src="/elza-video.mp4" 
                          loop 
                          muted={isMuted}
                          autoPlay
                          preload="auto"
                          className="size-full object-cover object-center"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                        <button 
                          onClick={togglePlay}
                          className="justify-center whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs bg-background hover:bg-background absolute bottom-0 left-0 m-10 max-[809px]:m-2 flex size-fit w-fit items-center gap-4 max-[809px]:gap-1 rounded-full py-3 pl-3 pr-8 max-[809px]:py-1 max-[809px]:pl-1  transition-transform hover:scale-105"
                        >
                          <div className="bg-primary flex h-20 w-20 max-[809px]:h-8 max-[809px]:w-8 rounded-full items-center justify-center">
                            {isPlaying ? (
                              <Pause className="size-7 max-[809px]:size-3 fill-white stroke-white" />
                            ) : (
                              <Play className="size-7 max-[809px]:size-3 fill-white stroke-white" />
                            )}
                          </div>
                          <div>
                            <div className="text-foreground text-left text-base max-[809px]:text-xs">
                              {isPlaying ? t('heroAlt.discover.pause') : t('heroAlt.discover.play')}
                            </div>
                            <div className="text-muted-foreground text-left text-base max-[809px]:text-xs">{t('heroAlt.discover.now')}</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="sm:py-2 py-5 container mx-auto max-w-5xl px-4">
      <section className="relative container max-w-5xl py-10 md:py-12 lg:py-15">
        <div>
          <h1 className="text-2xl sm:text-3xl tracking-tight md:text-5xl lg:text-6xl">
            {t('heroAlt.transformations.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-2xl text-muted-foreground md:text-3xl">
            {t('heroAlt.transformations.description')}
          </p>
        </div>
        <div className="absolute inset-0  -translate-y-1/2 blur-[100px] will-change-transform">
          <div className="absolute top-0 right-0 h-[400px] w-[800px] -translate-x-1/5 rounded-full bg-gradient-to-r from-blue-500/25 to-green-500/25"></div>
          <div className="absolute top-0 right-0 size-[400px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        </div>
      </section>
      
      <section className="container max-w-5xl border-y py-5">
        <h2 className="font-mono text-sm tracking-widest text-accent-foreground">{t('heroAlt.therapist.title')}</h2>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-4xl tracking-tight md:text-5xl lg:text-6xl">15+</h3>
            <p className="mt-1 text-muted-foreground">{t('heroAlt.therapist.stats.experience')}</p>
          </div>
          <div>
            <h3 className="text-4xl tracking-tight md:text-5xl lg:text-6xl">2.5K</h3>
            <p className="mt-1 text-muted-foreground">{t('heroAlt.therapist.stats.people')}</p>
          </div>
          <div>
            <h3 className="text-4xl tracking-tight md:text-5xl lg:text-6xl">95%</h3>
            <p className="mt-1 text-muted-foreground">{t('heroAlt.therapist.stats.success')}</p>
          </div>
          <div>
            <h3 className="text-4xl tracking-tight md:text-5xl lg:text-6xl">150+</h3>
            <p className="mt-1 text-muted-foreground">{t('heroAlt.therapist.stats.partners')}</p>
          </div>
        </div>
      </section>
      
      <section className="container max-w-5xl py-10 md:py-12 lg:py-15">
        <div className="max-w-2xl space-y-5 md:space-y-8 lg:space-y-10">
          <p className="text-lg">
            {t('heroAlt.therapist.description1')}
          </p>
          <h2 className="text-2xl tracking-tight md:text-3xl">
            {t('heroAlt.therapist.description2')}
          </h2>
          <p className="text-lg">
            {t('heroAlt.therapist.description3')}
          </p>
        </div>
      </section>
    </section>
      </main>
    </section>
  )
}

export default HeroAlt