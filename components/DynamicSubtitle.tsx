/**
 * Dynamic Subtitle Component
 * Location-aware subtitle for better SEO and user experience
 */

'use client';

import { useState, useEffect } from 'react';
import { DynamicH1Generator, type LocationData } from '@/lib/geo-location';
import { useTranslations } from 'next-intl';

interface DynamicSubtitleProps {
  locale: string;
  fallbackCity?: string;
  className?: string;
  staticSubtitle?: string;
}

export default function DynamicSubtitle({ 
  locale, 
  fallbackCity = 'Istanbul',
  className = '',
  staticSubtitle = ''
}: DynamicSubtitleProps) {
  const [dynamicSubtitle, setDynamicSubtitle] = useState<string>(staticSubtitle);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('hero');

  useEffect(() => {
    generateDynamicSubtitle();
  }, [locale, fallbackCity]);

  const generateDynamicSubtitle = async () => {
    try {
      // Use wellness message from translations
      const wellnessMessage = t('wellness');
      setDynamicSubtitle(wellnessMessage);
    } catch (error) {
      console.warn('Dynamic subtitle generation failed:', error);
      // Keep static subtitle
    } finally {
      setIsLoading(false);
    }
  };


  // Show loading state or static subtitle while detecting location
  if (isLoading && staticSubtitle) {
    return (
      <p className={`transition-opacity duration-300 opacity-75 ${className}`}>
        {staticSubtitle}
      </p>
    );
  }

  return (
    <p className={`transition-all duration-500 ease-in-out ${className}`}>
      {dynamicSubtitle || staticSubtitle}
    </p>
  );
}

// Hook for using dynamic subtitle in components (simplified)
export function useDynamicSubtitle() {
  // This hook now just returns the translations
  // Individual components should use useTranslations('hero') directly
  return {
    subtitle: '',
    location: null,
    isLoading: false
  };
}
