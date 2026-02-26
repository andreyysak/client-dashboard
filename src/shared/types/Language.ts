export type Language = 'en' | 'ua'

export interface LanguageContextProps {
  language: Language
  setLanguage: (language: Language) => void
}
