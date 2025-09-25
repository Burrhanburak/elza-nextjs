import React from 'react'
import { Book } from '../../../lravel-api'
import { BookCommandMenu } from '@/components/book-command-menu'
import BookFilterDrawer from '@/components/BookFilterDrawer'
import PaddleCheckoutButton from '@/components/PaddleCheckoutButton'
import Link from 'next/link'
import { Loader } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string; language?: string; search?: string }>
}

async function getBooks(params: { page: number; per_page: number; language: string; search: string }) {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    per_page: params.per_page.toString(),
    language: params.language,
    search: params.search
  })
  
  const response = await fetch(`https://elza-darya.test/api/books?${queryParams}`, {
    next: { revalidate: 3600 },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }
  
  return response.json()
}

export default async function BooksPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const resolvedSearchParams = await searchParams
  const currentPage = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1
  const currentLanguage = resolvedSearchParams.language || locale
  const currentSearch = resolvedSearchParams.search || ''
  const t = await getTranslations('booksPage')

  try {
    const response = await getBooks({
      page: currentPage,
      per_page: 12,
      language: currentLanguage,
      search: currentSearch,
    })

    const books: Book[] = response.data
    const pagination = response.pagination

    // JSON-LD Schema for Books Collection
    const booksPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Elza Darya Books Collection",
      "url": `https://elazadarya.com/${locale}/books`,
      "description": "Collection of published books by life coach and author Elza Darya",
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
        "name": "Published Books",
        "description": "Books on personal development, wellness, and life transformation"
      }
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(booksPageSchema) }}
        />
      
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
        <nav aria-label="breadcrumb" data-slot="breadcrumb">
          <ol data-slot="breadcrumb-list" className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <a data-slot="breadcrumb-link" className="hover:text-foreground transition-colors" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4" aria-hidden="true">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </a>
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
            <BookCommandMenu />
          </div>
          <div className="flex-shrink-0">
            <BookFilterDrawer />
          </div>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
            {books.map((book) => {
              // Fallback slug generation if slug is undefined or empty
              const bookSlug = book.slug || book.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
              
              return (
              <div key={book.id} className="group flex flex-col">
                <Link href={`/${locale}/books/${bookSlug}`} className="flex flex-col">
                  <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                    <div className="transition-opacity duration-300 group-hover:opacity-80">
                      {book.cover_image ? (
                        <img
                          src={book.cover_image.startsWith('http') ? book.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${book.cover_image}`}
                          alt={book.title}
                          className="aspect-3/2 h-full w-full object-cover object-center"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-image') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                         <Loader className="size-full" />
                      )}
                      <div className={`fallback-image aspect-3/2 h-full w-full bg-gray-200 flex items-center justify-center ${book.cover_image ? 'hidden' : 'flex'}`}>
                        <span className="text-gray-400">{t('noImage')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs">
                    <span className="font-medium">Elza Darya</span>
                    <span>•</span>
                    <span>{new Date(book.created_at).toLocaleDateString('tr-TR', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}</span>
                    {book.price > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-medium">{book.price} TL</span>
                      </>
                    )}
                  </div>
                  <h2 className="mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-2xl">
                    {book.title}
                  </h2>
                  <div className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                    {book.description}
                  </div>
                </Link>
                
                {/* Satın Alma Butonu */}
                <div className="mt-4">
                  {book.price > 0 ? (
                    <PaddleCheckoutButton 
                      type="book" 
                      productId={book.id} 
                      price={book.price} 
                      title={book.title}
                      paddlePriceId={book.paddle_price_id}
                    />
                  ) : (
                    <Link 
                      href={`/${locale}/books/${bookSlug}`} 
                      className="inline-block w-full text-center text-muted-foreground text-sm bg-[#006241] text-white px-4 py-2 rounded-md hover:bg-[#005a3f] transition-colors"
                    >
                      {t('viewDetails')}
                    </Link>
                  )}
                </div>
              </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('noBooks')}</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {pagination.current_page > 1 && (
              <a
                href={`?page=${pagination.current_page - 1}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                {t('previous')}
              </a>
            )}
            
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
              <a
                key={page}
                href={`?page=${page}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className={`px-4 py-2 border rounded ${
                  page === pagination.current_page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </a>
            ))}
            
            {pagination.current_page < pagination.last_page && (
              <a
                href={`?page=${pagination.current_page + 1}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                {t('next')}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  </>
  )
  } catch (error) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Books</h1>
            <p className="text-red-500">Kitap verileri yüklenirken bir hata oluştu.</p>
          </div>
        </div>
      </section>
    )
  }
}