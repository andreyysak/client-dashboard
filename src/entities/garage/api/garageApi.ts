import { Garage } from '@/entities/garage'
import { api } from '@/shared/api/axios.ts'

export const GarageApi = {
  async getAll(): Promise<Garage[]> {
    try {
      const response = await api.get<Garage[]>('/cars')
      return response.data || []
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
