import {Garage} from "@/entities/garage";

export interface Maintenance {
  maintenance_id: number
  user_id: number
  car_id: number
  cost: number
  date: string
  description: string
  odometer: number
  created_at: string
    car: Garage
}

export interface MaintenanceDto {
    car_id: number
    date?: string
    description?: string
    odometer?: number
    cost?: number
}

export interface MaintenanceResponse {
  success: boolean
  statusCode: number
  data: Maintenance[]
  timestamp: string
}