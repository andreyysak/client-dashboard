import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateFuel, Fuel } from '@/entities/fuel/model/Fuel.ts'
import { ApiError } from '@/shared/types/ApiError.ts'
import { FuelService } from '@/entities/fuel/api/api.ts'
import { getErrorMessage } from '@/shared/api/axios.ts'
import { toast } from 'react-toastify'
import { useFuelStore } from '@/entities/fuel/model/store.ts'

export const useFuels = () => {
  const queryClient = useQueryClient()
  const id = useFuelStore.getState().formData.id

  const fuelsQuery = useQuery<Fuel[], ApiError>({
    queryKey: ['fuel'],
    queryFn: async () => {
      try {
        return await FuelService.getAllFuel()
      } catch (e) {
        toast.error(getErrorMessage(e))
        throw e
      }
    },
    placeholderData: (previousData) => previousData,
  })

  const oneFuelQuery = useQuery<Fuel, ApiError>({
    queryKey: ['fuel', id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required')

      try {
        return await FuelService.getOneFuel(id)
      } catch (e) {
        toast.error(getErrorMessage(e))
        throw e
      }
    }
  })

  const createFuelMutation = useMutation<Fuel, ApiError, CreateFuel>({
    mutationFn: (variables) => FuelService.createFuel(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const deleteFuelMutation = useMutation<void, ApiError, number>({
    mutationFn: (id) => FuelService.deleteFuel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const updateFuelMutation = useMutation<
    Fuel,
    ApiError,
    { id: number; newFuel: CreateFuel }
  >({
    mutationFn: (variables) => FuelService.updateFuel(variables.id, variables.newFuel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  return {
    fuels: fuelsQuery.data ?? [],
    fuel: oneFuelQuery.data ?? null,
    isLoading: fuelsQuery.isLoading,
    isError: fuelsQuery.isError,
    isFetching: fuelsQuery.isFetching,
    createFuel: createFuelMutation.mutateAsync,
    deleteFuel: deleteFuelMutation.mutateAsync,
    updateFuel: updateFuelMutation.mutateAsync,
  }
}
