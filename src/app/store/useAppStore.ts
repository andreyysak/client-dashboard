import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User } from '@/shared/types/User.ts'
import { Theme } from '@/shared/types/Theme.ts'
import { Language } from '@/shared/types/Language.ts'
import { Layout } from '@/shared/types/Layout.ts'

interface AppState {
  user: User | null
  token: string | null
  theme: Theme
  language: Language
  isSidebarOpen: boolean
  isAuthenticated: boolean
  layout: Layout

  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  toggleSidebar: () => void
  authenticate: (token: string) => void
  setLayout: (layout: Layout) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      theme: 'light',
      language: 'ua',
      isSidebarOpen: true,
      isAuthenticated: false,
      layout: 'classic',

      setUser: (user) => set({ user }),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setLanguage: (language) => set({ language }),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),

      authenticate: (token: string) => {
        set({ isAuthenticated: true, token })
      },

      setLayout: (layout) => set({ layout }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
