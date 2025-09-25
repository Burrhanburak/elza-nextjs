'use client'

import React, { useState, useEffect } from 'react'
import { awardApi, Award } from '../../../../../lravel-api'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function AwardDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const locale = params.locale as string
  
  const [award, setAward] = useState<Award | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔍 Awards Detail Debug Info:', { slug, locale })
    
    if (!slug || slug === 'undefined' || slug === 'null' || slug.trim() === '') {
      console.error('❌ Invalid award slug detected:', slug)
      return
    }

    const fetchAward = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // First try to get award by slug
        let response
        try {
          response = await awardApi.getAward(slug)
        } catch (slugError) {
          // If slug fails, try to find by matching name
          const awardsResponse = await awardApi.getAwards()
          const awards = awardsResponse.data
          
          // Generate slug from name and find matching award
          const matchingAward = awards.find(award => {
            const generatedSlug = award.name
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim()
            return generatedSlug === slug
          })
          
          if (!matchingAward) {
            throw new Error('Award not found')
          }
          
          // Use the actual slug from database or generate one
          const actualSlug = matchingAward.slug || matchingAward.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim()
          
          response = await awardApi.getAward(actualSlug)
        }
        
        setAward(response.data)
      } catch (err) {
        console.error('Ödül detayı yüklenirken hata:', err)
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
      } finally {
        setLoading(false)
      }
    }

    fetchAward()
  }, [slug])

  if (loading) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Ödül Detayı</h1>
            <p className="text-gray-500">Ödül detayı yükleniyor...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !award) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Ödül Detayı</h1>
            <p className="text-red-500">Ödül bulunamadı.</p>
            <p className="text-sm text-gray-500 mt-2">
              Slug: {slug} | Hata: {error}
            </p>
            <Link href={`/${locale}/about/awards-achievements`} className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              ← Tüm Ödüller
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 container mx-auto px-4">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <Link className="hover:text-foreground transition-colors" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4" aria-hidden="true">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </Link>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-3.5 w-3.5" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Link className="hover:text-foreground transition-colors" href={`/${locale}/about`}>Hakkımda</Link>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-3.5 w-3.5" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Link className="hover:text-foreground transition-colors" href={`/${locale}/about/awards-achievements`}>Ödüller ve Başarılar</Link>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-3.5 w-3.5" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="text-foreground font-normal">{award.name}</span>
            </li>
          </ol>
        </nav>

        {/* Award Header */}
        <h1 className="mb-7 mt-9 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">{award.name}</h1>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8 border">
            <div className="aspect-square size-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-white font-bold">
              ED
            </div>
          </span>
          <span>
            <a href="#" className="font-medium">Elza Darya</a>
            <span className="text-muted-foreground ml-1">
              {new Date(award.created_at).toLocaleDateString('tr-TR', { 
                day: 'numeric',
                month: 'long', 
                year: 'numeric' 
              })} tarihinde elde edildi
            </span>
          </span>
        </div>

        {/* Main Content */}
        <div className="relative mt-12 grid max-w-7xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            <div>
              {/* Award Certificate Display */}
              {award.file_url && (
                <div className="mb-8 mt-0 aspect-video w-full rounded-lg border overflow-hidden bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 mx-auto mb-4">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    <p className="text-yellow-700 font-medium">Ödül Belgesi</p>
                    <a 
                      href={award.file_url.startsWith('http') ? award.file_url : `https://bioenerjist-books.s3.amazonaws.com/${award.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                    >
                      Belgeyi Görüntüle
                    </a>
                  </div>
                </div>
              )}
              
              {/* Award Description */}
              <div className="prose dark:prose-invert max-w-none">
                <h2>Ödül Hakkında</h2>
                <p className="text-lg leading-relaxed">{award.description}</p>
                
                <h3>Başarının Önemi</h3>
                <p>Bu ödül, bioenerji ve terapi alanındaki uzun yıllara dayanan çalışmalarımın ve kişisel gelişim yolculuğumdaki önemli bir kilometre taşının bir göstergesidir.</p>
                
                <h3>Elde Ediliş Tarihi</h3>
                <p>{new Date(award.created_at).toLocaleDateString('tr-TR', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">BU SAYFADA</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  <li><a href="#description" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Ödül Hakkında</a></li>
                  <li><a href="#importance" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Başarının Önemi</a></li>
                  <li><a href="#date" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Elde Ediliş Tarihi</a></li>
                </ul>
              </nav>
            </div>
            
            <div className="bg-border shrink-0 h-px w-full order-2 mb-11 mt-8 lg:hidden"></div>
            
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="text-muted-foreground font-medium">Bu başarıyı paylaş:</p>
              <ul className="flex gap-2">
                <li>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 size-9 group rounded-full">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook fill-muted-foreground text-muted-foreground group-hover:fill-primary group-hover:text-primary h-4 w-4 transition-colors" aria-hidden="true">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                  </button>
                </li>
                <li>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 size-9 group rounded-full">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin fill-muted-foreground text-muted-foreground group-hover:fill-primary group-hover:text-primary h-4 w-4 transition-colors" aria-hidden="true">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </button>
                </li>
                <li>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 size-9 group rounded-full">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter fill-muted-foreground text-muted-foreground group-hover:fill-primary group-hover:text-primary h-4 w-4 transition-colors" aria-hidden="true">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Awards */}
        <div className="mt-12 pt-8 border-t">
           <Link
             href={`/${locale}/about/awards-achievements`}
             className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-80 transition-colors"
             style={{ backgroundColor: '#206d4e' }}
           >
            ← Tüm Ödüller ve Başarılar
          </Link>
        </div>
      </div>
    </section>
  )
}