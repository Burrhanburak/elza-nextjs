'use client'

import React from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './ui/command'
import { blogApi, Blog } from '../lravel-api'
import { useParams, useRouter } from 'next/navigation'

interface BlogCommandMenuProps {
  onSearch?: (query: string) => void;
}

export function BlogCommandMenu({ onSearch }: BlogCommandMenuProps) {
    const [open, setOpen] = React.useState(false)
    const [searchResults, setSearchResults] = React.useState<Blog[]>([])
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
          const response = await blogApi.getBlogs({
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

    const handleBlogSelect = (blog: Blog) => {
      router.push(`/${locale}/blog/${blog.slug}`)
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
          <span className="text-gray-500">Search blogs... </span>
          <div className="ml-auto flex gap-1">
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded">K</kbd>
          </div>
        </button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput 
            placeholder="Search blogs..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? "Searching..." : "No results found."}
            </CommandEmpty>
            
            {searchResults.length > 0 && (
              <CommandGroup heading="Blog Posts">
                {searchResults.map((blog) => (
                  <CommandItem 
                    key={blog.id}
                    onSelect={() => handleBlogSelect(blog)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{blog.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(blog.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            <CommandSeparator />
            
            <CommandGroup heading="Quick Actions">
              <CommandItem onSelect={() => handleQuickSearch('recent')}>
                Recent Posts
              </CommandItem>
              <CommandItem onSelect={() => handleQuickSearch('popular')}>
                Popular Posts
              </CommandItem>
              <CommandItem onSelect={() => router.push(`/${locale}/blog`)}>
                View All Blogs
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    )
  }