import {
  Maintenance, MaintenanceDto,
  MaintenanceResponse,
} from '@/entities/maintenance/model/Maintenance.ts'
import { api } from '@/shared/api/axios.ts'
import { useUserStore } from '@/entities/user'

export const MaintenanceService = {
  async getAll(): Promise<Maintenance[]> {
    const carId = useUserStore.getState().selectedCar?.car_id
    const response = await api<MaintenanceResponse>(`/maintenance?carId=${carId}`)
    return response.data.data
  },
  async create(data: MaintenanceDto): Promise<Maintenance> {
    const response = await api.post('/maintenance', data)
    return response.data
  },
  async getOne(id: number): Promise<Maintenance[]> {
    const response = await api<MaintenanceResponse>(`/maintenance/${id}`)
    return response.data.data
  },
  async update(id: number, data: MaintenanceDto): Promise<Maintenance> {
    const response = await api.patch(`/maintenance/${id}`, data)
    return response.data
  },
  async delete(id: number) {
    await api.delete(`/maintenance/${id}`)
  }
}