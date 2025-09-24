import React from 'react'
import { ChevronRight, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const metaTitles = {
    en: "Elza Darya Biography - Professional Life Coach & Bioenergy Therapist Journey",
    tr: "Elza Darya Biyografisi - Profesyonel Yaşam Koçu ve Biyoenerji Terapisti Yolculuğu",
    ru: "Биография Эльзы Дарьи - Путь Профессионального Лайф-коуча и Биоэнергетического Терапевта",
    az: "Elza Darya Tərcümeyi-halı - Peşəkar Həyat Koçu və Bioenergetik Terapevt Səyahəti"
  };

  const metaDescriptions = {
    en: "Discover Elza Darya's inspiring journey from personal transformation to becoming a certified life coach and bioenergy therapist. Learn about her background, training, and healing philosophy.",
    tr: "Elza Darya'nın kişisel dönüşümden sertifikalı yaşam koçu ve biyoenerji terapisti olmaya uzanan ilham verici yolculuğunu keşfedin. Geçmişi, eğitimi ve iyileştirme felsefesi hakkında bilgi edinin.",
    ru: "Откройте для себя вдохновляющий путь Эльзы Дарьи от личной трансформации до становления сертифицированным лайф-коучем и биоэнергетическим терапевтом.",
    az: "Elza Daryanın şəxsi transformasiyadan sertifikatlı həyat koçu və bioenergetik terapevt olmaya qədərki ilhamlı səyahətini kəşf edin."
  };

  return {
    title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
    description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
    keywords: `elza darya biography, life coach journey, bioenergy therapist background, professional transformation, healing philosophy, wellness expert story`,
    openGraph: {
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      url: `https://elazadarya.com/${locale}/about/biography`,
      type: 'article',
      images: ['/ogm.png'],
      authors: ['Elza Darya'],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      images: ['/ogm.png']
    },
    alternates: {
      canonical: `https://elazadarya.com/${locale}/about/biography`
    }
  };
}

const BiographyPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations('about.biography');
  const aboutT = await getTranslations('about');
  
  // JSON-LD Schema for Biography Page
  const biographySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Elza Darya - Professional Biography",
    "author": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Professional Life Coach & Bioenergy Therapist",
      "image": "https://elazadarya.com/elza-darya-logo.jpeg",
      "sameAs": [
        "https://instagram.com/elzadarya",
        "https://facebook.com/elzadarya"
      ],
      "knowsAbout": [
        "Life Coaching",
        "Bioenergy Therapy",
        "Personal Development",
        "Holistic Wellness"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Certified Life Coach"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "name": "Bioenergy Therapy Practitioner"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Elza Darya",
      "logo": "https://elazadarya.com/elza-logo.svg"
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "url": `https://elazadarya.com/${locale}/about/biography`,
    "image": "https://elazadarya.com/elza-darya-logo.jpeg",
    "description": "Professional biography of certified life coach and bioenergy therapist Elza Darya, including her journey, training, and healing philosophy",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://elazadarya.com/${locale}/about/biography`
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(biographySchema) }}
      />
      
      <section className="py-32 container mx-auto px-4">
        <div className="container">
        <nav aria-label="breadcrumb" data-slot="breadcrumb">
          <ol data-slot="breadcrumb-list" className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <Link data-slot="breadcrumb-link" className="hover:text-foreground transition-colors" href="/about">
                {t('breadcrumb.about')}
              </Link>
            </li>
            <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <ChevronRight className="lucide lucide-chevron-right" aria-hidden="true" />
            </li>
            <li data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5">
              <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" className="text-foreground font-normal">
                {t('breadcrumb.biography')}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-9 flex flex-col gap-12 md:gap-20">
          <h1 className="max-w-3xl text-balance text-4xl font-semibold md:text-5xl">
            {t('pageTitle')}
          </h1>
          <div className="flex items-center gap-3">
            <span data-slot="avatar" className="relative flex size-8 shrink-0 overflow-hidden rounded-full border-border border">
              <img data-slot="avatar-image" className="aspect-square size-full" src="/elza-darya-logo.jpeg" alt="Elza Darya" />
            </span>
            <p className="text-sm tracking-tight md:text-base">
              <span className="font-semibold">Elza Darya</span>
              <span className="text-muted-foreground ml-1 font-medium">{t('professional')}</span>
            </p>
          </div>
        </div>

        <div className="relative flex max-w-6xl flex-col-reverse gap-6 lg:mt-32 lg:grid lg:grid-cols-10">
          <div className="lg:col-span-6">
            <img 
              src="/zovpersonal.webp" 
              alt="Elza Darya Journey" 
              className="border-border max-h-96 w-full rounded-xl border object-cover"
            />
            
            <div className="prose prose-h2:scroll-m-10 mt-6">
              <p className='text-gray-700 mb-4'>
                {t('content.intro')}
              </p>

              <h2 className='text-2xl font-bold text-gray-900 mb-6'>{t('content.earlyLife.title')}</h2>
              <p className='text-gray-700 mb-4'>
                {t('content.earlyLife.content1')}
              </p>
              
              <p className='text-gray-700 mb-4'>
                {t('content.earlyLife.content2')}
              </p>

              <img 
                src="/elza-darya-scre.png" 
                alt="Elza Darya Professional Journey" 
                className="border-border max-h-96 w-full rounded-xl border object-cover mb-4"
              />

              <p className='text-gray-700 mb-4'>
                {t('content.turningPoint.content1')}
              </p>

              <ul className='text-gray-700 mb-4'>
                <li className='text-gray-700 mb-4'>
                  <p className='text-gray-700 mb-4'>
                    <strong>{t('content.turningPoint.spiritualAwakening').split(':')[0]}:</strong> {t('content.turningPoint.spiritualAwakening').split(':')[1]}
                  </p>
                </li>
                <li className='text-gray-700 mb-4'>
                  <p className='text-gray-700 mb-4'>
                    <strong>{t('content.turningPoint.personalTransformation').split(':')[0]}:</strong> {t('content.turningPoint.personalTransformation').split(':')[1]}
                  </p>
                </li>
              </ul>

              <h2 className='text-2xl font-bold text-gray-900 mb-6'>{t('content.professionalDevelopment.title')}</h2>
              <p className='text-gray-700 mb-4'>
                {t('content.professionalDevelopment.intro')}
              </p>

              <img 
                src="/green-elza.svg" 
                alt="Elza Darya Training" 
                className="border-border max-h-96 w-full rounded-xl border object-cover mb-4"
              />

              <ul className='text-gray-700 mb-4'>
                <li className='text-gray-700 mb-4'>
                  <p className='text-gray-700 mb-4'>
                    <strong>{t('content.professionalDevelopment.bioenergyTraining').split(':')[0]}:</strong> {t('content.professionalDevelopment.bioenergyTraining').split(':')[1]}
                  </p>
                </li>
                <li className='text-gray-700 mb-4'>
                  <p className='text-gray-700 mb-4'>
                    <strong>{t('content.professionalDevelopment.lifeCoachingCredentials').split(':')[0]}:</strong> {t('content.professionalDevelopment.lifeCoachingCredentials').split(':')[1]}
                  </p>
                </li>
                <li className='text-gray-700 mb-4'>
                  <p className='text-gray-700 mb-4'>
                    <strong>{t('content.professionalDevelopment.continuingEducation').split(':')[0]}:</strong> {t('content.professionalDevelopment.continuingEducation').split(':')[1]}
                  </p>
                </li>
              </ul>

              <h2 className='text-2xl font-bold text-gray-900 mb-6'>{t('content.healingPhilosophy.title')}</h2>
              <p className='text-gray-700 mb-4'>
                {t('content.healingPhilosophy.content1')}
              </p>
              
              <p className='text-gray-700 mb-4'>
                {t('content.healingPhilosophy.content2')}
              </p>

              <h2 className='text-2xl font-bold text-gray-900 mb-6'>{t('content.impactAndMission.title')}</h2>
              <p className='text-gray-700 mb-4'>
                {t('content.impactAndMission.content1')}
              </p>
              
              <p className='text-gray-700 mb-4'>
                {t('content.impactAndMission.content2')}
              </p>
            </div>
          </div>

          <div className="top-6 h-fit lg:sticky lg:col-span-3 lg:col-start-8">
            <div data-orientation="horizontal" role="none" data-slot="separator-root" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-10 block lg:hidden"></div>
            
            <div className="flex flex-col gap-1.5 text-sm lg:text-xs">
              <p className="text-muted-foreground text-xs">{t('tableOfContents.title')}</p>
              <ul>
                <li className="py-1.5 transition-colors duration-200">
                  <Link href="/services/biotherapy" className="block transition-colors duration-200 text-muted-foreground lg:text-primary">
                    {t('tableOfContents.biotherapy')}
                  </Link>
                </li>
                <li className="py-1.5 transition-colors duration-200">
                  <Link href="/services/bioenergy" className="block transition-colors duration-200 text-muted-foreground lg:text-primary">
                    {t('tableOfContents.bioenergy')}
                  </Link>
                </li>
                <li className="py-1.5 transition-colors duration-200">
                  <Link  href="/about/certificates-and-diploma" className="block transition-colors duration-200 text-muted-foreground hover:text-primary">
                   {t('tableOfContents.certificates')}
                  </Link>
                </li>
                <li className="py-1.5 transition-colors duration-200">
                  <Link href="/books" className="block transition-colors duration-200 text-muted-foreground hover:text-primary">
                    {t('tableOfContents.books')}
                  </Link>
                </li>
                <li className="py-1.5 transition-colors duration-200">
                  <Link href="/about/awards-achievements" className="block transition-colors duration-200 text-muted-foreground hover:text-primary">
                    {t('tableOfContents.awards')}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden opacity-0 transition-opacity duration-200 lg:block">
              <div data-orientation="horizontal" role="none" data-slot="separator-root" className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-3"></div>
              <button 
                data-slot="button" 
                className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 text-muted-foreground gap-1 text-xs"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ArrowUp className="lucide lucide-arrow-up size-3.5" aria-hidden="true" />
                {t('tableOfContents.backToTop')}
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-muted p-10 mt-10">
          <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
            {aboutT('cta.title')}
          </h2>
          <p className="mb-8 max-w-3xl text-lg text-muted-foreground">
            {aboutT('cta.description')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-lg bg-[#006241] px-8 py-3 text-white transition-colors hover:bg-[#006241]/90"
            >
              {aboutT('cta.startJourney')}
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center rounded-lg border border-[#006241] px-8 py-3 text-[#006241] transition-colors hover:bg-[#006241]/10"
            >
              {aboutT('cta.exploreServices')}
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default BiographyPage