import { Garage } from '@/entities/garage'

export interface Trip {
  trip_id: number
  user_id: number
  car_id: number
  kilometres: number
  distance: number
  direction: string
  created_at: string
  updated_at: string
  car: Garage
}

export interface TripResponse {
  success: boolean
  statusCode: number
  data: Trip[]
  timestamp: string
}