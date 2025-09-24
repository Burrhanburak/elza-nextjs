'use client'

import React from 'react'
import { useCart } from '@/components/providers/cart-provider'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CartDrawer() {
  const { state, closeCart, updateQuantity, removeItem, clearCart } = useCart()

  if (!state.isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Sepetim ({state.totalItems})</h2>
            <button
              onClick={closeCart}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {state.items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sepetiniz boş</h3>
                <p className="text-gray-500 mb-6">Kitap ve şiirlerimizi keşfetmeye başlayın</p>
                <div className="space-y-3 w-full">
                  <Link href="/books">
                    <Button 
                      onClick={closeCart}
                      className="w-full bg-[#006241] hover:bg-[#006241]/90"
                    >
                      Kitapları İncele
                    </Button>
                  </Link>
                  <Link href="/poems">
                    <Button 
                      onClick={closeCart}
                      variant="outline" 
                      className="w-full border-[#006241] text-[#006241] hover:bg-[#006241]/10"
                    >
                      Şiirleri İncele
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    {/* Image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      {item.cover_image ? (
                        <img
                          src={item.cover_image.startsWith('http') 
                            ? item.cover_image 
                            : `https://bioenerjist-books.s3.amazonaws.com/${item.cover_image}`}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.type === 'book' ? 'Kitap' : 'Şiir'}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-full p-1 hover:bg-red-100 text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t bg-gray-50 p-6">
              <div className="mb-4">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Toplam</p>
                  <p>${state.totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Kargo ve vergiler dahil değildir.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#006241] hover:bg-[#006241]/90"
                  onClick={() => {
                    // TODO: Implement checkout
                    alert('Checkout functionality will be implemented')
                  }}
                >
                  Satın Al
                </Button>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={closeCart}
                  >
                    Alışverişe Devam
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50" 
                    onClick={clearCart}
                  >
                    Sepeti Temizle
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}