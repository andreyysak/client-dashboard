import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  ColumnFiltersState,
  VisibilityState,
  Updater,
  SortingState,
} from '@tanstack/react-table'

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
  columnVisibility: VisibilityState
  columnFilters: ColumnFiltersState
  sorting: SortingState
  defaultCardListLength: number

  setLayout: (layout: 'table' | 'cards') => void
  setPageIndex: (pageIndex: number) => void
  setPageSize: (pageSize: number) => void
  setFormData: (formData: Partial<FuelState['formData']>) => void
  setFormInputData: (formInputData: Partial<FuelState['formInputData']>) => void
  setColumnVisibility: (updater: Updater<VisibilityState>) => void
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void
  setSorting: (updater: Updater<SortingState>) => void
  setDefaultCardListLength: (defaultCardListLength: number) => void
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
      columnVisibility: {},
      columnFilters: [],
      sorting: [],
      defaultCardListLength: 8,

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
      setColumnVisibility: (updater) =>
        set((state) => ({
          columnVisibility:
            typeof updater === 'function' ? updater(state.columnVisibility) : updater,
        })),
      setColumnFilters: (updater: Updater<ColumnFiltersState>) =>
        set((state) => ({
          columnFilters:
            typeof updater === 'function' ? updater(state.columnFilters) : updater,
        })),
      setSorting: (updater: Updater<SortingState>) =>
        set((state) => ({
          sorting: typeof updater === 'function' ? updater(state.sorting) : updater,
        })),
      setDefaultCardListLength: (defaultCardListLength) => set({ defaultCardListLength }),
    }),
    {
      name: 'fuel',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        layout: state.layout,
        pageSize: state.pageSize,
        columnVisibility: state.columnVisibility,
        columnFilters: state.columnFilters,
        sorting: state.sorting,
      }),
    },
  ),
)
