// messages.ts

  

  export type Locale = 'en' | 'tr' | 'az' | 'ru';

export const messages: Record<Locale, any> = {
  en: {
    header: "👋Hi! Chat with us",
    helper: "Customer Support",
    placeholder: "Type your message...",
    button: "Send on WhatsApp",
    defaultMessage: "Hi! I need some help.",
    services: {
      books: "Hi! I'm interested in your books.",
      poems: "Hi! I'd like to learn about your poems.",
      bioenergy: "Hi! I'm interested in bioenergy therapy.",
      biotherapist: "Hi! I'd like to learn about biotherapy services."
    }
  },
  tr: {
    header: "👋 Merhaba! Bizimle iletişime geçin",
    helper: "Müşteri Temsilcisi",
    placeholder: "Mesajınızı yazın...",
    button: "WhatsApp'tan Gönder",
    defaultMessage: "Merhaba! Yardıma ihtiyacım var.",
    services: {
      books: "Merhaba! Kitaplarınız hakkında bilgi almak istiyorum.",
      poems: "Merhaba! Şiirleriniz hakkında bilgi almak istiyorum.",
      bioenergy: "Merhaba! Biyoenerji terapisi hakkında bilgi almak istiyorum.",
      biotherapist: "Merhaba! Bioterapi hizmetleri hakkında bilgi almak istiyorum."
    }
  },
  az: {
    header: "👋 Salam! Bizimlə əlaqə saxlayın",
    helper: "Müştəri Xidməti",
    placeholder: "Mesajınızı yazın...",
    button: "WhatsApp ilə göndərin",
    defaultMessage: "Salam! Yardıma ehtiyacım var.",
    services: {
      books: "Salam! Kitablarınız haqqında məlumat almaq istəyirəm.",
      poems: "Salam! Şeirləriniz haqqında məlumat almaq istəyirəm.",
      bioenergy: "Salam! Bioenerji terapiyası haqqında məlumat almaq istəyirəm.",
      biotherapist: "Salam! Bioterapiya xidmətləri haqqında məlumat almaq istəyirəm."
    }
  },
  ru: {
    header: "👋 Привет! Свяжитесь с нами",
    helper: "Служба поддержки",
    placeholder: "Введите ваше сообщение...",
    button: "Отправить в WhatsApp",
    defaultMessage: "Привет! Мне нужна помощь.",
    services: {
      books: "Привет! Я интересуюсь вашими книгами.",
      poems: "Привет! Хотел бы узнать о ваших стихах.",
      bioenergy: "Привет! Интересуюсь биоэнергетической терапией.",
      biotherapist: "Привет! Хотел бы узнать о услугах биотерапии."
    }
  },
};

// Tarayıcı dilini al
export function getLocale(): Locale {
  const lang = navigator.language.split("-")[0];
  if (["en", "tr", "az", "ru"].includes(lang)) return lang as Locale;
  return "en";
}
