'use client'

import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/providers/cart-provider'

export function CartIcon() {
  const { state, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative rounded-full p-2 hover:bg-gray-100 transition-colors"
      aria-label="Sepeti aç"
    >
      <ShoppingBag className="h-6 w-6" />
      {state.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#006241] text-xs font-medium text-white flex items-center justify-center">
          {state.totalItems > 9 ? '9+' : state.totalItems}
        </span>
      )}
    </button>
  )
}