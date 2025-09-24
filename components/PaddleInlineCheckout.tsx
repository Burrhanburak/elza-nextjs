'use client'

import React, { useEffect, useState } from 'react'

interface PaddleInlineCheckoutProps {
  priceId: string
  title: string
  price: number
  type: 'book' | 'poem'
  productId: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    Paddle: any
  }
}

const PaddleInlineCheckout: React.FC<PaddleInlineCheckoutProps> = ({
  priceId,
  title,
  price,
  type,
  productId,
  onSuccess,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    // Paddle.js yüklendiğinde çalışacak
    const checkPaddle = () => {
      if (window.Paddle) {
        setIsLoaded(true)
        setupPaddleEvents()
      } else {
        setTimeout(checkPaddle, 100)
      }
    }

    checkPaddle()
  }, [])

  const setupPaddleEvents = () => {
    if (!window.Paddle) return

    // Paddle.js v2'de event listener'lar farklı çalışıyor
    // Event'ları checkout açılırken callback olarak geçeceğiz
    console.log('Paddle events setup completed')
  }

  const openCheckout = () => {
    if (!window.Paddle || !isLoaded) {
      onError?.('Paddle is not loaded')
      return
    }

    try {
      const items = [
        {
          priceId: priceId,
          quantity: 1,
          // Dinamik fiyat override
          price: {
            amount: (price * 100).toString(), // Paddle cents kullanır
            currency_code: 'TRY'
          },
          // Ürün bilgileri
          name: title,
          description: `${type === 'book' ? 'Kitap' : 'Şiir'} - ${title}`,
          image_url: '', // İsteğe bağlı: cover image URL'i
          custom_data: {
            purchasable_type: type,
            purchasable_id: productId.toString(),
            title: title,
            price: price.toString()
          }
        }
      ]

      const customData = {
        purchasable_type: type,
        purchasable_id: productId.toString(),
        title: title,
        price: price.toString()
      }

      // Overlay checkout aç (en basit format)
      window.Paddle.Checkout.open({
        items: items,
        customData: customData,
        eventCallback: (data: any) => {
          console.log('Paddle event:', data)
          if (data.event === 'checkout.completed') {
            console.log('Checkout completed:', data)
            setIsCheckoutOpen(false)
            onSuccess?.()
          } else if (data.event === 'checkout.closed') {
            console.log('Checkout closed')
            setIsCheckoutOpen(false)
          } else if (data.event === 'checkout.error') {
            console.error('Checkout error:', data)
            onError?.(data.error?.message || 'Checkout failed')
          }
        }
      })

      setIsCheckoutOpen(true)
    } catch (error: any) {
      console.error('Error opening checkout:', error)
      onError?.(error.message || 'Failed to open checkout')
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Loading checkout...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Checkout Açma Butonu */}
      {!isCheckoutOpen && (
        <button
          onClick={openCheckout}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Satın Al - {price.toFixed(2)} TL
        </button>
      )}

      {/* Overlay Checkout - Container gerekmez */}

      {/* Checkout Kapatma Butonu */}
      {isCheckoutOpen && (
        <button
          onClick={() => {
            if (window.Paddle) {
              window.Paddle.Checkout.close()
            }
            setIsCheckoutOpen(false)
          }}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Checkout'u Kapat
        </button>
      )}
    </div>
  )
}

export default PaddleInlineCheckout
