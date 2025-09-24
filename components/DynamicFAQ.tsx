/**
 * Dynamic FAQ Component
 * AI-optimized FAQ system with conversational questions
 */

'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
import { GEOPageConfig, GEOContentGenerator, type FAQItem } from '@/lib/geo-content';
import { useLocale, useTranslations } from 'next-intl';


interface DynamicFAQProps {
  config: GEOPageConfig;
  customFAQs?: FAQItem[];
  maxItems?: number;
  showSearch?: boolean;
  className?: string;
}

export default function DynamicFAQ({ 
  config, 
  customFAQs = [], 
  maxItems = 8,
  showSearch = false,
  className = ''
}: DynamicFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const locale = useLocale();
  const t = useTranslations('dynamicFAQ');

  const contentGenerator = new GEOContentGenerator(config.locale);
  
  // Generate dynamic FAQs based on page configuration
  const dynamicFAQs = contentGenerator.generateDynamicFAQ(config);
  
  // Combine custom and dynamic FAQs
  const allFAQs = [...customFAQs, ...dynamicFAQs].slice(0, maxItems);
  
  // Filter FAQs based on search term
  const filteredFAQs = searchTerm
    ? allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFAQs;

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const serviceName = config.service ? 
    config.service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
    'Our Services';

  const locationText = config.city ? ` in ${config.city}` : '';

  if (filteredFAQs.length === 0) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('subtitle', { serviceName, locationText })}
          </p>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={t('searchButton')}
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#d8e3cf] rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#d8e3cf] focus:outline-none focus:bg-[#d8e3cf] transition-colors"
                aria-expanded={openItems.has(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.has(index) ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.category && (
                      <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t('noResults', { searchTerm })}
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              {t('clearSearch')}
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-[#006241] rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4">
              {t('stillHaveQuestions')}
            </h3>
            <p className="text-white mb-6">
              {t('cantFindAnswer')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`/${locale}/contact`} className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                {t('contactDirectly')}
              </a>
             
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Standalone FAQ item for embedding
export function FAQItem({ 
  question, 
  answer, 
  isOpen, 
  onToggle,
  category 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onToggle: () => void;
  category?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 leading-relaxed">
              {answer}
            </p>
            {category && (
              <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {category}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
