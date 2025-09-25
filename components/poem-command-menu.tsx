'use client'

import React from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './ui/command'
import { poemApi, Poem } from '../lravel-api'
import { useParams, useRouter } from 'next/navigation'

interface PoemCommandMenuProps {
  onSearch?: (query: string) => void;
}

export function PoemCommandMenu({ onSearch }: PoemCommandMenuProps) {
    const [open, setOpen] = React.useState(false)
    const [searchResults, setSearchResults] = React.useState<Poem[]>([])
    const [loading, setLoading] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const params = useParams()
    const router = useRouter()
    const locale = params?.locale as string || 'en'
  
    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])

    const handleSearch = React.useCallback(
      async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setSearchResults([])
          return
        }

        setLoading(true)
        try {
          const response = await poemApi.getPoems({
            search: searchQuery,
            per_page: 5,
            language: locale
          })
          setSearchResults(response.data)
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
        } finally {
          setLoading(false)
        }
      },
      [locale]
    )

    React.useEffect(() => {
      const debounceTimer = setTimeout(() => {
        if (query) {
          handleSearch(query)
        } else {
          setSearchResults([])
        }
      }, 300)

      return () => clearTimeout(debounceTimer)
    }, [query, handleSearch])

    const handlePoemSelect = (poem: Poem) => {
      router.push(`/${locale}/poems/${poem.slug}`)
      setOpen(false)
    }

    const handleQuickSearch = (searchTerm: string) => {
      if (onSearch) {
        onSearch(searchTerm)
      }
      setOpen(false)
    }
  
    return (
      <div>
        {/* Trigger Button */}
        <button 
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors w-full h-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="text-gray-500">Şiirlerde ara... </span>
          <div className="ml-auto flex gap-1">
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded">K</kbd>
          </div>
        </button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput 
            placeholder="Şiirlerde ara..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? "Aranıyor..." : "Sonuç bulunamadı."}
            </CommandEmpty>
            
            {searchResults.length > 0 && (
              <CommandGroup heading="Şiirler">
                {searchResults.map((poem) => (
                  <CommandItem 
                    key={poem.id}
                    onSelect={() => handlePoemSelect(poem)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{poem.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(poem.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            <CommandSeparator />
            
            <CommandGroup heading="Hızlı Eylemler">
              <CommandItem onSelect={() => handleQuickSearch('recent')}>
                Son Şiirler
              </CommandItem>
              <CommandItem onSelect={() => handleQuickSearch('featured')}>
                Öne Çıkan Şiirler
              </CommandItem>
              <CommandItem onSelect={() => router.push(`/${locale}/poems`)}>
                Tüm Şiirleri Görüntüle
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    )
  }