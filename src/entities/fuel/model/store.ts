import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface FuelState {
  layout: 'table' | 'cards'
  pageIndex: number
  pageSize: number
  formData: {
    isOpen: boolean
    type?: 'post' | 'patch'
    id?: number
  }
  formInputData: {
    station: string
    price: number
    liters: number
  }

  setLayout: (layout: 'table' | 'cards') => void
  setPageIndex: (pageIndex: number) => void
  setPageSize: (pageSize: number) => void
  setFormData: (formData: Partial<FuelState['formData']>) => void
  setFormInputData: (formInputData: Partial<FuelState['formInputData']>) => void
}

export const useFuelStore = create<FuelState>()(
  persist(
    (set) => ({
      layout: 'cards',
      pageIndex: 0,
      pageSize: 5,
      formData: {
        isOpen: false,
        type: 'post',
      },
      formInputData: {
        station: '',
        price: 0,
        liters: 0,
      },

      setPageIndex: (pageIndex) => set({ pageIndex }),
      setPageSize: (pageSize) => set({ pageSize }),
      setLayout: (layout) => set({ layout }),
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setFormInputData: (data) =>
        set((state) => ({
          formInputData: { ...state.formInputData, ...data },
        })),
    }),
    {
      name: 'fuel',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
