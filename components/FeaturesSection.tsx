'use client';

import React from 'react';
import { Plug2, CodeXml, Snowflake, BadgeDollarSign, ArrowRight, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconColor: string;
}


const FeaturesSection = () => {
  const locale = useLocale();
  const t = useTranslations('services.featuresSection');

  const features: FeatureCard[] = [
    {
      icon: <Plug2 className="lucide lucide-plug2 lucide-plug-2" aria-hidden="true" />,
      title: t('services.biotherapy.title'),
      description: t('services.biotherapy.description'),
      iconColor: "text-pink-500",
      href: "/services/biotherapy"
    },
    {
      icon: <CodeXml className="lucide lucide-code-xml" aria-hidden="true" />,
      title: t('services.bioenergy.title'), 
      description: t('services.bioenergy.description'),
      iconColor: "text-green-500",
      href: "/services/bioenergy"
    },
    {
      icon: <Snowflake className="lucide lucide-snowflake" aria-hidden="true" />,
      title: t('services.lifeCoaching.title'),
      description: t('services.lifeCoaching.description'),
      iconColor: "text-sky-500",
      href: "/services/life-coaching"
    },
    {
      icon: <Sun className="lucide lucide-snowflake" aria-hidden="true" />,
      title: t('services.allServices.title'),
      description: t('services.allServices.description'),
      iconColor: "text-orange-500",
      href: "/services"
    },
  ];

  return (
    <section className="overflow-hidden py-32 px-4 container mx-auto">
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <p className="bg-muted rounded-full px-4 py-1 text-xs uppercase">{t('badge')}</p>
        <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-7 lg:text-6xl">
          {t('title')}
        </h2>
        <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
          {t('description')}
        </p>
        <div className="relative mt-10 grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="group relative block h-full w-full p-2">
              <div className="bg-[#006241]/10 relative z-20 h-full gap-2 rounded-3xl p-5 text-center flex flex-col items-center justify-center">
                <div className={`bg-background size-15 mb-4 mt-4 flex items-center justify-center rounded-full p-2 ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <h1 className="text-xl font-medium tracking-tight">{feature.title}</h1>
                <p className="text-muted-foreground text-center text-sm">
                  {feature.description}
                </p>
                <a             
                  href={`/${locale}/${feature.href}`} 
                  data-slot="button" 
                  className="inline-flex items-center  justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3 group/btn mt-8 w-full hover:opacity-50"
                >
{t('readMore')}
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;