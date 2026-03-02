import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthLayout } from '@/app/layouts/AuthLayout.tsx'
import { AppRoutes } from '@/shared/consts/AppRoutes.ts'
import { MainLayout } from '@/app/layouts/MainLayout.tsx'

import LoginPage from '@/pages/LoginPage'
import LoginSuccessPage from '@/pages/LoginSuccessPage'
import HomePage from '@/pages/HomePage'
import ProfilePage from '@/pages/ProfilePage'
import SettingsPage from '@/pages/SettingsPage'
import GaragePage from '@/pages/GaragePage'
import TripsPage from '@/pages/TripsPage'
import FuelPage from '@/pages/FuelPage'
import MaintenancePage from '@/pages/MaintenancePage'
import BankPage from '@/pages/BankPage'
import CategoriesPage from '@/pages/CategoriesPage'
import TransactionPage from '@/pages/TransactionPage'
import CreditCardsPage from '@/pages/CreditCardsPage'
import CinemaPage from '@/pages/CinemaPage'
import MoviePage from '@/pages/MoviePage'
import TvShowPage from '@/pages/TvShowPage'
import GymPage from '@/pages/GymPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      {
        path: AppRoutes.LOGIN,
        Component: LoginPage,
      },
      {
        path: AppRoutes.LOGIN_SUCCESS,
        Component: LoginSuccessPage,
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
            Component: HomePage,
          },
          {
            path: AppRoutes.PROFILE,
            Component: ProfilePage,
          },
          {
            path: AppRoutes.SETTINGS,
            Component: SettingsPage,
          },
          {
            path: AppRoutes.GARAGE.ROOT,
            children: [
              {
                index: true,
                Component: GaragePage,
              },
              {
                path: AppRoutes.GARAGE.TRIPS,
                Component: TripsPage,
              },
              {
                path: AppRoutes.GARAGE.FUEL,
                Component: FuelPage,
              },
              {
                path: AppRoutes.GARAGE.MAINTENANCE,
                Component: MaintenancePage,
              },
            ],
          },
          {
            path: AppRoutes.BANK.ROOT,
            children: [
              {
                index: true,
                Component: BankPage,
              },
              {
                path: AppRoutes.BANK.CATEGORIES,
                Component: CategoriesPage,
              },
              {
                path: AppRoutes.BANK.TRANSACTIONS,
                Component: TransactionPage,
              },
              {
                path: AppRoutes.BANK.CREDIT_CARDS,
                Component: CreditCardsPage,
              },
            ],
          },
          {
            path: AppRoutes.CINEMA.ROOT,
            children: [
              {
                index: true,
                Component: CinemaPage,
              },
              {
                path: AppRoutes.CINEMA.MOVIES,
                Component: MoviePage,
              },
              {
                path: AppRoutes.CINEMA.TV_SHOWS,
                Component: TvShowPage,
              },
            ],
          },
          {
            path: AppRoutes.GYM,
            Component: GymPage,
          },
        ],
      },
    ],
  },
  {
    path: AppRoutes.NOT_FOUND,
    Component: NotFoundPage,
  },
])
