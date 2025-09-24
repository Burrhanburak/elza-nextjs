'use client'

import React, { useState, useEffect } from 'react'
import { poemApi, Poem, checkoutApi } from '../../../../lravel-api'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PaddleCheckoutButton from '@/components/PaddleCheckoutButton'
import DownloadVerification from '@/components/DownloadVerification'

const PoemDetailPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const locale = params.locale as string
  
  const [poem, setPoem] = useState<Poem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug || slug === 'undefined' || slug.trim() === '') {
      notFound()
      return
    }

    const fetchPoem = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // First try to get poem by slug
        let response
        try {
          response = await poemApi.getPoem(slug)
        } catch (slugError) {
          // If slug fails, try to find by matching title
          const poemsResponse = await poemApi.getPoems()
          const poems = poemsResponse.data
          
          // Generate slug from title and find matching poem
          const matchingPoem = poems.find(poem => {
            const generatedSlug = poem.title
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .trim()
            return generatedSlug === slug
          })
          
          if (!matchingPoem) {
            throw new Error('Poem not found')
          }
          
          // Use the actual slug from database or generate one
          const actualSlug = matchingPoem.slug || matchingPoem.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim()
          
          response = await poemApi.getPoem(actualSlug)
        }
        
        setPoem(response.data)
      } catch (err) {
        console.error('Şiir verileri yüklenirken hata:', err)
        if (err instanceof Error && err.message === 'Poem not found') {
          notFound()
        }
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
      } finally {
        setLoading(false)
      }
    }

    fetchPoem()
  }, [slug])

  if (loading) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-500">Şiir yükleniyor...</p>
        </div>
      </section>
    )
  }

  if (error || !poem) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Şiir Detayı</h1>
            <p className="text-red-500">Şiir bulunamadı.</p>
            <p className="text-sm text-gray-500 mt-2">
              Slug: {slug} | Hata: {error}
            </p>
            <Link href={`/${locale}/poems`} className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              ← Tüm Şiirler
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
              <Link className="hover:text-foreground transition-colors" href={`/${locale}/poems`}>Şiirler</Link>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-3.5 w-3.5" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="text-foreground font-normal">{poem.title}</span>
            </li>
          </ol>
        </nav>

        {/* Poem Header */}
        <h1 className="mb-7 mt-9 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">{poem.title}</h1>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8 border">
            <div className="aspect-square size-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
              ED
            </div>
          </span>
            <span>
              <a href="#" className="font-medium">Elza Darya</a>
            <span className="text-muted-foreground ml-1">
              {new Date(poem.created_at).toLocaleDateString('tr-TR', { 
                day: 'numeric',
                month: 'long', 
                year: 'numeric' 
              })} tarihinde yayınlandı
            </span>
            </span>
        </div>

        {/* Main Content */}
        <div className="relative mt-12 grid max-w-7xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            <div>
              {/* Poem Cover Display */}
              {poem.cover_image && (
                <div className="mb-8 mt-0 aspect-video w-full rounded-lg border overflow-hidden bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center">
                  <img
                    src={poem.cover_image.startsWith('http') ? poem.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${poem.cover_image}`}
                    alt={poem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Poem Description */}
              <div className="prose dark:prose-invert max-w-none">
                <h2>Şiir Hakkında</h2>
                <p className="text-lg leading-relaxed">{poem.description}</p>
                
                <h3>Şiirin Anlamı</h3>
                <p>Bu şiir, kalbin derinliklerinden gelen duyguların ve ruhun sesinin bir yansımasıdır. Her satırda, yaşamın güzelliklerini ve zorluklarını birlikte yaşamanın hikayesi anlatılır.</p>
                
                <h3>Yayın Tarihi</h3>
                <p>{new Date(poem.created_at).toLocaleDateString('tr-TR', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
              </div>

              {/* PDF Downloads and Purchase */}
              <div className="mt-8 space-y-4">
                {/* Önizleme PDF */}
                {poem.preview_pdf && (
                  <div>
                    <a
                      href={poem.preview_pdf.startsWith('http') ? poem.preview_pdf : `https://bioenerjist-books.s3.amazonaws.com/${poem.preview_pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                      Önizleme PDF
                    </a>
                  </div>
                )}
                
                {/* Satın Alma ve İndirme */}
                <div className="space-y-4">
                  {/* Satın Alma */}
                  <div>
                    <PaddleCheckoutButton 
                      type="poem" 
                      productId={poem.id} 
                      price={poem.price} 
                      title={poem.title}
                      paddlePriceId={poem.paddle_price_id}
                    />
                  </div>
                  
                  {/* İndirme Doğrulaması */}
                  <div>
                    <DownloadVerification 
                      type="poem" 
                      productId={poem.id} 
                      title={poem.title} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">BU SAYFADA</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  <li><a href="#description" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Şiir Hakkında</a></li>
                  <li><a href="#meaning" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Şiirin Anlamı</a></li>
                  <li><a href="#date" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Yayın Tarihi</a></li>
                </ul>
              </nav>
            </div>
            
            <div className="bg-border shrink-0 h-px w-full order-2 mb-11 mt-8 lg:hidden"></div>
            
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="text-muted-foreground font-medium">Bu şiiri paylaş:</p>
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

        {/* Back to Poems */}
        <div className="mt-12 pt-8 border-t">
           <Link
             href={`/${locale}/poems`}
             className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-80 transition-colors"
             style={{ backgroundColor: '#206d4e' }}
           >
            ← Tüm Şiirler
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PoemDetailPage