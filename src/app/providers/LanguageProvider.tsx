import * as React from 'react'
import { createContext, useEffect, useMemo, useState } from 'react'
import { LanguageContextProps } from '@/shared/types/Language.ts'
import { useAppStore } from '@/app/store/useAppStore'
import i18nInstance from '@/shared/config/i18n'

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [isReady, setIsReady] = useState(false)

  const language = useAppStore((state) => state.language)
  const setLanguage = useAppStore((state) => state.setLanguage)

  useEffect(() => {
    const syncLanguage = async () => {
      if (!i18nInstance.isInitialized) {
        await new Promise((resolve) => {
          i18nInstance.on('initialized', resolve)
        })
      }

      if (i18nInstance.language !== language) {
        await i18nInstance.changeLanguage(language)
      }

      document.documentElement.setAttribute('lang', language)
      setIsReady(true)
    }

    syncLanguage()
  }, [language])

  const defaultProps = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  )

  if (!isReady) return null

  return (
    <LanguageContext.Provider value={defaultProps}>{children}</LanguageContext.Provider>
  )
}
