import { UpdateUserLocation, User } from '@/entities/user/model/User'
import { api } from '@/shared/api/axios'
import { toast } from 'react-toastify'

export const UserApi = {
  async getUserInfo(): Promise<User> {
    try {
      const { data } = await api.get<User>('/user/me')
      return data
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      toast.error('Failed to load user data.')
      throw error
    }
  },
  async updateUserLocation(location: UpdateUserLocation) {
    try {
      const { data } = await api.patch('/user/location', location)
      return data
    } catch (error) {
      console.error('Failed to update user location:', error)
      toast.error('Failed to update user location.')
      throw error
    }
  }
}
