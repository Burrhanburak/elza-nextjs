import HeroSection from "@/components/Hero-section";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import BentoGrid from "@/components/Bento-grid";
import HeroAlt from "@/components/HeroAlt";
import Testimonial from "@/components/Testimional";
import ModernCarousel from "@/components/ModernCarousel";
import { AppleCardsCarouselDemo } from "@/components/Slidehome";
import SectionThree from "@/components/SectionThree";
import FeaturesSection from "@/components/FeaturesSection";
import RecentBlogsSection from "@/components/RecentBlogsSection";
import { getDictionary } from "./dictionaries";
import type { Metadata } from "next";
// import { HeaderSectionTwo } from "@/components/Header-section-two";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const metaTitles = {
    en: "Elza Darya - Professional Life Coach & Bioenergy Therapist | Transform Your Life",
    tr: "Elza Darya - Profesyonel Yaşam Koçu ve Biyoenerji Terapisti | Hayatınızı Dönüştürün",
    ru: "Эльза Дарья - Профессиональный Лайф-коуч и Биоэнергетический Терапевт",
    az: "Elza Darya - Peşəkar Həyat Koçu və Bioenergetik Terapevt"
  };

  const metaDescriptions = {
    en: "Transform your life with professional life coaching and bioenergy therapy services by certified practitioner Elza Darya. Personal development, wellness, and holistic healing.",
    tr: "Sertifikalı uygulayıcı Elza Darya ile profesyonel yaşam koçluğu ve biyoenerji terapi hizmetleri. Kişisel gelişim, sağlık ve holistik iyileşme.",
    ru: "Преобразите свою жизнь с помощью профессионального лайф-коучинга и биоэнергетической терапии от сертифицированного практика Эльзы Дарья.",
    az: "Sertifikatlı praktik Elza Darya ilə peşəkar həyat koçluğu və bioenergetik terapiya xidmətləri. Şəxsi inkişaf və holistik sağlamlıq."
  };

  const keywords = {
    en: "life coach, bioenergy therapy, personal development, wellness coaching, holistic healing, stress management, life transformation, spiritual growth",
    tr: "yaşam koçu, biyoenerji terapisi, kişisel gelişim, sağlık koçluğu, holistik iyileşme, stres yönetimi, yaşam dönüşümü, ruhsal gelişim",
    ru: "лайф коуч, биоэнергетическая терапия, личностное развитие, велнес коучинг, холистическое исцеление, управление стрессом",
    az: "həyat koçu, bioenergetik terapiya, şəxsi inkişaf, sağlamlıq koçluğu, holistik sağalma, stress idarəetmə"
  };

  return {
    title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
    description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    metadataBase: new URL('https://elazadarya.com'),
    alternates: {
      canonical: `https://elazadarya.com/${locale}`,
      languages: {
        'en': '/en',
        'tr': '/tr', 
        'ru': '/ru',
        'az': '/az',
        'x-default': '/en'
      }
    },
    openGraph: {
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      url: `https://elazadarya.com/${locale}`,
      siteName: 'Elza Darya',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/elza-darya-logo.jpeg',
          width: 1200,
          height: 630,
          alt: 'Elza Darya - Professional Life Coach & Bioenergy Therapist'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitles[locale as keyof typeof metaTitles] || metaTitles.en,
      description: metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en,
      images: ['/elza-darya-logo.jpeg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as 'en' | 'tr' | 'ru' | 'az');
  
  // JSON-LD Schema for Home Page
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Elza Darya",
    "url": `https://elazadarya.com/${locale}`,
    "description": "Professional life coach and bioenergy therapist providing wellness and personal development services",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://elazadarya.com/${locale}/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://instagram.com/elzadarya",
      "https://facebook.com/elzadarya"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Elza Darya",
    "jobTitle": "Professional Life Coach & Bioenergy Therapist",
    "description": "Certified life coach and bioenergy therapist helping individuals transform their lives through holistic wellness approaches",
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
    ],
    "sameAs": [
      "https://instagram.com/elzadarya",
      "https://facebook.com/elzadarya"
    ]
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      <HeroSection locale={locale} />
      {/* <HeaderSectionTwo /> */}
        <AppleCardsCarouselDemo locale={locale} />
        <HeroAlt locale={locale} />
          

        <ModernCarousel 
          locale={locale}
          fetchBooks={true}
          fetchPoems={true}
          dict={dict}
        />

        <SectionThree />

      <BentoGrid dict={dict} />

      <FeaturesSection />
      
      <RecentBlogsSection/>


      <Testimonial />

        <Faq />
        <Cta />
    </>
  );
}
