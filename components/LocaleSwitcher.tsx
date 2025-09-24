'use client';

import { useRouter, usePathname } from '../navigation';
import { useLocale } from 'next-intl';
import { locales } from '../navigation';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const localeNames = {
  en: 'EN',
  tr: 'TR',
  ru: 'RU',
  az: 'AZ'
};

const localeFlags = {
  en: '🇺🇸',
  tr: '🇹🇷',
  ru: '🇷🇺',
  az: '🇦🇿'
};

export default function LocaleSwitcher({ isScrolled = false }: { isScrolled?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sayfa yüklendiğinde scroll pozisyonunu geri yükle
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10);
      window.scrollTo(0, scrollY);
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    console.log('🔄 LocaleSwitcher - Current locale:', currentLocale);
    console.log('🔄 LocaleSwitcher - Current pathname:', pathname);
    console.log('🔄 LocaleSwitcher - Switching to locale:', newLocale);
    
    // Mevcut scroll pozisyonunu sessionStorage'a kaydet
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    // next-intl navigation kullanarak locale değiştir
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Desktop Dropdown */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "inline-flex items-center border border-white/20 rounded-md bg-transparent font-semibold text-[#006241]/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300",
            isScrolled 
              ? "px-1 py-1 text-xs" 
              : "px-1 py-2 text-sm"
          )}
        >
          <span className="mr-2">{localeFlags[currentLocale as keyof typeof localeFlags]}</span>
          <span>{localeNames[currentLocale as keyof typeof localeNames]}</span>
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className={`${
                    currentLocale === locale
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  } group flex items-center w-full px-4 py-2 text-sm`}
                >
                  <span className="mr-3">{localeFlags[locale as keyof typeof localeFlags]}</span>
                  {localeNames[locale as keyof typeof localeNames]}
                  {currentLocale === locale && (
                    <svg className="ml-auto h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Select */}
      <div className="md:hidden">
        <select
          value={currentLocale}
          onChange={(e) => handleLocaleChange(e.target.value)}
          className={cn(
            "appearance-none bg-transparent border border-white/20 rounded-md font-medium text-[#006241]/80 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all duration-300",
            isScrolled 
              ? "px-2 py-1 text-xs" 
              : "px-3 py-2 text-sm"
          )}
        >
          {locales.map((locale) => (
            <option key={locale} value={locale} className="bg-gray-800 text-white">
              {localeFlags[locale as keyof typeof localeFlags]} {localeNames[locale as keyof typeof localeNames]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
