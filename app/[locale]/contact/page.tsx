'use client';

import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Twitter, Linkedin, Facebook, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ContactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  userType: z.enum(["bioenergy", "biotherapy"]).optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [userTypeOpen, setUserTypeOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Generate metadata for contact page
  const metaTitles = {
    en: "Contact Elza Darya - Book Your Wellness Consultation Today",
    tr: "Elza Darya ile İletişime Geçin - Sağlık Danışmanlığınızı Bugün Rezerve Edin",
    ru: "Связаться с Эльзой Дарьей - Забронируйте Консультацию по Здоровью",
    az: "Elza Darya ilə Əlaqə - Sağlamlıq Məsləhətinizi Bu Gün Sifariş Edin"
  };

  const metaDescriptions = {
    en: "Get in touch with professional life coach and bioenergy therapist Elza Darya. Book your wellness consultation for personalized healing and transformation.",
    tr: "Profesyonel yaşam koçu ve biyoenerji terapisti Elza Darya ile iletişime geçin. Kişiselleştirilmiş iyileşme ve dönüşüm için sağlık danışmanlığınızı rezerve edin.",
    ru: "Свяжитесь с профессиональным лайф-коучем и биоэнергетическим терапевтом Эльзой Дарьей. Забронируйте консультацию для персонализированного исцеления.",
    az: "Peşəkar həyat koçu və bioenergetik terapevt Elza Darya ilə əlaqə saxlayın. Fərdiləşdirilmiş sağalma üçün konsultasiyanızı sifariş edin."
  };

  // JSON-LD Schema for Contact Page
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Elza Darya",
    "url": `https://elazadarya.com/${locale}/contact`,
    "description": "Contact page for booking wellness consultations and bioenergy therapy sessions",
    "mainEntity": {
      "@type": "Person",
      "name": "Elza Darya",
      "jobTitle": "Professional Life Coach & Bioenergy Therapist",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@elzadarya.com",
        "contactType": "customer service",
        "availableLanguage": ["en", "tr", "ru", "az"]
      },
      "sameAs": [
        "https://instagram.com/elzadarya",
        "https://facebook.com/elzadarya"
      ]
    }
  };
  
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      userType: undefined,
      message: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof ContactFormSchema>) {
    console.log('📝 Contact form submitted:', values);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          userType: values.userType,
          message: values.message,
          locale
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Email sent successfully:', result);
        setSubmitStatus('success');
        form.reset(); // Clear form after successful submission
      } else {
        console.error('❌ Error sending email:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>{metaTitles[locale as keyof typeof metaTitles] || metaTitles.en}</title>
        <meta name="description" content={metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en} />
        <meta name="keywords" content="contact elza darya, book consultation, wellness appointment, bioenergy therapy booking, life coach contact" />
        <link rel="canonical" href={`https://elazadarya.com/${locale}/contact`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitles[locale as keyof typeof metaTitles] || metaTitles.en} />
        <meta property="og:description" content={metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en} />
        <meta property="og:url" content={`https://elazadarya.com/${locale}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/ogm.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitles[locale as keyof typeof metaTitles] || metaTitles.en} />
        <meta name="twitter:description" content={metaDescriptions[locale as keyof typeof metaDescriptions] || metaDescriptions.en} />
        <meta name="twitter:image" content="/ogm.png" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />
      </Head>
      
      <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-[#006241]/10  via-background to-background py-32 lg:mx-4 dark:from-amber-950">
      <div className="container max-w-2xl mx-auto text-center px-4">
        <h1 className="text-center text-4xl font-semibold tracking-tight lg:text-5xl">
          {t('contact.pageTitle')}
        </h1>
        <p className="mt-4 text-center leading-snug font-medium text-muted-foreground lg:mx-auto">
          {t('contact.pageSubtitle')}
        </p>
        
        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {/* <div>
            <h2 className="font-semibold">{t('contact.offices.istanbul')}</h2>
            <p className="mt-3 text-muted-foreground">
              Online<br />
            </p>
          </div> */}
        
          
          <div>
            <h2 className="font-semibold">{t('contact.sections.email')}</h2>
            <div className="mt-3">
              <div>
                <a 
                  href="mailto:info@elzadarya.com" 
                  className="text-muted-foreground hover:text-foreground"
                >
                  info@elzadarya.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-semibold">{t('contact.sections.follow')}</h2>
            <div className="mt-3 flex gap-6 lg:gap-10 justify-center">
              <a 
                href={t('footer.social.instagram.url')} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
             
              <a 
                href={t('footer.social.facebook.url')} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Facebook className="size-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="relative text-muted-foreground h-px w-full my-12">
          <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>
        
        <div className="mx-auto text-center">
          <h2 className="text-lg font-semibold">{t('contact.sections.inquiries')}</h2>
          
          <Form {...form}>
            <form className="mt-8 space-y-5 text-left" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.fullName')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('contact.form.placeholders.fullName')}
                        {...field}
                        className="h-12 bg-[#f8f9fa] border-none rounded-[15px] text-[rgb(28,39,6)] font-medium placeholder:text-[rgb(28,39,6)]/50 focus:ring-2 focus:ring-[rgb(28,39,6)]/20 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.email')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t('contact.form.placeholders.email')}
                        {...field}
                        className="h-12 bg-[#f8f9fa] border-none rounded-[15px] text-[rgb(28,39,6)] font-medium placeholder:text-[rgb(28,39,6)]/50 focus:ring-2 focus:ring-[rgb(28,39,6)]/20 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Applicant Type Field */}
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.selectApplicantType')}</FormLabel>
                    <FormControl>
                      <Popover open={userTypeOpen} onOpenChange={setUserTypeOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-12 bg-[#f8f9fa] border-none rounded-[15px] text-[rgb(28,39,6)] font-medium justify-between hover:bg-[#f0f1f2] focus:ring-2 focus:ring-[rgb(28,39,6)]/20 transition-all duration-200"
                          >
                            {field.value === "bioenergy" ? t('contact.bioenergy') : 
                             field.value === "biotherapy" ? t('contact.biotherapy') : 
                             t('contact.selectApplicantType')}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full overflow-hidden p-0" align="start">
                          <div className="flex flex-col">
                            <button
                              type="button"
                              className="px-4 py-3 text-left hover:bg-gray-100 transition-colors text-[rgb(28,39,6)] font-medium"
                              onClick={() => {
                                field.onChange("bioenergy");
                                setUserTypeOpen(false);
                              }}
                            >
                              {t('contact.bioenergy')}
                            </button>
                            <button
                              type="button"
                              className="px-4 py-3 text-left hover:bg-gray-100 transition-colors text-[rgb(28,39,6)] font-medium"
                              onClick={() => {
                                field.onChange("biotherapy");
                                setUserTypeOpen(false);
                              }}
                            >
                              {t('contact.biotherapy')}
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                            {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.form.message')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('contact.form.placeholders.message')}
                        {...field}
                        className="min-h-[120px] bg-[#f8f9fa] border-none rounded-[15px] text-[rgb(28,39,6)] font-medium placeholder:text-[rgb(28,39,6)]/50 focus:ring-2 focus:ring-[rgb(28,39,6)]/20 transition-all duration-200 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-[#006241] hover:bg-[#006241]/90 disabled:bg-[#006241]/50 disabled:cursor-not-allowed text-white rounded-[60px] font-medium text-base transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t('contact.sending') || 'Sending...'}
                  </div>
                ) : (
                  t('contact.form.submit')
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="w-full p-4 bg-green-100 border border-green-300 rounded-[15px] text-green-700 text-center font-medium">
                  ✅ {t('contact.successMessage') || 'Message sent successfully! We will get back to you soon.'}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="w-full p-4 bg-red-100 border border-red-300 rounded-[15px] text-red-700 text-center font-medium">
                  ❌ {t('contact.errorMessage') || 'An error occurred while sending the message. Please try again.'}
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
    </>
  );
}
