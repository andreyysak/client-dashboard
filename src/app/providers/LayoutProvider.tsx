import * as React from 'react'
import { createContext, useMemo } from 'react'
import { LayoutContextProps } from '@/shared/types/Layout.ts'
import { useAppStore } from '@/app/store/useAppStore'

export const LayoutContext = createContext<LayoutContextProps | undefined>(undefined)

interface LayoutProviderProps {
  children: React.ReactNode
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const layout = useAppStore((state) => state.layout)
  const setLayout = useAppStore((state) => state.setLayout)
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen)
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)

  const defaultProps = useMemo(
    () => ({
      layout,
      setLayout,
      isSidebarOpen,
      toggleSidebar,
    }),
    [layout, setLayout, isSidebarOpen, toggleSidebar],
  )

  return <LayoutContext.Provider value={defaultProps}>{children}</LayoutContext.Provider>
}
