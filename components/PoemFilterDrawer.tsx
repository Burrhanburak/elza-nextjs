'use client'

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

interface PoemFilterDrawerProps {
  onFilter?: (filters: { language?: string; search?: string }) => void;
}

export default function PoemFilterDrawer({ onFilter }: PoemFilterDrawerProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params?.locale as string || 'en';
  
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
    { value: 'ru', label: 'Русský' },
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
    
    const newUrl = `/${locale}/poems${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
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
    router.push(`/${locale}/poems`);
    
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
          Filtrele
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Şiirleri Filtrele</DrawerTitle>
            <DrawerDescription>
              Şiirleri dile göre filtreleyin ve belirli içerik arayın.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="search">Ara</Label>
              <Input 
                id="search" 
                placeholder="Şiirlerde ara..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Dil</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Dil seçin" />
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
            <Button onClick={handleApplyFilter}>Filtreleri Uygula</Button>
            <Button onClick={handleClearFilters} variant="outline">
              Filtreleri Temizle
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">İptal</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}