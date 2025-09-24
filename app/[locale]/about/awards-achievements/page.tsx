'use client'

import React, { useState, useEffect } from 'react'
import { awardApi, Award } from '../../../../lravel-api'
import { useParams, useSearchParams } from 'next/navigation'
import { AwardCommandMenu } from '@/components/award-command-menu'
import AwardFilterDrawer from '@/components/AwardFilterDrawer'
import Link from 'next/link'
import { useTranslations } from 'next-intl'



const AwardsPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params.locale as string
  const t = useTranslations('awardsAndAchievementsPage')
  const [awards, setAwards] = useState<Award[]>([])
  const [pagination, setPagination] = useState<{
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
  const currentLanguage = searchParams.get('language') || locale
  const currentSearch = searchParams.get('search') || ''

  useEffect(() => {
    const fetchAwards = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await awardApi.getAwards({
          page: currentPage,
          per_page: 12,
          language: currentLanguage,
          search: currentSearch,
        })

        setAwards(response.data)
        setPagination(response.pagination || null)
      } catch (err) {
        console.error('Ödül verileri yüklenirken hata:', err)
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
      } finally {
        setLoading(false)
      }
    }

    fetchAwards()
  }, [currentPage, currentLanguage, currentSearch])

  if (loading) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-gray-500">{t('loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4 ">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-red-500">{t('error')}</p>
            <p className="text-sm text-gray-500 mt-2">
              Dil: {locale} | Hata: {error}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 container mx-auto px-4 mb-">
      <div className="container mx-auto px-4 ">
        <nav aria-label="breadcrumb" data-slot="breadcrumb">
          <ol data-slot="breadcrumb-list" className="text-muted-foreground flex mb-5 flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <Link data-slot="breadcrumb-link" className="hover:text-foreground transition-colors" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4" aria-hidden="true">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </Link>
            </li>
            <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <Link data-slot="breadcrumb-link" className="hover:text-foreground transition-colors" href={`/${locale}/about`}>
                {t('title')}
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
        
        <div className="mb-8 md:mb-14 lg:mb-20">
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
            <AwardCommandMenu />
          </div>
          <div className="flex-shrink-0">
            <AwardFilterDrawer />
          </div>
        </div>

        {/* Awards Grid */}
        {awards.length > 0 ? (
          <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
            {awards.map((award) => {
              // Fallback slug generation if slug is undefined or empty
              const awardSlug = award.slug || award.name
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
              
              return (
              <Link key={award.id} href={`/${locale}/about/awards-achievements/${awardSlug}`} className="group flex flex-col">
                <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                  <div className="transition-opacity duration-300 group-hover:opacity-80">
                  {award.file_url ? (
                      <img
                        src={award.file_url.startsWith('http') ? award.file_url : `https://bioenerjist-books.s3.amazonaws.com/${award.file_url}`}
                        alt={award.name}
                        className="aspect-3/2 h-full w-full object-cover object-center"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-image') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <img src="/images/block/placeholder-dark-1.svg" alt={award.name} className="aspect-3/2 h-full w-full object-cover object-center" />
                    )}
                    <div className={`fallback-image aspect-3/2 h-full w-full bg-gray-200 flex items-center justify-center ${award.file_url ? 'hidden' : 'flex'}`}>
                      <span className="text-gray-400">{t('noImage')}</span>
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs">
                  <span className="font-medium">Elza Darya</span>
                  <span>•</span>
                  <span>{new Date(award.created_at).toLocaleDateString('tr-TR', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <h2 className="mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-2xl">
                  {award.name}
                </h2>
                <div className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                  {award.description}
                </div>
              </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('noAwards')}</p>
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
  )
}

export default AwardsPage