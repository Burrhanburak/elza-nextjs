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

interface BookFilterDrawerProps {
  onFilter?: (filters: { language?: string; search?: string; min_price?: number; max_price?: number }) => void;
}

export default function BookFilterDrawer({ onFilter }: BookFilterDrawerProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params?.locale as string || 'en';
  const t = useTranslations('booksPage');
  const [selectedLanguage, setSelectedLanguage] = useState(
    searchParams.get('language') || ''
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [minPrice, setMinPrice] = useState(
    searchParams.get('min_price') || ''
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get('max_price') || ''
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
      search: searchQuery || undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined
    };

    // Update URL with new filters
    const newSearchParams = new URLSearchParams();
    if (filters.language) newSearchParams.set('language', filters.language);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.min_price) newSearchParams.set('min_price', filters.min_price.toString());
    if (filters.max_price) newSearchParams.set('max_price', filters.max_price.toString());
    
    const newUrl = `/${locale}/books${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
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
    setMinPrice('');
    setMaxPrice('');
    router.push(`/${locale}/books`);
    
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
          {t('filterBooks')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t('filterBooks')}</DrawerTitle>
            <DrawerDescription>
              {t('filterBooksDescription')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="search">{t('searchBooks')}</Label>
              <Input 
                id="search" 
                placeholder={t('searchBooks')} 
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
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="min-price">{t('minPrice')}</Label>
                <Input 
                  id="min-price" 
                  type="number"
                  placeholder={t('minPrice')} 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-price">{t('maxPrice')}</Label>
                <Input 
                  id="max-price" 
                  type="number"
                  placeholder={t('maxPrice')} 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
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