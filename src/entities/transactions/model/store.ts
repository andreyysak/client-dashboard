import { create } from 'zustand'
import { TransactionTab } from '@/entities/transactions/model/type.ts'

interface TransactionState {
  selectedTab: TransactionTab
  setSelectedTab: (selectedTab: TransactionTab) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  selectedTab: 'all',
  setSelectedTab: (selectedTab) => set({ selectedTab }),
}))
