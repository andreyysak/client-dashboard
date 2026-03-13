import { create } from 'zustand'

interface MovieState {
  loading: boolean
  setLoading: (value: boolean) => void
}

export const useMoviesStore = create<MovieState>((set) => ({
  loading: false,
  setLoading: (loading) => set({loading})
}))