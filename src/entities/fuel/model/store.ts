import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface FuelState {
  layout: 'table' | 'cards'
  pageIndex: number
  pageSize: number
  setPageIndex: (pageIndex: number) => void
  setPageSize: (pageSize: number) => void
  setLayout: (layout: 'table' | 'cards') => void
}

export const useFuelStore = create<FuelState>()(
  persist(
    (set) => ({
      layout: 'cards',
      pageIndex: 0,
      pageSize: 5,
      setPageIndex: (pageIndex) => set({ pageIndex }),
      setPageSize: (pageSize) => set({ pageSize }),
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: 'fuel',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
