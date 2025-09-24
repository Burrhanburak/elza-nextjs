'use client'
import { ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BackToTopButton() {
  const t = useTranslations('about.biography')

  return (
    <button
    data-slot="button" 
    className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 has-[>svg]:px-2.5 text-muted-foreground gap-1 text-xs"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="lucide lucide-arrow-up size-3.5" aria-hidden="true" />
      {t('tableOfContents.backToTop')}
    </button>
  )
}
