import axios from 'axios'
import { useAppStore } from '@/app/store/useAppStore.ts'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAppStore.getState().token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
