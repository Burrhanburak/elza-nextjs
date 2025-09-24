import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel } from 'lucide-react';
import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';

interface CertificateFilterDrawerProps {
  onFilter?: (filters: { language?: string; search?: string }) => void;
}

export default function CertificateFilterDrawer({ onFilter }: CertificateFilterDrawerProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslations('certificatesAndDiplomasPage')
  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get('language') || ''
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [open, setOpen] = useState(false);

  const languages = [
    { value: 'all', label: 'Tüm Diller' },
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
    { value: 'az', label: 'Azərbaycan' }
  ];

  const handleApplyFilter = () => {
    const filters = {
      language: (selectedLanguage && selectedLanguage !== 'all') ? selectedLanguage : undefined,
      search: searchQuery || undefined
    };

    // Update URL with new filters
    const newSearchParams = new URLSearchParams();
    if (filters.language) newSearchParams.set('language', filters.language);
    if (filters.search) newSearchParams.set('search', filters.search);
    
    const newUrl = `/${locale}/about/certificates${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
    router.push(newUrl);

    // Call callback if provided
    if (onFilter) {
      onFilter(filters);
    }

    setOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedLanguage('all');
    setSearchQuery('');
    router.push(`/${locale}/about/certificates`);
    
    if (onFilter) {
      onFilter({});
    }
    
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="h-10">
          <Funnel className="w-4 h-4 mr-2" />
          {t('filterCertificates')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t('filterCertificates')}</DrawerTitle>
            <DrawerDescription>
              {t('filterCertificatesDescription')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="search">{t('searchCertificates')}</Label>
              <Input 
                id="search" 
                placeholder={t('searchCertificates')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">{t('language')}</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleApplyFilter}>{t('applyFilters')}</Button>
            <Button onClick={handleClearFilters} variant="outline">
              {t('clearFilters')}
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">{t('cancel')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}