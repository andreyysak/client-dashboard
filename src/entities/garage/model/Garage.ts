interface GarageFeatures {
  stage1: boolean
  sport_exhaust: boolean
}

export interface Garage {
  car_id: number
  user_id: number
  brand: string
  model: string
  vin_code: string
  license_plate: string
  year: number
  color: string
  fuel_type: string
  engine_capacity: number
  transmission: string
  current_mileage: number
  features: GarageFeatures
  created_at: string
  updated_at: string
}
