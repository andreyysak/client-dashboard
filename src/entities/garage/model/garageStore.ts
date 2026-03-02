import { create } from 'zustand'
import { Garage } from '@/entities/garage'

interface GarageStore {
  cars: Garage[]
  isLoading: boolean

  setCars: (cars: Garage[]) => void
  setLoading: (isLoading: boolean) => void
  addCar: (car: Garage) => void
  removeCar: (carId: number) => void
  clearGarage: () => void
}

export const useGarageStore = create<GarageStore>((set) => ({
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
}))
