import { Navigate, Outlet } from 'react-router-dom'
import { AppRoutes } from '@/shared/consts/AppRoutes.ts'
import { useAppStore } from '@/app/store/useAppStore.ts'

export const ProtectedRoute = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.LOGIN} replace />
  }

  return <Outlet />
}
