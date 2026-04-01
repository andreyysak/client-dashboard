export interface BankCard {
  id: number
  mono_account_id: string
  user_id: number
  name: string
  type: string
  currency_code: number
  balance: number
  masked_pan: string[]
  iban: string
  created_at: string
  updated_at: string
}

export interface BankCardResponse {
  success: boolean
  statusCode: number
  data: BankCard[]
  timestamp: string
}