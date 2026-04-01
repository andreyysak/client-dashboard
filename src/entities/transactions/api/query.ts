import { useQuery } from '@tanstack/react-query'
import { TransactionService } from '@/entities/transactions/api/api.ts'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/shared/api/axios.ts'

export const useTransactions = () => {
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      try {
        return await TransactionService.getAll()
      } catch (e) {
        toast.error(getErrorMessage(e))
        console.error(e)
      }
    },
    placeholderData: (previousData) => previousData,
  })

  const monoTransactionsQuery = useQuery({
    queryKey: ['mono-transactions'],
    queryFn: async () => {
      try {
        return await TransactionService.getAllMono()
      } catch (e) {
        toast.error(getErrorMessage(e))
        console.error(e)
      }
    },
    placeholderData: (previousData) => previousData,
  })

  const manualTransactionsQuery = useQuery({
    queryKey: ['manual-transactions'],
    queryFn: async () => {
      try {
        return await TransactionService.getAllManual()
      } catch (e) {
        toast.error(getErrorMessage(e))
        console.error(e)
      }
    },
    placeholderData: (previousData) => previousData,
  })

  return {
    transactions: transactionsQuery.data ?? [],
    isLoading: transactionsQuery.isLoading,
    monoTransactions: monoTransactionsQuery.data ?? [],
    isLoadingMono: monoTransactionsQuery.isLoading,
    manualTransactions: manualTransactionsQuery.data ?? [],
    isLoadingManual: manualTransactionsQuery.isLoading,
  }
}