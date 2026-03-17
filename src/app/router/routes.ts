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
import CarPage from '@/pages/CarPage'
import Loader from '@/widgets/Loader'
import SingleMoviePage from '@/pages/SingleMoviePage'

export const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      {
        path: AppRoutes.LOGIN,
        loader: Loader,
        Component: LoginPage,
      },
      {
        path: AppRoutes.LOGIN_SUCCESS,
        loader: Loader,
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
            loader: Loader,
            Component: HomePage,
          },
          {
            path: AppRoutes.PROFILE,
            loader: Loader,
            Component: ProfilePage,
          },
          {
            path: AppRoutes.SETTINGS,
            loader: Loader,
            Component: SettingsPage,
          },
          {
            path: AppRoutes.GARAGE.ROOT,
            children: [
              {
                index: true,
                loader: Loader,
                Component: GaragePage,
              },
              {
                path: AppRoutes.GARAGE.CAR,
                loader: Loader,
                Component: CarPage,
              },
              {
                path: AppRoutes.GARAGE.TRIPS,
                loader: Loader,
                Component: TripsPage,
              },
              {
                path: AppRoutes.GARAGE.FUEL,
                loader: Loader,
                Component: FuelPage,
              },
              {
                path: AppRoutes.GARAGE.MAINTENANCE,
                loader: Loader,
                Component: MaintenancePage,
              },
            ],
          },
          {
            path: AppRoutes.BANK.ROOT,
            children: [
              {
                index: true,
                loader: Loader,
                Component: BankPage,
              },
              {
                path: AppRoutes.BANK.CATEGORIES,
                loader: Loader,
                Component: CategoriesPage,
              },
              {
                path: AppRoutes.BANK.TRANSACTIONS,
                loader: Loader,
                Component: TransactionPage,
              },
              {
                path: AppRoutes.BANK.CREDIT_CARDS,
                loader: Loader,
                Component: CreditCardsPage,
              },
            ],
          },
          {
            path: AppRoutes.CINEMA.ROOT,
            children: [
              {
                index: true,
                loader: Loader,
                Component: CinemaPage,
              },
              {
                path: AppRoutes.CINEMA.MOVIES,
                loader: Loader,
                Component: MoviePage,
              },
              {
                path: AppRoutes.CINEMA.TV_SHOWS,
                loader: Loader,
                Component: TvShowPage,
              },
              {
                path: AppRoutes.CINEMA.MOVIE,
                loader: Loader,
                Component: SingleMoviePage,
              },
            ],
          },
          {
            path: AppRoutes.GYM,
            loader: Loader,
            Component: GymPage,
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
