import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTripStore } from '@/entities/trip/model/tripStore.ts'
import { TripApi } from '@/entities/trip/api/tripApi.ts'
import { Trip } from '@/entities/trip/model/Trip.ts'
import { ApiError } from '@/shared/types/ApiError'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/shared/api/axios.ts'

export const useTrips = () => {
  const queryClient = useQueryClient()
  const { setLoading, setError } = useTripStore()

  const tripsQuery = useQuery<Trip[], ApiError>({
    queryKey: ['trips',],
    queryFn: async () => {
      setLoading(true)
      try {
        return await TripApi.getTrips()
      } catch (e) {
        setError(true)
        toast.error(getErrorMessage(e))
        throw e
      } finally {
        setLoading(false)
      }
    },
    placeholderData: (previousData) => previousData,
  })

  const createTripMutation = useMutation<
    Trip,
    ApiError,
    { car_id: number; kilometres: number; direction: string }
  >({
    mutationFn: (variables) =>
      TripApi.createTrip(variables.car_id, variables.kilometres, variables.direction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      toast.success('Поїздку успішно додано')
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  const deleteTripMutation = useMutation<void, ApiError, number>({
    mutationFn: (id) => TripApi.deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      toast.success('Поїздку видалено')
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })

  return {
    trips: tripsQuery.data ?? [],
    isLoading: tripsQuery.isLoading,
    isFetching: tripsQuery.isFetching,
    isError: tripsQuery.isError,
    createTrip: createTripMutation.mutateAsync,
    deleteTrip: deleteTripMutation.mutateAsync,
    isDeleting: deleteTripMutation.isPending,
  }
}
