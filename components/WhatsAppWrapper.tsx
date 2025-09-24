'use client';

import { usePathname } from 'next/navigation';
import WhatsAppWidget from './WhatsAppWidget';
interface WhatsAppWidgetProps {
    service: 'books' | 'poems' | 'bioenergy' | 'biotherapist';
  }
export default function WhatsAppWrapper( { service }: WhatsAppWidgetProps ) {
  const pathname = usePathname();

  let serviceType: 'books' | 'poems' | 'bioenergy' | 'biotherapist' = service;

  if (pathname.includes('poems')) serviceType = 'poems';
  else if (pathname.includes('bioenergy')) serviceType = 'bioenergy';
  else if (pathname.includes('biotherapist')) serviceType = 'biotherapist';
  
  return <WhatsAppWidget service={serviceType} />;
}
