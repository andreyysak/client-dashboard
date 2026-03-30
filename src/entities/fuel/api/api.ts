import { CreateFuel, Fuel, FuelResponse } from '@/entities/fuel/model/Fuel.ts'
import { api } from '@/shared/api/axios.ts'
import { useUserStore } from '@/entities/user'

export const FuelService = {
  async getAllFuel(): Promise<Fuel[]> {
    const carId = useUserStore.getState().selectedCar?.car_id
    const response = await api<FuelResponse>(`/fuel?carId=${carId}`)
    return response.data.data
  },

  async createFuel(fuel: CreateFuel): Promise<Fuel> {
    const carId = useUserStore.getState().selectedCar?.car_id
    const response = await api.post('/fuel', { car_id: carId, ...fuel })
    return response.data
  },

  async getOneFuel(id: number): Promise<Fuel> {
    const response = await api.get(`/fuel/${id}`)
    return response.data
  },

  async updateFuel(id: number, fuel: CreateFuel) {
    const carId = useUserStore.getState().selectedCar?.car_id
    const response = await api.patch(`/fuel/${id}`, { car_id: carId, ...fuel })
    return response.data
  },

  async deleteFuel(id: number): Promise<void> {
    const response = await api.delete(`/fuel/${id}`)
    return response.data
  },
}
