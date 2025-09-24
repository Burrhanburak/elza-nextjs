import React from 'react'
import { getDictionary } from '../dictionaries'

interface TermsOfServicePageProps {
  params: {
    locale: 'en' | 'tr' | 'ru' | 'az'
  }
}


const page = async ({ params: { locale } }: TermsOfServicePageProps) => {
  const dict = await getDictionary(locale)
  const { termsOfService } = dict

  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-[#006241]/10 via-background to-background py-16 lg:mx-4 dark:from-amber-950">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-4">{termsOfService.title}</h1>
          <p className="text-muted-foreground">{termsOfService.lastUpdated} {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. {termsOfService.sections.acceptance.title}</h2>
              <p>
                {termsOfService.sections.acceptance.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. {termsOfService.sections.services.title}</h2>
              <p className="mb-4">{termsOfService.sections.services.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {termsOfService.sections.services.items.map((item, index) => (
                  <li key={index}><strong>{item.title}</strong> {item.description}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. {termsOfService.sections.medicalDisclaimer.title}</h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="font-semibold mb-2">{termsOfService.sections.medicalDisclaimer.noticeTitle}</p>
                <p>
                  {termsOfService.sections.medicalDisclaimer.content}
                </p>
              </div>
            </div>

            {termsOfService.sections.digitalProducts && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">4. {termsOfService.sections.digitalProducts.title}</h2>
                <h3 className="text-xl font-semibold mb-2">4.1 {termsOfService.sections.digitalProducts.booksPoetry.title}</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {termsOfService.sections.digitalProducts.booksPoetry.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mb-2">4.2 {termsOfService.sections.digitalProducts.refundPolicy.title}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {termsOfService.sections.digitalProducts.refundPolicy.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {termsOfService.sections.sessions && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">5. {termsOfService.sections.sessions.title}</h2>
                <h3 className="text-xl font-semibold mb-2">5.1 {termsOfService.sections.sessions.booking.title}</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {termsOfService.sections.sessions.booking.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold mb-2">5.2 {termsOfService.sections.sessions.cancellation.title}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {termsOfService.sections.sessions.cancellation.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {termsOfService.sections.intellectualProperty && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">6. {termsOfService.sections.intellectualProperty.title}</h2>
                <p className="mb-4">
                  {termsOfService.sections.intellectualProperty.intro}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  {termsOfService.sections.intellectualProperty.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {termsOfService.sections.userConduct && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">7. {termsOfService.sections.userConduct.title}</h2>
                <p className="mb-4">{termsOfService.sections.userConduct.intro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {termsOfService.sections.userConduct.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {termsOfService.sections.payment && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">8. {termsOfService.sections.payment.title}</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {termsOfService.sections.payment.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {termsOfService.sections.privacy && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">9. {termsOfService.sections.privacy.title}</h2>
                <p>
                  {termsOfService.sections.privacy.content}
                </p>
              </div>
            )}

            {termsOfService.sections.liability && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">10. {termsOfService.sections.liability.title}</h2>
                <p>
                  {termsOfService.sections.liability.content}
                </p>
              </div>
            )}

            {termsOfService.sections.termination && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">11. {termsOfService.sections.termination.title}</h2>
                <p>
                  {termsOfService.sections.termination.content}
                </p>
              </div>
            )}

            {termsOfService.sections.changesTerms && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">12. {termsOfService.sections.changesTerms.title}</h2>
                <p>
                  {termsOfService.sections.changesTerms.content}
                </p>
              </div>
            )}

            {termsOfService.sections.contactInfo && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">13. {termsOfService.sections.contactInfo.title}</h2>
                <p>
                  {termsOfService.sections.contactInfo.content}
                </p>
              </div>
            )}

            <div className="bg-muted/50 p-6 rounded-lg mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>{termsOfService.sections.credentials.title}</strong> {termsOfService.sections.credentials.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page