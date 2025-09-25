'use client'

import React, { useState, useEffect } from 'react'
import { Blog, blogApi } from '../../../lravel-api'
import { useParams, useSearchParams } from 'next/navigation'
import { BlogCommandMenu } from '@/components/blog-command-menu'
import BlogFilterDrawer from '@/components/BlogFilterDrawer'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

const BlogPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params.locale as string
  const t = useTranslations('blogPage')
  
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
  const currentLanguage = searchParams.get('language') || locale
  const currentSearch = searchParams.get('search') || ''

  // JSON-LD Schema for Blog Collection
  const blogPageSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Elza Darya Blog",
    "url": `https://elazadarya.com/${locale}/blog`,
    "description": "Personal development, wellness, and life transformation blog by life coach Elza Darya",
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
      "name": "Blog Posts",
      "description": "Articles on personal development, wellness, and life transformation"
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await blogApi.getBlogs({
          page: currentPage,
          per_page: 12,
          language: currentLanguage,
          search: currentSearch,
        })

        console.log('🔍 Blog Page response:', response)

        setBlogs(response.data)
        setPagination(response.pagination)
      } catch (err) {
        console.error('❌ Blog Page Error:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage, currentLanguage, currentSearch])

  if (loading) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-500">Blog verileri yükleniyor...</p>
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
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-red-500">Blog verileri yüklenirken bir hata oluştu.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer">Debug Info</summary>
                <pre className="text-xs mt-2 p-4 bg-gray-100 rounded">
                  {error}
                </pre>
              </details>
            )}
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
          __html: JSON.stringify(blogPageSchema),
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
              <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className="text-foreground font-normal">Blog</span>
            </li>
          </ol>
        </nav>
        
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">Blog</h1>
            </div>
          </div>
          <p>Insights, tutorials, and thoughts on modern software development</p>
        </div>

        {/* Search and Filter */}
        {/* <div className="mb-8 flex">
          <form className=" gap-4 justify-center">
            <input
              type="text"
              placeholder="Blog ara..."
              name="search"
              defaultValue={currentSearch}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="language"
              defaultValue={currentLanguage}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tüm Diller</option>
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="az">Azərbaycan</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Filtrele
            </button>
          </form>
        </div> */}
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
          <div className="flex-1 max-w-md ">
            <BlogCommandMenu />
          </div>
          <div className="flex-shrink-0">
            <BlogFilterDrawer />
          </div>
        </div>
       

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="group flex flex-col">
                <Link href={`/${locale}/blog/${blog.slug}`} className="group flex flex-col">
                  <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                    <div className="transition-opacity duration-300 group-hover:opacity-80">
                      {blog.cover_image ? (
                        <img
                          src={blog.cover_image.startsWith('http') ? blog.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${blog.cover_image}`}
                          alt={blog.title}
                          className="aspect-3/2 h-full w-full object-cover object-center"
                        />
                      ) : (
                        <img src="/images/block/placeholder-dark-1.svg" alt={blog.title} className="aspect-3/2 h-full w-full object-cover object-center" />
                      )}
                      <div className={`fallback-image aspect-3/2 h-full w-full bg-gray-200 flex items-center justify-center ${blog.cover_image ? 'hidden' : 'flex'}`}>
                        <span className="text-gray-400">Resim Yok</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs">
                    <span className="font-medium">Elza Darya</span>
                    <span>•</span>
                    <span>{new Date(blog.published_at).toLocaleDateString('tr-TR', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <h2 className="mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-2xl">
                    {blog.title}
                  </h2>
                  <div className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                    {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </div>
                </Link>
                {blog.categories && blog.categories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/${locale}/blog?category=${category.slug}`}
                        className="rounded-full bg-muted px-2 py-1 text-xs font-medium transition-colors hover:bg-muted/80"
                      >
                        {locale === 'en' ? category.name_en : 
                         locale === 'ru' ? category.name_ru : 
                         locale === 'az' ? category.name_az : 
                         category.name_tr}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Henüz blog yazısı bulunmuyor.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="mt-8 flex flex-col items-center py-2 md:hidden">
            <button data-slot="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full sm:w-fit">
              View all posts
            </button>
          </div>
        )}

        {/* Desktop Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {pagination.current_page > 1 && (
              <a
                href={`?page=${pagination.current_page - 1}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                 Previous
              </a>
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
              <a
                href={`?page=${pagination.current_page + 1}${currentLanguage ? `&language=${currentLanguage}` : ''}${currentSearch ? `&search=${currentSearch}` : ''}`}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </section>
    </>
  )
}

export default BlogPage

