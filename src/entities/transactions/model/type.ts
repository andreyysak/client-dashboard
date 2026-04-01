import { Account } from '@/entities/account/model/type.ts'
import { Category } from '@/entities/category/model/type.ts'

export interface Transaction {
  transaction_id: number
  mono_id: string
  user_id: number
  account_id: number
  category_id: number
  amount: number
  description: string
  created_at: string
  updated_at: string
  account: Account
  category: Category
}

export type TransactionTab = 'all' | 'manual' | 'bank'

export interface TransactionDto {
  account_id?: number
  category_id?: number
  amount?: number
  description?: string
  mono_id?: string
}

export interface TransactionResponse {
  success: boolean
  statusCode: number
  data: { items: Transaction[] }
  timestamp: string
}