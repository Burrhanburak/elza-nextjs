'use client'

import React, { useState, useEffect } from 'react'
import { Poem, poemApi } from '../../../lravel-api'
import { useParams, useSearchParams } from 'next/navigation'
import { PoemCommandMenu } from '@/components/poem-command-menu'
import PoemFilterDrawer from '@/components/PoemFilterDrawer'
import Link from 'next/link'
import PaddleCheckoutButton from '@/components/PaddleCheckoutButton'
import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'


const PoemsPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params.locale as string
  const t = useTranslations('poemsPage')
  
  const [poems, setPoems] = useState<Poem[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
  const currentLanguage = searchParams.get('language') || locale
  const currentSearch = searchParams.get('search') || ''

  // JSON-LD Schema for Poems Collection
  const poemsPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Elza Darya Poems Collection",
    "url": `https://elazadarya.com/${locale}/poems`,
    "description": "Collection of poems by life coach and author Elza Darya",
    "author": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Author & Life Coach"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elza Darya"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Published Poems",
      "description": "Poems on personal development, wellness, and life inspiration"
    }
  };

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await poemApi.getPoems({
          page: currentPage,
          per_page: 12,
          language: currentLanguage,
          search: currentSearch,
        })

        setPoems(response.data)
        setPagination(response.pagination)
      } catch (err) {
        console.error('❌ Poems Page Error:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
      } finally {
        setLoading(false)
      }
    }

    fetchPoems()
  }, [currentPage, currentLanguage, currentSearch])

  if (loading) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Poems</h1>
            <p className="text-gray-500">Şiir verileri yükleniyor...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Poems</h1>
            <p className="text-red-500">Şiir verileri yüklenirken bir hata oluştu.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(poemsPageSchema),
        }}
      />
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
        <nav aria-label="breadcrumb" data-slot="breadcrumb">
          <ol data-slot="breadcrumb-list" className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <Link data-slot="breadcrumb-link" className="hover:text-foreground transition-colors" href="/"> 
                <Home className="size-4" aria-hidden="true" />
              </Link>
            </li>
            <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className="text-foreground font-normal">{t('title')}</span>
            </li>
          </ol>
        </nav>
        
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">{t('title')}</h1>
            </div>
          </div>
          <p>{t('subtitle')}</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
          <div className="flex-1 max-w-md ">
            <PoemCommandMenu />
          </div>
          <div className="flex-shrink-0">
            <PoemFilterDrawer />
          </div>
        </div>

        {/* Poems Grid */}
        {poems.length > 0 ? (
          <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
            {poems.map((poem) => {
              // Fallback slug generation if slug is undefined or empty
              const poemSlug = poem.slug || poem.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
              
              return (
              <div key={poem.id} className="group flex flex-col">
                <Link href={`/${locale}/poems/${poemSlug}`} className="flex flex-col">
                  <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                    <div className="transition-opacity duration-300 group-hover:opacity-80">
                      {poem.cover_image ? (
                        <img
                          src={poem.cover_image.startsWith('http') ? poem.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${poem.cover_image}`}
                          alt={poem.title}
                          className="aspect-3/2 h-full w-full object-cover object-center"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-image') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <img src="/images/block/placeholder-dark-1.svg" alt={poem.title} className="aspect-3/2 h-full w-full object-cover object-center" />
                      )}
                      <div className={`fallback-image aspect-3/2 h-full w-full bg-gray-200 flex items-center justify-center ${poem.cover_image ? 'hidden' : 'flex'}`}>
                        <span className="text-gray-400">{t('noImage')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs">
                    <span className="font-medium">Elza Darya</span>
                  
                    <span>•</span>
                    <span>{new Date(poem.created_at).toLocaleDateString('tr-TR', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                
                  <h2 className="mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-2xl">
                    {poem.title}
                  </h2>
                  <div className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                    {poem.description}
                  </div>
                </Link>
                
                {/* Satın Alma Butonu - Link dışında */}
                <div className="mt-4">
                  {poem.price > 0 ? (
                  <PaddleCheckoutButton 
                    type="poem" 
                    productId={poem.id} 
                    price={poem.price}
                    title={poem.title}
                    paddlePriceId={poem.paddle_price_id}
                  />
                
                  ) : (
                    <Link href={`/${locale}/poems/${poemSlug}`} className="inline-block w-full text-center text-muted-foreground text-sm bg-[#006241] text-white px-4 py-2 rounded-md hover:bg-[#005a3f] transition-colors">
                      {t('viewDetails')}
                    </Link>
                  )}
                </div>
              </div>
            )})}
          
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('noPoems')}</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {pagination.current_page > 1 && (
              <Link
                href={`?page=${pagination.current_page - 1}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                {t('previous')}
              </Link>
            )}
            
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`?page=${page}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className={`px-4 py-2 border rounded ${
                  page === pagination.current_page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            ))}
            
            {pagination.current_page < pagination.last_page && (
              <Link
                href={`?page=${pagination.current_page + 1}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                {t('next')}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
    </>
  )
}

export default PoemsPage