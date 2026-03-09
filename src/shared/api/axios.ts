import axios, { AxiosError } from 'axios'
import { useAppStore } from '@/app/store/useAppStore.ts'
import { ApiError } from '@/shared/types/ApiError'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAppStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const { logout } = useAppStore.getState()

    if (error.response?.status === 401) {
      logout()
    }

    return Promise.reject(error)
  },
)

export const isApiError = (error: unknown): error is AxiosError<ApiError> => {
  return axios.isAxiosError(error)
}

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.response?.data?.message || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error occurred'
}
