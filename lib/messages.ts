// messages.ts

  

  export type Locale = 'en' | 'tr' | 'az' | 'ru';

export const messages: Record<Locale, any> = {
  en: {
    header: "👋Hi! Chat with us",
    helper: "Customer Support",
    placeholder: "Type your message...",
    button: "Send on WhatsApp",
    defaultMessage: "Hi! I need some help.",
  },
  tr: {
    header: "👋 Merhaba! Bizimle iletişime geçin",
    helper: "Müşteri Temsilcisi",
    placeholder: "Mesajınızı yazın...",
    button: "WhatsApp'tan Gönder",
    defaultMessage: "Merhaba! Yardıma ihtiyacım var.",
  },
  az: {
    header: "👋 Salam! Bizimlə əlaqə saxlayın",
    helper: "Müştəri Xidməti",
    placeholder: "Mesajınızı yazın...",
    button: "WhatsApp ilə göndərin",
    defaultMessage: "Salam! Yardıma ehtiyacım var.",
  },
  ru: {
    header: "👋 Привет! Свяжитесь с нами",
    helper: "Служба поддержки",
    placeholder: "Введите ваше сообщение...",
    button: "Отправить в WhatsApp",
    defaultMessage: "Привет! Мне нужна помощь.",
  },
};

// Tarayıcı dilini al
export function getLocale(): Locale {
  const lang = navigator.language.split("-")[0];
  if (["en", "tr", "az", "ru"].includes(lang)) return lang as Locale;
  return "en";
}
