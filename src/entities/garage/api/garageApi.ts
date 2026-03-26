import { Garage } from '@/entities/garage'
import { api } from '@/shared/api/axios.ts'
import { GarageResponse } from '@/entities/garage/model/Garage.ts'

export const GarageApi = {
  async getAll(): Promise<Garage[]> {
    try {
      const response = await api.get<GarageResponse>('/cars')
      return response.data.data
    } catch (error) {
      console.error('Failed to load:', error)
      throw error
    }
  },

  async getById(id: number): Promise<Garage | null> {
    try {
      const response = await api.get<Garage>(`/cars/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to load:', error)
      throw error
    }
  },
}