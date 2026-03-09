import { Trip } from '@/entities/trip/model/Trip.ts'
import { api } from '@/shared/api/axios.ts'

export const TripApi = {
  async getTrips(): Promise<Trip[]> {
    const response = await api.get<Trip[]>('/trips')
    return response.data
  },

  async getTripById(trip_id: number): Promise<Trip> {
    const response = await api.get<Trip>(`/trips/${trip_id}`)
    return response.data
  },

  async getTripsDirections() {
    const response = await api.get('/trips/directions')
    return response.data
  },

  async createTrip(car_id: number, kilometres: number, direction: string): Promise<Trip> {
    const response = await api.post<Trip>('/trips', {
      car_id,
      kilometres,
      direction,
    })
    return response.data
  },

  async deleteTrip(trip_id: number): Promise<void> {
    await api.delete(`/trips/${trip_id}`)
  },

  async updateTrip(
    trip_id: number,
    kilometres?: number,
    direction?: string,
  ): Promise<Trip> {
    const response = await api.patch<Trip>(`/trips/${trip_id}`, {
      kilometres,
      direction,
    })
    return response.data
  },
}
