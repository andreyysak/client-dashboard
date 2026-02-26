import { ReactNode, useEffect, useState } from 'react'
import { LanguageProvider } from './LanguageProvider'
import { ThemeProvider } from './ThemeProvider'
import { LayoutProvider } from './LayoutProvider'
import { QueryProvider } from './QueryProvider'
import { useAppStore } from '@/app/store/useAppStore'
import Loader from '@/widgets/Loader'

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const unsub = useAppStore.persist.onHydrate(() => setIsHydrated(false))
    const unsubFinish = useAppStore.persist.onFinishHydration(() => setIsHydrated(true))

    if (useAppStore.persist.hasHydrated()) {
      setIsHydrated(true)
    }

    return () => {
      unsub()
      unsubFinish()
    }
  }, [])

  if (!isHydrated) return <Loader />

  return (
    <QueryProvider>
      <LanguageProvider>
        <ThemeProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryProvider>
  )
}
