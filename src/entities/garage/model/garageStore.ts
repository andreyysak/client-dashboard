import { create } from 'zustand'
import { Garage } from '@/entities/garage'
import { GarageApi } from '../api/garageApi'

interface GarageStore {
  cars: Garage[]
  isLoading: boolean

  setCars: (cars: Garage[]) => void
  setLoading: (isLoading: boolean) => void
  addCar: (car: Garage) => void
  removeCar: (carId: number) => void
  clearGarage: () => void
  fetchCarById: (id: number) => Promise<Garage | null>
}

export const useGarageStore = create<GarageStore>((set, get) => ({
  cars: [],
  isLoading: false,

  setCars: (cars) => set({ cars, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),

  addCar: (car) =>
    set((state) => ({
      cars: [...state.cars, car],
    })),

  removeCar: (carId) =>
    set((state) => ({
      cars: state.cars.filter((car) => car.car_id !== carId),
    })),

  clearGarage: () => set({ cars: [], isLoading: false }),

  fetchCarById: async (id: number) => {
    const { cars } = get()
    const existingCar = cars.find((c) => c.car_id === id)

    if (existingCar) return existingCar

    set({ isLoading: true })
    try {
      const car = await GarageApi.getById(id)
      if (car) {
        set((state) => ({ cars: [...state.cars, car] }))
      }
      return car
    } finally {
      set({ isLoading: false })
    }
  },
}))
