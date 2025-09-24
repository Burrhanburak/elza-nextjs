/**
 * GEO Location Detection System
 * IP-based city detection for dynamic H1 tags and content
 */

export interface LocationData {
  city: string;
  state: string;
  country: string;
  countryCode: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

export interface DynamicH1Config {
  service: string;
  city: string;
  locale: string;
  pageType: 'service' | 'home' | 'about' | 'contact';
}

export class GEOLocationDetector {
  private static instance: GEOLocationDetector;
  private cache: Map<string, LocationData> = new Map();

  static getInstance(): GEOLocationDetector {
    if (!GEOLocationDetector.instance) {
      GEOLocationDetector.instance = new GEOLocationDetector();
    }
    return GEOLocationDetector.instance;
  }

  // Get location from IP address
  async getLocationFromIP(ip?: string): Promise<LocationData | null> {
    try {
      // Use multiple IP geolocation services for reliability
      const services = [
        this.getLocationFromIPAPI(ip),
        this.getLocationFromIPInfo(ip),
        this.getLocationFromCloudflare(ip)
      ];

      // Try services in order until one succeeds
      for (const service of services) {
        try {
          const result = await service;
          if (result) {
            this.cache.set(ip || 'default', result);
            return result;
          }
        } catch (error) {
          console.warn('GEO service failed:', error);
          continue;
        }
      }

      return this.getDefaultLocation();
    } catch (error) {
      console.error('Location detection failed:', error);
      return this.getDefaultLocation();
    }
  }

  // Primary service: IP-API (free, no API key required)
  private async getLocationFromIPAPI(ip?: string): Promise<LocationData | null> {
    const url = ip ? `http://ip-api.com/json/${ip}` : 'http://ip-api.com/json/';
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'success') {
      return {
        city: data.city,
        state: data.regionName,
        country: data.country,
        countryCode: data.countryCode,
        latitude: data.lat,
        longitude: data.lon,
        timezone: data.timezone
      };
    }

    return null;
  }

  // Secondary service: IPInfo
  private async getLocationFromIPInfo(ip?: string): Promise<LocationData | null> {
    const url = ip ? `https://ipinfo.io/${ip}/json` : 'https://ipinfo.io/json';
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.city && data.region) {
      return {
        city: data.city,
        state: data.region,
        country: data.country,
        countryCode: data.country,
        latitude: data.loc ? parseFloat(data.loc.split(',')[0]) : undefined,
        longitude: data.loc ? parseFloat(data.loc.split(',')[1]) : undefined,
        timezone: data.timezone
      };
    }

