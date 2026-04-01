import { Transaction, TransactionResponse, TransactionDto } from '@/entities/transactions/model/type.ts'
import { api } from '@/shared/api/axios.ts'

export const TransactionService = {
  async getAll(): Promise<Transaction[]> {
    const response = await api<TransactionResponse>('/transactions')
    return response.data.data.items
  },
  async getAllMono(): Promise<Transaction[]> {
    const response = await api<TransactionResponse>('/transactions/mono')
    return response.data.data.items
  },
  async getAllManual(): Promise<Transaction[]> {
    const response = await api<TransactionResponse>('/transactions/manual')
    return response.data.data.items
  },
  async createTransaction(data: TransactionDto) {
    const response = await api.post('/transactions', data)
    return response.data
  },
  async getOne(id: number) {
    const response = await api<TransactionResponse>(`/transactions/${id}`)
    return response.data.data.items
  },
  async updateTransaction(id: number, data: TransactionDto) {
    const response = await api.patch(`/transactions/${id}`, data)
    return response.data
  },
  async deleteTransaction(id: number) {
    const response = await api.delete(`/transactions/${id}`)
    return response.data
  }
}