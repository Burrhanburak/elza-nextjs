'use client'
import React from 'react'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

const Cta = () => {
  const t = useTranslations()

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  return (
    <section className="w-full flex items-center justify-center py-6 px-0 md:py-8">
      <div className="w-full max-w-6xl flex items-center justify-start flex-col gap-2 px-6 md:px-8">
        <div className="w-full flex items-center justify-center relative overflow-hidden p-12 md:p-16 lg:p-20 rounded-3xl bg-[#206d4e] shadow-[rgba(119,45,8,0.05)_0px_0px_15px_0px,rgba(119,45,8,0.35)_0px_0.796192px_1.75162px_-1px,rgba(119,45,8,0.33)_0px_2.41451px_5.31191px_-2px,rgba(119,45,8,0.27)_0px_6.38265px_14.0418px_-3px,rgba(119,45,8,0.09)_0px_20px_44px_-4px]">
          {/* Text Wrapper */}
          <div className="flex flex-col items-center gap-8 z-10 relative">
            {/* Heading Wrapper */}
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-white text-center text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {t('cta.title')}
              </h1>
              <p className="text-white/75 text-center text-base md:text-lg max-w-2xl leading-relaxed">
                {t('cta.description')}
              </p>
            </div>
            
            {/* Buttons Wrapper */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Primary Button - Cal.com Booking */}
              <button 
                data-cal-namespace="30min"
                data-cal-link="elza-darya/30min"
                data-cal-config='{"layout":"month_view"}'
                className="group inline-flex items-center justify-center gap-3 bg-white text-[#0d0d0d] px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
              >
                {/* Hidden Arrow (for animation) */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1/2 group-hover:translate-y-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#0d0d0d]"
                  >
                    <path
                      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      fill="currentColor"
                    />
                  </svg>
            
                </div>
                <span>{t('nav.consultation')}</span>
                {/* Visible Arrow */}
                <div className="opacity-100 transition-all duration-300">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#0d0d0d]"
                  >
                    <path
                      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </button>

              {/* Secondary Button - Our Services */}
              <Link 
                href="/services"
                className="group inline-flex items-center justify-center gap-3 text-white px-6 py-4 font-medium text-lg transition-all duration-300 hover:text-white/80"
              >
                <span>{t('cta.servicesButton')}</span>
                <div className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rotate-[-45deg]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Background Dots Pattern */}
          <div 
            className="absolute inset-0 opacity-50 transform rotateX-[7deg]"
            style={{
              mask: 'radial-gradient(53% 75% at 50% 24.2%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 75.6081%, rgb(0, 0, 0) 100%)',
              WebkitMask: 'radial-gradient(53% 75% at 50% 24.2%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 75.6081%, rgb(0, 0, 0) 100%)'
            }}
          >
            <div className="w-full h-full bg-[url('/cta.svg')] bg-cover bg-center bg-no-repeat"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta