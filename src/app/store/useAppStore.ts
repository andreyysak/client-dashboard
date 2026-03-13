import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Theme } from '@/shared/types/Theme.ts'
import { Language } from '@/shared/types/Language.ts'
import { Layout } from '@/shared/types/Layout.ts'

interface AppState {
  token: string | null
  theme: Theme
  language: Language
  isSidebarOpen: boolean
  isMenuOpen: boolean
  isAuthenticated: boolean
  layout: Layout

  setToken: (token: string | null) => void
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  toggleSidebar: () => void
  setMenuOpen: (value: boolean) => void
  authenticate: (token: string) => void
  logout: () => void
  setLayout: (layout: Layout) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: null,
      theme: 'light',
      language: 'ua',
      isSidebarOpen: true,
      isMenuOpen: false,
      isAuthenticated: false,
      layout: 'classic',

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setMenuOpen: (isMenuOpen) => set({isMenuOpen}),

      setLanguage: (language) => set({ language }),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),

      authenticate: (token: string) => {
        set({ isAuthenticated: true, token })
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          isSidebarOpen: true,
        })

        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      },

      setLayout: (layout) => set({ layout }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        theme: state.theme,
        language: state.language,
        layout: state.layout,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
