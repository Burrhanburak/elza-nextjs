import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
        </div>
        
        {/* Error Message */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#006241] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#005a3f] focus:outline-none focus:ring-2 focus:ring-[#006241] focus:ring-offset-2"
          >
            Ana Sayfaya Dön
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Geri Git
          </button>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Yardıma mı ihtiyacınız var?{' '}
            <Link href="/contact" className="text-[#006241] hover:underline">
              İletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
