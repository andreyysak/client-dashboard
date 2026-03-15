import { create } from 'zustand'

interface MovieState {
  loading: boolean
  searchQuery: string

  setLoading: (value: boolean) => void
  setSearchQuery: (value: string) => void
}

export const useMoviesStore = create<MovieState>((set) => ({
  loading: false,
  searchQuery: '',

  setLoading: (loading) => set({ loading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))