    return null;
  }

  // Tertiary service: Cloudflare (if available)
  private async getLocationFromCloudflare(ip?: string): Promise<LocationData | null> {
    try {
      // This would work if using Cloudflare Workers
      // @ts-ignore
      if (typeof CF !== 'undefined' && CF.cf) {
        // @ts-ignore
        const cf = CF.cf;
        return {
          city: cf.city,
          state: cf.region,
          country: cf.country,
          countryCode: cf.colo,
          latitude: cf.latitude,
          longitude: cf.longitude,
          timezone: cf.timezone
        };
      }
    } catch (error) {
      // Cloudflare not available
    }

    return null;
  }

  // Fallback default location
  private getDefaultLocation(): LocationData {
    return {
      city: 'Istanbul',
      state: 'Istanbul',
      country: 'Turkey',
      countryCode: 'TR'
    };
  }

  // Get location from browser (client-side)
  async getLocationFromBrowser(): Promise<LocationData | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const location = await this.reverseGeocode(latitude, longitude);
            resolve(location);
          } catch (error) {
            resolve(null);
          }
        },
        () => resolve(null),
        { timeout: 5000 }
      );
    });
  }

  // Reverse geocoding
  private async reverseGeocode(lat: number, lon: number): Promise<LocationData | null> {
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
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

export class DynamicH1Generator {
  private locationDetector: GEOLocationDetector;

  constructor() {
    this.locationDetector = GEOLocationDetector.getInstance();
  }

  // Generate dynamic H1 based on location and service
  async generateDynamicH1(config: DynamicH1Config, userIP?: string): Promise<string> {
    let detectedLocation: LocationData | null = null;

    // Try to get location from IP if not provided in config
    if (!config.city || config.city === 'auto') {
      detectedLocation = await this.locationDetector.getLocationFromIP(userIP);
    }

    const city = detectedLocation?.city || config.city || 'Istanbul';
    const service = this.getServiceName(config.service, config.locale);
    const currentYear = new Date().getFullYear();

    return this.generateH1Template(config.pageType, service, city, config.locale, currentYear);
  }

  // Generate H1 templates based on page type
  private generateH1Template(
    pageType: string,
    service: string,
    city: string,
    locale: string,
    year: number
  ): string {
    const templates = {
      en: {
        service: `Best ${service} ${city} ${year}`,
        home: `Professional Life Coach & Bioenergy Therapist ${city}`,
        about: `Elza Darya - Professional ${service} ${city}`,
        contact: `Contact ${service} Expert ${city}`
      },
      tr: {
        service: `En İyi ${service} Uzmanı ${city} ${year}`,
        home: `Profesyonel Yaşam Koçu & Biyoenerji Terapisti ${city}`,
        about: `Elza Darya - ${city} ${service} Uzmanı`,
        contact: `${city} ${service} Uzmanı İletişim`
      },
      ru: {
        service: `Лучший ${service} ${city} ${year}`,
        home: `Профессиональный лайф-коуч и биоэнергетик ${city}`,
        about: `Эльза Дарья - ${service} ${city}`,
        contact: `Контакт ${service} ${city}`
      },
      az: {
        service: `Ən Yaxşı ${service} ${city} ${year}`,
        home: `Peşəkar Həyat Koçu və Bioenergetik ${city}`,
        about: `Elza Darya - ${service} ${city}`,
        contact: `${service} Mütəxəssisi ${city}`
      }
    };

    const localeTemplates = templates[locale as keyof typeof templates] || templates.en;
    return localeTemplates[pageType as keyof typeof localeTemplates] || localeTemplates.service;
  }

  // Get localized service names
  private getServiceName(service: string, locale: string): string {
    const serviceNames = {
      en: {
        'bioenergy': 'Bioenergy Therapy',
        'biotherapy': 'Biotherapy',
        'life-coaching': 'Life Coaching',
        'wellness': 'Wellness Services'
      },
      tr: {
        'bioenergy': 'Biyoenerji Terapisi',
        'biotherapy': 'Bioterapi',
        'life-coaching': 'Yaşam Koçluğu',
        'wellness': 'Sağlık ve Yaşam Koçluğu'
      },
      ru: {
        'bioenergy': 'Биоэнергетическая терапия',
        'biotherapy': 'Биотерапия',
        'life-coaching': 'Лайф-коучинг',
        'wellness': 'Велнес услуги'
      },
      az: {
        'bioenergy': 'Bioenerji Terapiyası',
        'biotherapy': 'Bioterapiya',
        'life-coaching': 'Həyat Koçluğu',
        'wellness': 'Sağlamlıq Xidmətləri'
      }
    };

    const localeServices = serviceNames[locale as keyof typeof serviceNames] || serviceNames.en;
    return localeServices[service as keyof typeof localeServices] || service;
  }

  // Get city-specific content variations
  generateCitySpecificContent(city: string, service: string, locale: string): {
    heroDescription: string;
    localBenefits: string[];
    callToAction: string;
  } {
    const content = {
      en: {
        heroDescription: `Experience professional ${service} services in ${city}. Our certified practitioners provide personalized wellness solutions tailored to the unique needs of ${city} residents.`,
        localBenefits: [
          `Convenient ${city} location`,
          `Understanding of local ${city} lifestyle`,
          `Trusted by ${city} community`,
          `Flexible scheduling for ${city} residents`
        ],
        callToAction: `Book Your ${service} Session in ${city} Today`
      },
      tr: {
        heroDescription: `${city}'da profesyonel ${service} hizmetlerini deneyimleyin. Sertifikalı uygulayıcılarımız ${city} sakinlerinin benzersiz ihtiyaçlarına göre kişiselleştirilmiş sağlık çözümleri sunar.`,
        localBenefits: [
          `Uygun ${city} konumu`,
          `Yerel ${city} yaşam tarzını anlama`,
          `${city} topluluğu tarafından güvenilir`,
          `${city} sakinleri için esnek randevu`
        ],
        callToAction: `${city}'da ${service} Seansınızı Bugün Ayırtın`
      }
    };

    const localeContent = content[locale as keyof typeof content] || content.en;
    return localeContent;
  }
}

// Server-side location detection middleware
export async function detectLocationFromRequest(request: Request): Promise<LocationData | null> {
  const detector = GEOLocationDetector.getInstance();
  
  // Get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip');
  
  const ip = cfIP || realIP || forwarded?.split(',')[0] || undefined;
  
  return detector.getLocationFromIP(ip);
}

export default DynamicH1Generator;
