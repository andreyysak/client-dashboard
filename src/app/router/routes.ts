import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthLayout } from '@/app/layouts/AuthLayout.tsx'
import { AppRoutes } from '@/shared/consts/AppRoutes.ts'
import LoginPage from '@/pages/LoginPage'
import { MainLayout } from '@/app/layouts/MainLayout.tsx'
import HomePage from '@/pages/HomePage'
import ProfilePage from '@/pages/ProfilePage'
import NotFoundPage from '@/pages/NotFoundPage'
import Loader from '@/widgets/Loader'

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      {
        path: AppRoutes.LOGIN,
        loader: Loader,
        Component: LoginPage,
      },
    ],
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: AppRoutes.HOME,
            loader: Loader,
            Component: HomePage,
          },
          {
            path: AppRoutes.PROFILE,
            loader: Loader,
            Component: ProfilePage,
          },
        ],
      },
    ],
  },
  {
    path: AppRoutes.NOT_FOUND,
    loader: Loader,
    Component: NotFoundPage,
  },
])
