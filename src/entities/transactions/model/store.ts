import { create } from 'zustand'

interface TransactionState {
  selectedTab: 'all' | 'manual' | 'bank'
  setSelectedTab: (selectedTab: string) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  selectedTab: 'all',
  setSelectedTab: (selectedTab) => set({selectedTab})
}))