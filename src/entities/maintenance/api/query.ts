import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MaintenanceService } from '@/entities/maintenance/api/api.ts'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/shared/api/axios.ts'
import { Maintenance, MaintenanceDto } from '@/entities/maintenance/model/Maintenance.ts'
import { ApiError } from '@/shared/types/ApiError.ts'

export const useMaintenance = () => {
  const queryClient = useQueryClient()
  
  const maintenanceQuery = useQuery({
    queryKey: ['maintenance'],
    queryFn: async () => {
      try {
        return await MaintenanceService.getAll()
      } catch (e) {
        toast.error(getErrorMessage(e))
        console.error(e)
      }
    },
    placeholderData: (previousData) => previousData
  })
  
  const createFuelMutation = useMutation<Maintenance, ApiError, MaintenanceDto>({
    mutationFn: (variables) => MaintenanceService.create(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] })
    },
    onError: (error) => toast.error(getErrorMessage(error))
  })

  const deleteFuelMutation = useMutation<void, ApiError, number>({
    mutationFn: (id) => MaintenanceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  const updateFuelMutation = useMutation<
    Maintenance,
    ApiError,
    { id: number; data: MaintenanceDto }
  >({
    mutationFn: (variables) => MaintenanceService.update(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })

  return {
    maintenances: maintenanceQuery.data ?? [],
    isLoading: maintenanceQuery.isLoading,
    create: createFuelMutation.mutateAsync,
    deleteMaintenance: deleteFuelMutation.mutateAsync,
    patch: updateFuelMutation.mutateAsync
  }
}