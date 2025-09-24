/**
 * Dynamic H1 Component
 * IP-based location detection for personalized headings
 */

'use client';

import { useState, useEffect } from 'react';
import { DynamicH1Generator, type DynamicH1Config, type LocationData } from '@/lib/geo-location';

interface DynamicH1Props {
  service?: string;
  pageType: 'service' | 'home' | 'about' | 'contact';
  locale: string;
  fallbackCity?: string;
  className?: string;
  staticH1?: string; // Fallback static H1
}

export default function DynamicH1({ 
  service = 'wellness', 
  pageType, 
  locale, 
  fallbackCity = 'Istanbul',
  className = '',
  staticH1
}: DynamicH1Props) {
  const [dynamicH1, setDynamicH1] = useState<string>(staticH1 || '');
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    generateDynamicH1();
  }, [service, pageType, locale, fallbackCity]);

  const generateDynamicH1 = async () => {
    try {
      const h1Generator = new DynamicH1Generator();
      
      // First, try to get location from browser/client
      const location = await detectClientLocation();
      setUserLocation(location);

      const config: DynamicH1Config = {
        service,
        city: location?.city || fallbackCity,
        locale,
        pageType
      };

      const generatedH1 = await h1Generator.generateDynamicH1(config);
      setDynamicH1(generatedH1);
      
    } catch (error) {
      console.warn('Dynamic H1 generation failed:', error);
      // Keep fallback H1
    } finally {
      setIsLoading(false);
    }
  };

  const detectClientLocation = async (): Promise<LocationData | null> => {
    try {
      // Try multiple methods to detect location
      
      // Method 1: IP-based detection via API route
      const ipResponse = await fetch('/api/geo', { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (ipResponse.ok) {
        const ipLocation = await ipResponse.json();
        if (ipLocation && ipLocation.city) {
          return ipLocation;
        }
      }

      // Method 2: Browser geolocation (requires user permission)
      if (navigator.geolocation) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const location = await reverseGeocode(latitude, longitude);
                resolve(location);
              } catch (error) {
                resolve(null);
              }
            },
            () => resolve(null),
            { timeout: 3000 }
          );
        });
      }

      // Method 3: Timezone-based estimation
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const cityFromTimezone = getCityFromTimezone(timezone);
      if (cityFromTimezone) {
        return {
          city: cityFromTimezone.city,
          state: cityFromTimezone.state,
          country: cityFromTimezone.country,
          countryCode: cityFromTimezone.countryCode
        };
      }

      return null;
    } catch (error) {
      console.warn('Client location detection failed:', error);
      return null;
    }
  };

  const reverseGeocode = async (lat: number, lon: number): Promise<LocationData | null> => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();

      return {
        city: data.city || data.locality,
        state: data.principalSubdivision,
        country: data.countryName,
        countryCode: data.countryCode,
        latitude: lat,
        longitude: lon
      };
    } catch (error) {
      return null;
    }
  };

  const getCityFromTimezone = (timezone: string): LocationData | null => {
    const timezoneMap: { [key: string]: LocationData } = {
      'Europe/Istanbul': { city: 'Istanbul', state: 'Istanbul', country: 'Turkey', countryCode: 'TR' },
      'Europe/London': { city: 'London', state: 'England', country: 'United Kingdom', countryCode: 'GB' },
      'America/New_York': { city: 'New York', state: 'New York', country: 'United States', countryCode: 'US' },
      'America/Los_Angeles': { city: 'Los Angeles', state: 'California', country: 'United States', countryCode: 'US' },
      'Europe/Moscow': { city: 'Moscow', state: 'Moscow', country: 'Russia', countryCode: 'RU' },
      'Asia/Baku': { city: 'Baku', state: 'Baku', country: 'Azerbaijan', countryCode: 'AZ' },
      'Europe/Berlin': { city: 'Berlin', state: 'Berlin', country: 'Germany', countryCode: 'DE' },
      'Europe/Paris': { city: 'Paris', state: 'Île-de-France', country: 'France', countryCode: 'FR' }
    };

    return timezoneMap[timezone] || null;
  };

  // Show loading state or static H1 while detecting location
  if (isLoading && staticH1) {
    return (
      <h1 className={`transition-opacity duration-300 opacity-75 ${className}`}>
        {staticH1}
      </h1>
    );
  }

  return (
    <div className="relative">
      <h1 className={`transition-all duration-500 ease-in-out ${className}`}>
        {dynamicH1 || staticH1}
      </h1>
      
      {/* Optional: Show detected location for debugging */}
      {process.env.NODE_ENV === 'development' && userLocation && (
        <div className="text-xs text-gray-500 mt-2">
          📍 Detected: {userLocation.city}, {userLocation.country}
        </div>
      )}
    </div>
  );
}

// Server-side H1 generation for SSR
export async function generateServerSideH1(
  service: string,
  pageType: string,
  locale: string,
  userIP?: string,
  fallbackCity: string = 'Istanbul'
): Promise<string> {
  try {
    const h1Generator = new DynamicH1Generator();
    
    const config: DynamicH1Config = {
      service,
      city: fallbackCity, // Will be replaced by IP detection
      locale,
      pageType: pageType as any
    };

    return await h1Generator.generateDynamicH1(config, userIP);
  } catch (error) {
    console.warn('Server-side H1 generation failed:', error);
    return `Professional ${service} Services`;
  }
}

// Hook for using dynamic H1 in components
export function useDynamicH1(
  service: string,
  pageType: string,
  locale: string,
  fallbackCity: string = 'Istanbul'
) {
  const [h1, setH1] = useState<string>('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateH1 = async () => {
      try {
        const h1Generator = new DynamicH1Generator();
        
        // Try to detect location
        const ipResponse = await fetch('/api/geo');
        let detectedLocation = null;
        
        if (ipResponse.ok) {
          detectedLocation = await ipResponse.json();
        }

        const config: DynamicH1Config = {
          service,
          city: detectedLocation?.city || fallbackCity,
          locale,
          pageType: pageType as any
        };

        const generatedH1 = await h1Generator.generateDynamicH1(config);
        setH1(generatedH1);
        setLocation(detectedLocation);
        
      } catch (error) {
        console.warn('Dynamic H1 hook failed:', error);
        setH1(`Professional ${service} Services`);
      } finally {
        setIsLoading(false);
      }
    };

    generateH1();
  }, [service, pageType, locale, fallbackCity]);

  return { h1, location, isLoading };
}
