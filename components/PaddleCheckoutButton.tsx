'use client'

import React, { useState } from 'react'
import { BadgeCheck } from 'lucide-react'

declare global {
  interface Window {
    Paddle: any
  }
}

interface PaddleCheckoutButtonProps {
  type: 'book' | 'poem'
  productId: number
  price?: number
  title?: string
  paddlePriceId?: string
}

const PaddleCheckoutButton: React.FC<PaddleCheckoutButtonProps> = ({ type, productId, price, title, paddlePriceId }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (!paddlePriceId) {
      setError('Price ID bulunamadı.')
      return
    }

    // Email prompt kaldırıldı - Paddle checkout'ta zaten email giriliyor

    setLoading(true)
    setError(null)

    try {
      console.log('Paddle.js v2 checkout - Price ID:', paddlePriceId)
      
      // Paddle checkout (email Paddle'da girilecek)
      if (window.Paddle && window.Paddle.Checkout) {
        window.Paddle.Checkout.open({
          items: [{ 
            price_id: paddlePriceId,
            quantity: 1 
          }],
          custom_data: {
            purchasable_type: type,
            purchasable_id: productId,
            title: title || `${type}-${productId}`,
          }
        })
        console.log('Paddle overlay açıldı')
        setLoading(false)
      } else {
        // Fallback: Direct URL
        const checkoutUrl = `https://checkout.paddle.com/checkout/price/${paddlePriceId}`
        console.log('Fallback URL:', checkoutUrl)
        window.open(checkoutUrl, '_blank')
        setLoading(false)
      }
      
    } catch (err) {
      console.error('Checkout Hatası:', err)
      setError(`Checkout hatası: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`)
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || !paddlePriceId}
        className={`w-full px-4 py-2 rounded-md text-white font-medium transition-colors ${
          loading || !paddlePriceId
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? (
          'Checkout açılıyor...'
        ) : !paddlePriceId ? (
          'Price ID Bulunamadı'
        ) : (
          <div className="flex items-center justify-center gap-2">
            <BadgeCheck className="w-5 h-5" />
            <span>Satın Al{price ? ` - ${price} TL` : ''}</span>
          </div>
        )}
      </button>
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      {!paddlePriceId && (
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700 text-sm">
            Bu ürün için henüz Paddle Price ID tanımlanmamış. Lütfen yönetici ile iletişime geçin.
          </p>
        </div>
      )}
    </div>
  )
}

export default PaddleCheckoutButton
