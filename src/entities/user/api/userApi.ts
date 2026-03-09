import { UpdateUserLocation, User } from '@/entities/user/model/User'
import { api } from '@/shared/api/axios'

export const UserApi = {
  async getUserInfo(): Promise<User> {
    try {
      const { data } = await api.get<User>('/user/me')
      return data
    } catch (error) {
      console.error('Failed to fetch user info:', error)
      throw error
    }
  },
  async updateUserLocation(location: UpdateUserLocation) {
    try {
      const { data } = await api.patch('/user/location', location)
      return data
    } catch (error) {
      console.error('Failed to update user location:', error)
      throw error
    }
  }
}
