import { User } from '@/entities/user/model/User'
import { Garage } from '@/entities/garage'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserStore {
  user: User | null
  selectedCar: Garage | null
  isLoading: boolean

  setUser: (user: User | null) => void
  setSelectedCar: (car: Garage | null) => void
  setLoading: (isLoading: boolean) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        selectedCar: null,
        isLoading: false,

        setUser: (user) => set({ user, isLoading: false }),

        setSelectedCar: (car) => set({ selectedCar: car }),

        setLoading: (isLoading) => set({ isLoading }),

        clearUser: () =>
          set({
            user: null,
            selectedCar: null,
            isLoading: false,
          }),
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
)
