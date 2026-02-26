import * as React from 'react'
import { createContext, useEffect, useMemo } from 'react'
import { ThemeContextProps } from '@/shared/types/Theme.ts'
import { useAppStore } from '@/app/store/useAppStore'

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme: toggleTheme, // Або передай toggleTheme напряму
    }),
    [theme, toggleTheme],
  )

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}
