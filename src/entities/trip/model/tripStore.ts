import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  ColumnFiltersState,
  VisibilityState,
  Updater,
  SortingState,
} from '@tanstack/react-table'
import { Trip } from '@/entities/trip'

type View = 'table' | 'cards'

interface TripState {
  isLoading: boolean
  error: boolean
  view: View
  isFormOpen: boolean
  formType: 'create' | 'update'
  currentTrip: Trip | null
  isChartOpen: boolean
  perPage: number
  pageIndex: number
  openDropdown: boolean
  columnVisibility: VisibilityState
  columnFilters: ColumnFiltersState
  sorting: SortingState
  globalFilter: string

  setLoading: (value: boolean) => void
  setError: (value: boolean) => void
  setView: (view: View) => void
  setFormOpen: (value: boolean) => void
  setFormType: (value: 'create' | 'update') => void
  setCurrentTrip: (trip: Trip | null) => void
  setChartOpen: (value: boolean) => void
  setPerPage: (page: number) => void
  setPageIndex: (index: number) => void
  setOpenDropDown: (value: boolean) => void
  setColumnVisibility: (updater: Updater<VisibilityState>) => void
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void
  setSorting: (updater: Updater<SortingState>) => void
  setGlobalFilter: (value: string) => void
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      isLoading: false,
      error: false,
      view: 'table',
      isFormOpen: false,
      formType: 'create',
      currentTrip: null,
      isChartOpen: false,
      perPage: 7,
      pageIndex: 0,
      openDropdown: false,
      columnVisibility: {},
      columnFilters: [],
      sorting: [],
      globalFilter: '',

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setView: (view) => set({ view }),
      setFormOpen: (isFormOpen) => set({ isFormOpen }),
      setFormType: (formType) => set({ formType }),
      setCurrentTrip: (currentTrip) => set({currentTrip}),
      setChartOpen: (isChartOpen) => set({ isChartOpen }),
      setPerPage: (perPage) => set({ perPage }),
      setPageIndex: (pageIndex) => set({ pageIndex }),
      setOpenDropDown: (openDropdown) => set({ openDropdown }),
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
      setGlobalFilter: (value) => set({ globalFilter: value }),
    }),
    {
      name: 'trip-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        view: state.view,
        perPage: state.perPage,
        columnVisibility: state.columnVisibility,
      }),
    },
  ),
)
