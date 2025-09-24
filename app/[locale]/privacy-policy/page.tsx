import React from 'react'
import { getDictionary } from '../dictionaries'

interface PrivacyPolicyPageProps {
  params: {
    locale: 'en' | 'tr' | 'ru' | 'az'
  }
}

const page = async ({ params: { locale } }: PrivacyPolicyPageProps) => {
  const dict = await getDictionary(locale)
  const { privacyPolicy } = dict

  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-gradient-to-b from-[#006241]/10 via-background to-background py-16 lg:mx-4 dark:from-amber-950">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl mb-4">{privacyPolicy.title}</h1>
          <p className="text-muted-foreground">{privacyPolicy.lastUpdated} {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. {privacyPolicy.sections.informationWeCollect.title}</h2>
              <p className="mb-4">
                {privacyPolicy.sections.informationWeCollect.intro}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {privacyPolicy.sections.informationWeCollect.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                {privacyPolicy.sections.informationWeCollect.healthInfo}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. {privacyPolicy.sections.howWeUse.title}</h2>
              <p className="mb-4">{privacyPolicy.sections.howWeUse.intro}</p>
              <ul className="list-disc pl-6 space-y-2">
                {privacyPolicy.sections.howWeUse.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. {privacyPolicy.sections.healthPrivacy.title}</h2>
              <p>
                {privacyPolicy.sections.healthPrivacy.content}
              </p>
            </div>

            {privacyPolicy.sections.informationSharing && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">4. {privacyPolicy.sections.informationSharing.title}</h2>
                <p className="mb-4">
                  {privacyPolicy.sections.informationSharing.intro}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  {privacyPolicy.sections.informationSharing.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {privacyPolicy.sections.dataSecurity && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">5. {privacyPolicy.sections.dataSecurity.title}</h2>
                <p>
                  {privacyPolicy.sections.dataSecurity.content}
                </p>
              </div>
            )}

            {privacyPolicy.sections.cookies && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">6. {privacyPolicy.sections.cookies.title}</h2>
                <p>
                  {privacyPolicy.sections.cookies.content}
                </p>
              </div>
            )}

            {privacyPolicy.sections.yourRights && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">7. {privacyPolicy.sections.yourRights.title}</h2>
                <p className="mb-4">{privacyPolicy.sections.yourRights.intro}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {privacyPolicy.sections.yourRights.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {privacyPolicy.sections.thirdParty && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">8. {privacyPolicy.sections.thirdParty.title}</h2>
                <p>
                  {privacyPolicy.sections.thirdParty.content}
                </p>
              </div>
            )}

            {privacyPolicy.sections.changes && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">9. {privacyPolicy.sections.changes.title}</h2>
                <p>
                  {privacyPolicy.sections.changes.content}
                </p>
              </div>
            )}

            {privacyPolicy.sections.contact && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">10. {privacyPolicy.sections.contact.title}</h2>
                <p>
                  {privacyPolicy.sections.contact.content}
                </p>
              </div>
            )}

            <div className="bg-muted/50 p-6 rounded-lg mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>{privacyPolicy.sections.disclaimer.title}</strong> {privacyPolicy.sections.disclaimer.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page