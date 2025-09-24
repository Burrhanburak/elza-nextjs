import 'server-only'
 
const dictionaries = {
  en: () => import('@/countries/en.json').then((module) => module.default),
  tr: () => import('@/countries/tr.json').then((module) => module.default),
  ru: () => import('@/countries/ru.json').then((module) => module.default),
  az: () => import('@/countries/az.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'tr' | 'ru' | 'az') =>
  dictionaries[locale]()