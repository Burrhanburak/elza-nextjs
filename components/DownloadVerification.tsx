'use client'

import React, { useState, useEffect } from 'react'
import { downloadApi } from '../lravel-api'
import { Button } from '@/components/ui/button'

interface DownloadVerificationProps {
  type: 'book' | 'poem'
  productId: number
  title: string
}

const DownloadVerification: React.FC<DownloadVerificationProps> = ({
  type,
  productId,
  title
}) => {
  const [email, setEmail] = useState('')
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)

  const checkAccess = async () => {
    if (!email.trim()) {
      setShowEmailInput(true)
      return
    }

    setLoading(true)
    try {
      const response = await downloadApi.verifyAccess(type, productId, email)
      setHasAccess(response.has_access)
      setDownloadUrl(response.download_url)
    } catch (error) {
      console.error('Access verification error:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  }

  // E-posta değiştiğinde erişimi sıfırla
  useEffect(() => {
    setHasAccess(null)
    setDownloadUrl(null)
  }, [email])

  if (showEmailInput) {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="download-email" className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresiniz (Satın alma için kullandığınız e-posta)
          </label>
          <input
            type="email"
            id="download-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={checkAccess}
            disabled={loading || !email.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? 'Kontrol Ediliyor...' : 'Erişimi Kontrol Et'}
          </Button>
          <Button
            onClick={() => setShowEmailInput(false)}
            variant="outline"
          >
            İptal
          </Button>
        </div>
      </div>
    )
  }

  if (hasAccess === null) {
    return null // Hiçbir şey gösterme, sadece satın alma işlemi başladıktan sonra görünsün
  }

  if (hasAccess && downloadUrl) {
    return (
      <div className="space-y-2">
        <Button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          PDF İndir
        </Button>
        <p className="text-sm text-green-600 text-center">
          ✓ Satın alma doğrulandı
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={() => setShowEmailInput(true)}
        variant="outline"
        className="w-full"
      >
        Erişimi Kontrol Et
      </Button>
      <p className="text-sm text-red-600 text-center">
        Bu ürünü satın almadınız veya e-posta adresiniz yanlış
      </p>
    </div>
  )
}

export default DownloadVerification