import { User } from '@/entities/user/model/User'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,

        setUser: (user) => set({ user, isLoading: false }),

        setLoading: (isLoading) => set({ isLoading }),

        clearUser: () => set({ user: null, isLoading: false }),
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
)
