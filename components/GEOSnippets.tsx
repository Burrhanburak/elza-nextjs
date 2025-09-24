/**
 * GEO Snippets Component
 * AI-optimized content snippets for better extraction
 */

import { GEOPageConfig, GEOContentGenerator } from '@/lib/geo-content';
import { GEOSnippetGenerator } from '@/lib/geo-schema';

interface GEOSnippetsProps {
  config: GEOPageConfig;
  customSnippets?: {
    [key: string]: string;
  };
  keyBenefits?: {
    title: string;
    items: string[];
  };
  quickAnswerTitle?: string;
}

export default function GEOSnippets({ config, customSnippets = {}, keyBenefits, quickAnswerTitle }: GEOSnippetsProps) {
  const contentGenerator = new GEOContentGenerator(config.locale);
  const snippetContent = contentGenerator.generateSnippetContent(config);
  const localContent = contentGenerator.generateLocalContent(config);
  
  const serviceName = config.service ? 
    config.service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') :
    'Wellness Service';

  const locationText = config.city ? ` in ${config.city}` : '';

  return (
    <div className="space-y-8">
      {/* Quick Answer Section - Primary snippet for AI */}
      <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {quickAnswerTitle || `Quick Answer: What is ${serviceName}?`}
        </h3>
        <p className="text-gray-800 leading-relaxed">
          {customSnippets.quickAnswer || snippetContent.definition}
        </p>
      </section>

      {/* Key Benefits Snippet */}
      <section className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {keyBenefits?.title || `Key Benefits of ${serviceName}${locationText}:`}
        </h3>
        <ul className="grid md:grid-cols-2 gap-2">
          {keyBenefits?.items ? keyBenefits.items.map((benefit, index) => (
            <li key={index} className="flex items-center text-gray-800">
              <span className="text-green-600 mr-2">✓</span>
              {benefit}
            </li>
          )) : (
            <>
              <li className="flex items-center text-gray-800">
                <span className="text-green-600 mr-2">✓</span>
                Stress reduction and emotional balance
              </li>
              <li className="flex items-center text-gray-800">
                <span className="text-green-600 mr-2">✓</span>
                Improved energy levels and vitality
              </li>
              <li className="flex items-center text-gray-800">
                <span className="text-green-600 mr-2">✓</span>
                Enhanced self-awareness and clarity
              </li>
              <li className="flex items-center text-gray-800">
                <span className="text-green-600 mr-2">✓</span>
                Personal growth and transformation
              </li>
              <li className="flex items-center text-gray-800">
                <span className="text-green-600 mr-2">✓</span>
                Holistic approach to wellness
              </li>
              <li className="flex items-center text-gray-800">
                <span className="text-green-600 mr-2">✓</span>
                Professional, certified care
              </li>
            </>
          )}
        </ul>
      </section>

      {/* Process Overview Snippet */}
    


      {/* Local Information (if applicable) */}
   

   

      {/* Contact Snippet */}
      {/* <section className="bg-[#006241] text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">
          Ready to Start Your {serviceName} Journey{locationText}?
        </h3>
        <p className="mb-4 opacity-90">
          Book your consultation today and take the first step toward transformation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Book Consultation
          </button>
          <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
            Call {config.city ? `${config.city} Office` : 'Now'}
          </button>
        </div>
      </section> */}
    </div>
  );
}

// Individual snippet components for flexible use
export function QuickAnswerSnippet({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-800">{GEOSnippetGenerator.generateSnippet(content, 200)}</p>
    </div>
  );
}

export function BenefitsSnippet({ benefits }: { benefits: string[] }) {
  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-3">Key Benefits:</h3>
      <ul className="space-y-1">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-gray-800 text-sm">
            <span className="text-green-600 mr-2">✓</span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProcessSnippet({ steps }: { steps: Array<{ title: string; description: string }> }) {
  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-3">How It Works:</h3>
      <div className="grid gap-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
              {index + 1}
            </div>
            <div>
              <span className="font-semibold text-gray-900">{step.title}: </span>
              <span className="text-gray-700">{step.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
