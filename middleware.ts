import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'tr','ru', 'az'];
const defaultLocale = 'en';

function getLocaleFromRequest(request: NextRequest): string {
  const url = new URL(request.url);

// 1. ÖNCELİK: YERELDE TEST için URL parametresi
const overrideCountry = url.searchParams.get('country');
if (overrideCountry) {
  const country = overrideCountry.toUpperCase();
  console.log('🎯 URL Override detected:', country);
  if (country === 'TR') return 'tr';
  if (country === 'RU') return 'ru';
  if (country === 'AZ') return 'az';
  if (['US', 'GB', 'CA'].includes(country)) return 'en';
}

  // 2. ÖNCELİK: CANLI ORTAM için Vercel coğrafi IP başlığı
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  if (vercelCountry) {
    const country = vercelCountry.toUpperCase();
    console.log('🌍 Vercel Country detected:', country);
    if (country === 'TR') return 'tr';
    if (country === 'RU') return 'ru';
    if (country === 'AZ') return 'az';
    if (['US', 'GB', 'CA'].includes(country)) return 'en';
  }

  // 3. ÖNCELİK: Geri dönüş olarak tarayıcı dili
  const acceptLanguage = request.headers.get('accept-language') || '';
  console.log('🗣️ Accept-Language:', acceptLanguage);
  if (acceptLanguage.startsWith('tr')) return 'tr';
  if (acceptLanguage.startsWith('ru')) return 'ru';
  if (acceptLanguage.startsWith('az')) return 'az';
  if (['US', 'GB', 'CA'].includes(acceptLanguage)) return 'en';
  return 'en';
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip locale detection for API routes and static files
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.') ||
      pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }
  
  // For the root path, redirect based on geo-detection
  if (pathname === '/') {
    const detectedLocale = getLocaleFromRequest(request);
    console.log('🔀 Redirecting root to locale:', detectedLocale);
    
    const redirectUrl = new URL(`/${detectedLocale}`, request.url);
    
    // Preserve URL parameters
    const overrideCountry = request.nextUrl.searchParams.get('country');
    if (overrideCountry) {
      redirectUrl.searchParams.set('country', overrideCountry);
    }
    
    return NextResponse.redirect(redirectUrl);
  }
  
  // For paths without locale prefix, redirect to detected locale
  if (!locales.some(locale => pathname.startsWith(`/${locale}`))) {
    const detectedLocale = getLocaleFromRequest(request);
    console.log('🔀 Adding locale prefix:', detectedLocale);
    
    const redirectUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
    
    // Preserve URL parameters
    const overrideCountry = request.nextUrl.searchParams.get('country');
    if (overrideCountry) {
      redirectUrl.searchParams.set('country', overrideCountry);
    }
    
    return NextResponse.redirect(redirectUrl);
  }
  
  // Check for country override and redirect if locale doesn't match
  const overrideCountry = request.nextUrl.searchParams.get('country');
  if (overrideCountry) {
    const country = overrideCountry.toUpperCase();
    let expectedLocale = '';
    
    if (country === 'TR') expectedLocale = 'tr';
    else if (country === 'RU') expectedLocale = 'ru';
    else if (country === 'AZ') expectedLocale = 'az';
    else if (['US', 'GB', 'CA'].includes(country)) expectedLocale = 'en';
    
    if (expectedLocale) {
      const currentLocale = pathname.split('/')[1];
      
      if (currentLocale !== expectedLocale) {
        console.log('🔄 Override redirect: from', currentLocale, 'to', expectedLocale);
        const newUrl = new URL(`/${expectedLocale}`, request.url);
        newUrl.searchParams.set('country', overrideCountry);
        return NextResponse.redirect(newUrl);
      }
    }
  }
  
  // Let next-intl handle the rest
  const response = intlMiddleware(request);
  
  // Add pathname to headers for layout schema generation
  if (response) {
    response.headers.set('x-pathname', pathname);
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
