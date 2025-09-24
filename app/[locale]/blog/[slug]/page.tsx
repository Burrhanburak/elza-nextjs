'use client'

import React,{ useEffect, useState } from 'react'
import { blogApi, Blog } from '../../../../lravel-api'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import type { Metadata, ResolvingMetadata } from 'next'


interface BlogPageProps {
  params: {
    locale: string;
    slug: string;
  };
}




export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const locale = params.locale as string

  
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate metadata for blog detail page
  const metaTitles = {
    en: blog?.title || "Elza Darya Blog Post",
    tr: blog?.title || "Elza Darya Blog Yazısı", 
    ru: blog?.title || "Запись в блоге Эльзы Дарьи",
    az: blog?.title || "Elza Darya Blog Məqaləsi"
  };

  const metaDescriptions = {
    en: blog?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || "Read Elza Darya's latest insights on wellness and personal development.",
    tr: blog?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || "Elza Darya'nın sağlık ve kişisel gelişim üzerine en son görüşlerini okuyun.",
    ru: blog?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || "Читайте последние идеи Эльзы Дарьи о здоровье и личном развитии.",
    az: blog?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || "Elza Daryanın sağlamlıq və şəxsi inkişaf haqqında ən son fikirlərini oxuyun."
  };

  // JSON-LD Schema for Blog Post
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog?.title || "Blog Post",
    "image": blog?.cover_image ? (blog.cover_image.startsWith('http') ? blog.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${blog.cover_image}`) : '/ogm.png',
    "datePublished": blog?.published_at,
    "dateModified": blog?.updated_at,
    "author": { "@type": "Person", "name": "Elza Darya" },
    "publisher": { "@type": "Organization", "name": "Elza Darya", "logo": "https://elazadarya.com/elza-logo.svg" },
    "inLanguage": locale,
    "mainEntityOfPage": `https://elazadarya.com/${locale}/blog/${slug}`,
    "description": blog?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || "Blog post by Elza Darya",
    "url": `https://elazadarya.com/${locale}/blog/${slug}`
  };

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      setLoading(true)
      setError(null)
      
      try {
        console.log('Fetching blog with slug:', slug)
        const response = await blogApi.getBlog(slug)
        console.log('Blog response:', response)
        setBlog(response.data)
      } catch (err) {
        console.error('Blog detayı yüklenirken hata:', err)
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-500">Blog detayı yükleniyor...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !blog) {
    return (
      <section className="py-32 container mx-auto px-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Detayı</h1>
            <p className="text-red-500">Blog yazısı bulunamadı.</p>
            <p className="text-sm text-gray-500 mt-2">
              Slug: {slug} | Hata: {error}
            </p>
            <Link href={`/${locale}/blog`} className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              ← Tüm Blog Yazıları
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
 <>
 
      <Head>
        <title>{metaTitles[locale as keyof typeof metaTitles]}</title>
        <meta name="description" content={metaDescriptions[locale as keyof typeof metaDescriptions]} />
        <link rel="canonical" href={`https://elazadarya.com/${locale}/blog/${slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitles[locale as keyof typeof metaTitles]} />
        <meta property="og:description" content={metaDescriptions[locale as keyof typeof metaDescriptions]} />
        <meta property="og:url" content={`https://elazadarya.com/${locale}/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog?.cover_image ? (blog.cover_image.startsWith('http') ? blog.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${blog.cover_image}`) : '/ogm.png'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitles[locale as keyof typeof metaTitles]} />
        <meta name="twitter:description" content={metaDescriptions[locale as keyof typeof metaDescriptions]} />
        <meta name="twitter:image" content={blog?.cover_image ? (blog.cover_image.startsWith('http') ? blog.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${blog.cover_image}`) : '/ogm.png'} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogSchema)
          }}
        />
      </Head>


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
              <Link className="hover:text-foreground transition-colors" href={`/${locale}/blog`}>Blog</Link>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-3.5 w-3.5" aria-hidden="true">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="text-foreground font-normal">{blog.title}</span>
            </li>
          </ol>
        </nav>

        {/* Blog Header */}
        <h1 className="mb-7 mt-9 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">{blog.title}</h1>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-8 w-8 border">
            <div className="aspect-square size-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
              ED
            </div>
          </span>
          <span>
            <a href="#" className="font-medium">Elza Darya</a>
            <span className="text-muted-foreground ml-1">
              {new Date(blog.published_at).toLocaleDateString('tr-TR', { 
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
              {/* Blog Cover Image Display */}
              {blog.cover_image && (
                <div className="mb-8 mt-0 aspect-video w-full rounded-lg border overflow-hidden bg-gradient-to-br from-orange-100 to-red-200 flex items-center justify-center">
                  <img 
                    src={blog.cover_image.startsWith('http') ? blog.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${blog.cover_image}`}
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              {/* Blog Content */}
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">BU SAYFADA</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  <li><a href="#introduction" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Giriş</a></li>
                  <li><a href="#main-content" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Ana İçerik</a></li>
                  <li><a href="#conclusion" className="block py-1 transition-colors duration-200 text-muted-foreground hover:text-primary">Sonuç</a></li>
                </ul>
              </nav>
            </div>
            
            <div className="bg-border shrink-0 h-px w-full order-2 mb-11 mt-8 lg:hidden"></div>
            
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="text-muted-foreground font-medium">Bu yazıyı paylaş:</p>
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

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t">
           <Link
             href={`/${locale}/blog`}
             className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-80 transition-colors"
             style={{ backgroundColor: '#206d4e' }}
           >
            ← Tüm Blog Yazıları
          </Link>
        </div>
      </div>
    </section>
    </>
  )
}