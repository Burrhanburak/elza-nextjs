


import React from 'react'
import { Files, CircleArrowRight, Settings, ArrowUpRight, Trophy, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const metaTitles = {
    en: "About Elza Darya - Professional Life Coach & Bioenergy Therapist Biography",
    tr: "Elza Darya Hakkında - Profesyonel Yaşam Koçu ve Biyoenerji Terapisti Biyografisi",
    ru: "О Эльзе Дарье - Профессиональный Лайф-коуч и Биоэнергетический Терапевт",
    az: "Elza Darya Haqqında - Peşəkar Həyat Koçu və Bioenergetik Terapevt"
  };

  const metaDescriptions = {
    en: "Learn about Elza Darya's professional journey as a certified life coach and bioenergy therapist. Discover her qualifications, awards, and holistic approach to wellness.",
    tr: "Sertifikalı yaşam koçu ve biyoenerji terapisti Elza Darya'nın profesyonel yolculuğunu keşfedin. Niteliklerini, ödüllerini ve holistik sağlık yaklaşımını öğrenin.",
    ru: "Узнайте о профессиональном пути Эльзы Дарьи как сертифицированного лайф-коуча и биоэнергетического терапевта. Откройте её квалификации и холистический подход.",
    az: "Sertifikatlı həyat koçu və bioenergetik terapevt Elza Daryanın peşəkar səyahətini öyrənin. Onun qualifikasiyalarını və holistik yanaşmasını kəşf edin."
  };

  return {
    title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
    description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
    keywords: `about elza darya, biography, life coach credentials, bioenergy therapist qualifications, professional background, wellness expert`,
    openGraph: {
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      url: `https://elazadarya.com/${locale}/about`,
      type: 'website',
      images: ['/elza-darya-logo.jpeg']
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      images: ['/elza-darya-logo.jpeg']
    },
    alternates: {
      canonical: `https://elazadarya.com/${locale}/about`
    }
  };
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations('about');
  
  // JSON-LD Schema for About Page
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Elza Darya",
    "url": `https://elazadarya.com/${locale}/about`,
    "description": "Professional biography and background of certified life coach and bioenergy therapist Elza Darya",
    "mainEntity": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Professional Life Coach & Bioenergy Therapist",
      "description": "Certified life coach and bioenergy therapist with extensive experience in holistic wellness and personal development",
      "url": `https://elazadarya.com/${locale}`,
      "image": "https://elazadarya.com/elza-darya-logo.jpeg",
      "knowsAbout": [
        "Life Coaching",
        "Bioenergy Therapy",
        "Personal Development", 
        "Holistic Wellness",
        "Stress Management"
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
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      
      <section className="py-32 container mx-auto px-4">
      <div className="container flex flex-col gap-18">
        <div className="flex flex-col gap-7">
          <h1 className="text-4xl font-semibold lg:text-7xl">
            {t('pageSubtitle')}
          </h1>
          <p className="max-w-xl text-lg">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Image 
       
            src="/about-elza.jpg" 
            alt="Elza Darya - bioenergy therapist and life coach - about" 
            className="size-full  rounded-2xl object-cover"
            width={500}
            height={500}
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-5">
            <p className="text-sm text-muted-foreground">{t('mission.badge')}</p>
            <p className="text-lg font-medium">
              {t('mission.title')} {t('mission.description')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              {t('vision.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('vision.description')}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col p-2">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Files className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">{t('sections.biography.title')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('sections.biography.description')}
              </p>
              <Link className='text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2' href="/about/biography"> Read More Biography 
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            </div>
            <div className="flex flex-col p-2">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Users className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">{t('sections.lifeCoaching.title')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('sections.lifeCoaching.description')}
              </p>
              <Link className='text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2' href="/services/life-coaching"> Read More Life Coaching 
              <ArrowUpRight className="w-4 h-4" />
              
            </Link>
              </div>
         

            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <CircleArrowRight className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">{t('sections.certificates.title')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('sections.certificates.description')}
              </p>
              <Link className='text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2' href="/about/certificates-and-diploma"> Read More Certificates and Diplomas 
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            </div>

            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">{t('sections.awards.title')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('sections.awards.description')}
              </p>
              <Link className='text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2' href="/about/awards-achievements"> Read More Awards and Achievements 
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <Settings className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">{t('sections.bioenergy.title')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('sections.bioenergy.description')}
              </p>
              <Link className='text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2' href="/about/bioenergy"> Read More Bioenergy 
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            </div>
            <div className="flex flex-col">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                <BookOpen className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-2 mb-3 text-lg font-semibold">{t('sections.books.title')}</h3>
              <p className="text-muted-foreground mb-2">
                {t('sections.books.description')}
              </p>
              <Link className='text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2' href="/books"> Read More Books 
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-10 text-sm font-medium text-muted-foreground">{t('sections.biography.title').toUpperCase()}</p>
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              {t('biography.pageTitle')}
            </h2>
           
            <Link href="/about/biography" className="text-[#006241]/80 p-2 w-fit bg-[#006241]/10 rounded-lg flex items-center gap-2">Read More 
            <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <Image
                  src="/elza-darya-logo.jpeg" 
              alt="Elza Darya - bioenergy therapist and life coach - about" 
              width={500}
              height={500}
              className="mb-6 max-h-96 w-full rounded-xl object-cover "
            />
            <p className="text-muted-foreground">
              {t('biography.content.intro')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-20">
          <div className="max-w-4xl">
            <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
              {t('whyChoose.title')}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-semibold">{t('whyChoose.provenTrack.title')}</h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.provenTrack.description')}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold">{t('whyChoose.holisticApproach.title')}</h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.holisticApproach.description')}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold">{t('whyChoose.personalizedCare.title')}</h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.personalizedCare.description')}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold">{t('whyChoose.safeEnvironment.title')}</h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.safeEnvironment.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-muted p-10">
          <h2 className="mb-6 text-3xl font-semibold md:text-5xl">
            {t('cta.title')}
          </h2>
          <p className="mb-8 max-w-3xl text-lg text-muted-foreground">
            {t('cta.description')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-lg bg-[#006241] px-8 py-3 text-white transition-colors hover:bg-[#006241]/90"
            >
              {t('cta.startJourney')}
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center justify-center rounded-lg border border-[#006241] px-8 py-3 text-[#006241] transition-colors hover:bg-[#006241]/10"
            >
              {t('cta.exploreServices')}
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default AboutPage