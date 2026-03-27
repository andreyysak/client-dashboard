import { Garage } from '@/entities/garage'

export interface Fuel {
  gas_id: number
  user_id: number
  car_id: number
  liters: number
  price: number
  station: string
  created_at: string
  updated_at: string
  car: Garage
}

export interface CreateFuel {
  liters?: number
  price?: number
  station?: string
}

export interface FuelResponse {
  success: boolean
  statusCode: number
  data: Fuel[]
  timestamp: string
}