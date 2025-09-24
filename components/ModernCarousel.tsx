'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Loader } from 'lucide-react';
import { bookApi, Book, poemApi, Poem } from '../lravel-api';


interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  slug?: string;
  icon?: string;
  icon2?: React.ReactNode;
  type?: 'book' | 'poem';
}

interface ModernCarouselProps {
  title?: string;
  subtitle?: string;
  items?: CarouselItem[];
  locale: string;
  fetchBooks?: boolean;
  fetchPoems?: boolean;
  dict?: any;
}

const defaultItems: CarouselItem[] = [
  {
    id: 'default-1',
    title: '',
    description: '',
    image: '',
    alt: '',
  },
  {
    id: 'default-2', 
    title: '',
    description: '',
    image: '',
    alt: '',
  },
  {
    id: 'default-3',
    title: '',
    description: '',
    image: '', 
    alt: '',
  }
];

export default function ModernCarousel({ 
  title, 
  subtitle,
  items = defaultItems,
  locale,
  fetchBooks = false,
  fetchPoems = false,
  dict
}: ModernCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>(defaultItems);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize component
  useEffect(() => {
    if (initialized) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedItems: CarouselItem[] = [];


        if (fetchBooks) {
          const response = await bookApi.getBooks({
            page: 1,
            per_page: 6,
            language: locale,
          });

          if (response.data && response.data.length > 0) {
            const bookItems: CarouselItem[] = response.data.map((book: Book) => ({
              id: book.id.toString(),
              title: book.title,
              description: book.description.substring(0, 100) + '...',
              image: book.cover_image 
                ? (book.cover_image.startsWith('http') ? book.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${book.cover_image}`)
                : '',
              alt: book.title,
              slug: book.slug,
              icon: '/elza-logo.svg',
              icon2: <ExternalLink />,
              type: 'book'
            }));
            fetchedItems = [...fetchedItems, ...bookItems];
          }
        }

        if (fetchPoems) {
          const response = await poemApi.getPoems({
            page: 1,
            per_page: 6,
            language: locale,
          });

          if (response.data && response.data.length > 0) {
            const poemItems: CarouselItem[] = response.data.map((poem: Poem) => ({
              id: poem.id.toString(),
              title: poem.title,
              description: poem.description.substring(0, 100) + '...',
              image: poem.cover_image 
                ? (poem.cover_image.startsWith('http') ? poem.cover_image : `https://bioenerjist-books.s3.amazonaws.com/${poem.cover_image}`)
                : '',
              alt: poem.title,
              slug: poem.slug,
              icon: '/green-elza.svg',
              icon2: <ExternalLink  />,
              type: 'poem'
            }));
            fetchedItems = [...fetchedItems, ...poemItems];
          }
        }

        setCarouselItems(fetchedItems.length > 0 ? fetchedItems : defaultItems);
      } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        setCarouselItems(items.length > 0 ? items : defaultItems);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    if (fetchBooks || fetchPoems) {
      fetchData();
    } else {
      setCarouselItems(items.length > 0 ? items : defaultItems);
      setLoading(false);
      setInitialized(true);
    }
  }, [fetchBooks, fetchPoems, locale, items, initialized]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselItems.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Measure a single slide width to translate by exact pixels, matching the provided layout
  useEffect(() => {
    const measure = () => {
      if (firstItemRef.current) {
        setItemWidth(firstItemRef.current.offsetWidth);
      }
    };
    measure();
    const resizeObserver = new ResizeObserver(() => measure());
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    if (firstItemRef.current) resizeObserver.observe(firstItemRef.current);
    window.addEventListener('resize', measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section className="overflow-hidden  px-4 container mx-auto">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative" role="region" aria-roledescription="carousel" data-slot="carousel">
          <div className="grid gap-8 md:gap-4 lg:grid-cols-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
            <div>
              <h2 className="text-4xl font-semibold md:text-6xl text-[rgb(38,14,1)]">
                {title || dict?.home?.carousel?.modernCarousel?.title || "Keşfet ve Satın al"} <br /> 
                <span className="text-primary/40">{subtitle || dict?.home?.carousel?.modernCarousel?.subtitle || "Kitaplar & Şiirler"}</span>
              </h2>
              <p className="mt-8 text-xl text-primary">
                {dict?.home?.carousel?.modernCarousel?.description || "Kitap ve şiir koleksiyonlarımı keşfedin ve satın alın."}
              </p>
              {loading && (
                <div className="mt-4 text-sm text-primary/60 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span>Ürünler yükleniyor...</span>
                  </div>
                </div>
              )}
              <div className="mt-8 hidden items-center gap-4 md:flex">
                <button
                  data-slot="carousel-previous"
                  onClick={goToPrevious}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-full top-1/2 -left-12 static size-12 translate-x-0 translate-y-0"
                >
                  <span className="sr-only">{dict?.home?.carousel?.modernCarousel?.previousSlide || "Önceki slayt"}</span>
                  <ChevronLeft  className='size-4'/>              
                </button>
                <button
                  data-slot="carousel-next"
                  onClick={goToNext}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-full top-1/2 -right-12 static size-12 translate-x-0 translate-y-0"
                >
                  <span className="sr-only">{dict?.home?.carousel?.modernCarousel?.nextSlide || "Sonraki slayt"}</span>
                  <ChevronRight  className='size-4'/>              
                </button>
              </div>
            </div>
            <div className="overflow-hidden" data-slot="carousel-content">
              {loading && carouselItems.length === 0 && (
                <div className="flex -ml-4 max-w-[400px]">
                  {/* Skeleton loader */}
                  <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 w-fit">
                    <div className="relative aspect-2/3 max-h-[500px] sm:max-h-[500px] rounded-2xl bg-gray-200 animate-pulse">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-300 to-transparent to-40%"></div>
                      <div className="absolute inset-0 p-8">
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                ref={trackRef}
                className={`flex -ml-4 max-w-[400px] select-none transition-transform duration-500 ease-in-out ${loading && carouselItems.length === 0 ? 'opacity-0' : 'opacity-100'}`}
                style={{ transform: `translate3d(-${currentIndex * (itemWidth || 0)}px, 0px, 0px)` }}
              >
                {carouselItems.map((item, index) => {
                  // Determine URL based on item type
                  let itemUrl = '#';
                  if (item.type === 'book') {
                    itemUrl = `/${locale}/books`;
                  } else if (item.type === 'poem') {
                    itemUrl = `/${locale}/poems`;
                  }
                  
                  const hasContent = item.type !== undefined;
                  const ItemWrapper = hasContent ? 'a' : 'div';
                  let wrapperProps = {};
                  
                  if (hasContent) {
                    wrapperProps = { href: itemUrl, className: "block" };
                  }

                  return (
                    <div
                      key={item.id}
                      role="group"
                      aria-roledescription="slide"
                      data-slot="carousel-item"
                      className="min-w-0 shrink-0 grow-0 basis-full pl-4 w-fit"
                      ref={index === 0 ? firstItemRef : undefined}
                    >
                      <ItemWrapper {...wrapperProps}>
                        <div className="relative aspect-2/3 max-h-[500px] sm:max-h-[500px] rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 animate-slideUp">
                          <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-primary to-transparent to-40%"></div>
                          <div className="relative size-full">
                            {item.image ? (
                              <>
                                <img 
                                  src={item.image} 
                                  alt={item.alt} 
                                  className="size-full rounded-2xl bg-cover object-cover"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    const loaderDiv = target.nextElementSibling as HTMLElement;
                                    if (loaderDiv) {
                                      loaderDiv.style.display = 'flex';
                                    }
                                  }}
                                />
                                <div 
                                  className="absolute inset-0 rounded-2xl bg-muted/20 backdrop-blur-sm flex items-center justify-center" 
                                  style={{ display: 'none' }}
                                >
                                  <Loader className="size-12 text-muted-foreground animate-spin" />
                                </div>
                              </>
                            ) : (
                              <div className="size-full rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                                {item.icon && (
                                  <img 
                                    src={item.icon} 
                                    alt={`${item.title} logo`}
                                    className="size-24 rounded-full object-cover shadow-lg"
                                    onError={(e) => {
                                      const target = e.currentTarget;
                                      target.style.display = 'none';
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          {item.image && (
                            <div className="absolute inset-0 p-8">
                              <p className="text-sm font-semibold text-background/50">
                                <span className="mr-1 text-background">{item.title}.</span>{item.description}
                              </p>
                            </div>
                          )}
                          {item.image && (
                            <div className="absolute top-4 right-4 flex gap-2">
                              {item.icon && (
                                <img 
                                  src={item.icon} 
                                  alt={`${item.title} icon`}
                                  className="size-8 rounded-full object-cover border-2 border-white/20"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                  }}
                                />
                              )}
                              {item.icon2 && itemUrl !== '#' && (
                              <a 
                                href={itemUrl}
                                className="flex items-center justify-center size-8 rounded-full bg-white/20 backdrop-blur border border-white/30 hover:bg-white/30 transition-all"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <div className="text-white size-4 flex items-center justify-center">
                                  {item.icon2}
                                </div>
                              </a>
                              )}
                            </div>
                          )}
                        </div>
                      </ItemWrapper>
                    </div>
                  );
                })}
              </div>
              {/* Mobile arrows directly under the image, aligned to the right */}
            
            </div>
          </div>
          <div className="mt-8 flex items-center lg:ml-[50%]">
            {carouselItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                disabled={loading}
                className={`${index === currentIndex ? 'flex h-10 items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300 w-40' : 'flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300 m-4 size-4'}`}
              >
                <span className={`${index === currentIndex ? 'inline-block transition-all duration-300 translate-x-0 opacity-100' : 'inline-block transition-all duration-300 translate-x-6 opacity-0'}`}>{item.title}</span>
              </button>
            ))}
            {/* Mobile arrows inline with indicators, aligned right */}
            <div className="ml-auto md:hidden flex items-center gap-2">
              <button
                aria-label="Previous slide"
                onClick={goToPrevious}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full size-8 bg-background/80 backdrop-blur border border-border shadow-xs text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
              >
              <ChevronLeft  className='size-4'/>              
              </button>
              <button
                aria-label="Next slide"
                onClick={goToNext}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full size-8 bg-background/80 backdrop-blur border border-border shadow-xs text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
              >
          <ChevronRight  className='size-4'/>              
           </button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}