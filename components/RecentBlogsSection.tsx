'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Loader } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {blogApi ,Blog, Category} from '../lravel-api';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  categories?: Category[];
  cover_image?: string;
  published_at: string;
  language: string;
  created_at: string;
  updated_at: string;
}

interface RecentBlogsSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
}

const RecentBlogsSection: React.FC<RecentBlogsSectionProps> = ({
  title,
  subtitle,
  posts: propPosts
}) => {
  const locale = useLocale();
  const t = useTranslations('recentBlogsSection');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Laravel API'den blog verilerini çek
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Mevcut blogApi'yi kullan
        const response = await blogApi.getBlogs({
          language: locale,
          per_page: 3
        });
        
        if (response.success && response.data) {
          setPosts(response.data);
        } else {
          throw new Error('Blog verileri yüklenemedi');
        }
      } catch (err) {
        console.error('Blog yükleme hatası:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
        
        // Hata durumunda boş array
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    // Eğer prop olarak posts verilmişse API'yi çağırma
    if (propPosts) {
      setPosts(propPosts);
      setLoading(false);
    } else {
      fetchBlogs();
    }
  }, [locale, propPosts]);

  // Tarih formatını düzenle
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // İçerikten excerpt oluştur
  const createExcerpt = (content: string, maxLength: number = 150): string => {
    const plainText = content.replace(/<[^>]*>/g, ''); // HTML tag'lerini kaldır
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  if (loading) {
    return (
      <section className="py-10 container mx-auto px-4">
        <div className="px-0 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="container text-3xl font-bold lg:text-5xl">
            <span className="text-muted-foreground">{title || t('title')}</span>
            <br />
            {subtitle || t('subtitle')}
          </h1>
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error && posts.length === 0) {
    return (
      <section className="py-10 container mx-auto px-4">
        <div className="px-0 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="container text-3xl font-bold lg:text-5xl">
            <span className="text-muted-foreground">{title || t('title')}</span>
            <br />
            {subtitle || t('subtitle')}
          </h1>
          <div className="mt-8 text-center text-muted-foreground">
            <p>Blog içerikleri yüklenirken bir hata oluştu.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 container mx-auto px-4">
      <div className="px-0 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="container text-3xl font-bold lg:text-5xl">
          <span className="text-muted-foreground">{title || t('title')}</span>
          <br />
          {subtitle || t('subtitle')}
        </h1>
        <div className="mt-8">
          <div 
            data-orientation="horizontal" 
            role="none" 
            data-slot="separator-root" 
            className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
          />
          <div>
            {posts.map((post, index) => (
              <div key={post.id}>
                <div className="container grid grid-cols-1 gap-6 py-8 lg:grid-cols-4">
                  {/* Author Info with Image */}
                  <div className="hidden items-center gap-3 self-start lg:flex">
                    <img 
                      src="/green-elza.svg" 
                      alt="Elza Darya" 
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Elza Darya</span>
                      <span className="text-sm text-muted-foreground">
                        {t('author.bioenergyTherapist')}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="col-span-2 max-w-xl">
                    <span className="mb-2 text-sm font-medium text-muted-foreground">
                      {formatDate(post.published_at)}
                      <span className="inline lg:hidden"> - Elza Darya</span>
                    </span>
                    <h3 className="text-2xl font-bold hover:underline lg:text-3xl">
                      <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      {createExcerpt(post.content)}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.categories?.map((category) => (
                        <Link
                          key={category.id}
                          href={`/${locale}/blog?category=${category.slug}`} 
                          className="rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          {locale === 'en' ? category.name_en : 
                           locale === 'ru' ? category.name_ru : 
                           locale === 'az' ? category.name_az : 
                           category.name_tr}
                        </Link>
                      ))}
                      <Link
                        href={`/${locale}/blog`} 
                        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        Blog
                        <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {/* Blog Post Image */}
                  <div className="flex justify-center lg:justify-end">
                    {post.cover_image ? (
                      <div className="relative w-full">
                        <img
                          src={post.cover_image.startsWith('http') ? post.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${post.cover_image}`}
                          alt={post.title}
                          className="aspect-3/2 h-full w-full object-cover object-center"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-image') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          data-slot="button" 
                          className="absolute top-2 right-2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background/80 backdrop-blur shadow-xs hover:bg-accent hover:text-accent-foreground size-8 flex"
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">{t('readMore')}</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="relative w-full">
                        <Loader className="size-full" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Separator between posts */}
                {index < posts.length - 1 && (
                  <div 
                    data-orientation="horizontal" 
                    role="none" 
                    data-slot="separator-root" 
                    className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogsSection;