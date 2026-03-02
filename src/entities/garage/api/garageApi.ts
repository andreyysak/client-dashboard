import { Garage } from '@/entities/garage'
import { toast } from 'react-toastify'
import { api } from '@/shared/api/axios.ts'

export const GarageApi = {
  async getAll(): Promise<Garage[]> {
    try {
      const response = await api.get<Garage[]>('/cars')
      return response.data || []
    } catch {
      toast.error('Failed to load cars')
      return []
    }
  },

  async getById(id: number): Promise<Garage | null> {
    try {
      const response = await api.get<Garage>(`/cars/${id}`)
      return response.data
    } catch {
      toast.error('Failed to load car details')
      return null
    }
  },
}
