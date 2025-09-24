'use client'

import React, { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface FaqItem {
  id: number
  question: string
  answer: string
}

const Faq = () => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const t = useTranslations('faq')

  const faqData: FaqItem[] = useMemo(() => {
    const ids = [1, 2, 3, 4, 5, 6]
    return ids.map((id) => ({
      id,
      question: t(`items.${id}.q` as any),
      answer: t(`items.${id}.a` as any),
    }))
  }, [t])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  return (
    <section 
      id="faq-section" 
      className=" py-20 px-15 md:py-20 md:px-60 max-[809px]:py-12.5 max-[809px]:px-5"
    >
      <div className="max-w-[1160px] mx-auto flex flex-col items-center gap-15 max-[809px]:gap-10">
        <div className="flex flex-col items-center gap-15 w-full max-[809px]:gap-10">
          {/* Title Section */}
          <div className="text-center">
            <div className="mb-4">
              <p className="text-[#206d4e] text-lg font-medium">🤷‍♂️ {t('badge')}</p>
            </div>
            <div>
              <h2 className="text-[rgb(38,14,1)] text-4xl font-bold text-left max-[809px]:text-2xl">
                {t('title')}
              </h2>
            </div>
          </div>

          {/* FAQ Container */}
          <div className="w-full flex flex-col gap-4 items-center">
            {faqData.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    bg-[#d8e3cf] rounded-2xl cursor-pointer transition-all duration-300 p-6 
                    ${item.question.length > 40 ? 'w-full max-w-4xl px-8' : 'w-full max-w-4xl px-6'}
                    ${openItems.includes(item.id) ? 'min-h-fit' : ''}
                  `}
                  onClick={() => toggleItem(item.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleItem(item.id)
                    }
                  }}
                >
                  <div className="flex items-start justify-between min-h-[24px]">
                    <div className="flex-1 pr-4">
                      <h6 className="text-[#206d4e] font-semibold text-base leading-6">
                        {item.question}
                      </h6>
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0">
                      <ChevronDown 
                        className={`
                          w-5 h-5 text-[#206d4e] transition-transform duration-300
                          ${openItems.includes(item.id) ? 'rotate-180' : 'rotate-0'}
                        `}
                      />
                    </div>
                  </div>
                  {openItems.includes(item.id) && (
                    <div className="mt-4 text-[#206d4e] text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq