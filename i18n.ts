import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
const locales = ['en', 'tr', 'ru', 'az'];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale as any)) {
    locale = 'en'; // fallback to default locale
  }

  console.log('🌐 i18n.ts - Processing locale:', locale);

  try {
    const messages = (await import(`./countries/${locale}.json`)).default;
    console.log('🌐 i18n.ts - Successfully loaded messages for:', locale);
    
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error('🌐 i18n.ts - Error loading messages for locale:', locale, error);
    // Ultimate fallback to English
    const fallbackMessages = (await import(`./countries/en.json`)).default;
    return {
      locale: 'en',
      messages: fallbackMessages
    };
  }
});
