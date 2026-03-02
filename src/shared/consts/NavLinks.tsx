import {
  ArrowLeftRight,
  Banknote,
  CarFront,
  CreditCard,
  Dumbbell,
  Fuel,
  Gavel,
  Grid2X2,
  MapPin,
  Popcorn,
  TvMinimalPlay,
  Videotape,
} from 'lucide-react'
import { AppRoutes } from '@/shared/consts/AppRoutes'

export const navLinks = [
  {
    labelKey: 'navigation.garage',
    path: AppRoutes.GARAGE.ROOT,
    icon: <CarFront />,
    subLinks: [
      {
        labelKey: 'navigation.trips',
        path: `${AppRoutes.GARAGE.ROOT}/${AppRoutes.GARAGE.TRIPS}`,
        icon: <MapPin />,
      },
      {
        labelKey: 'navigation.fuel',
        path: `${AppRoutes.GARAGE.ROOT}/${AppRoutes.GARAGE.FUEL}`,
        icon: <Fuel />,
      },
      {
        labelKey: 'navigation.maintenance',
        path: `${AppRoutes.GARAGE.ROOT}/${AppRoutes.GARAGE.MAINTENANCE}`,
        icon: <Gavel />,
      },
    ],
  },
  {
    labelKey: 'navigation.bank',
    path: AppRoutes.BANK.ROOT,
    icon: <Banknote />,
    subLinks: [
      {
        labelKey: 'navigation.categories',
        path: `${AppRoutes.BANK.ROOT}/${AppRoutes.BANK.CATEGORIES}`,
        icon: <Grid2X2 />,
      },
      {
        labelKey: 'navigation.transactions',
        path: `${AppRoutes.BANK.ROOT}/${AppRoutes.BANK.TRANSACTIONS}`,
        icon: <ArrowLeftRight />,
      },
      {
        labelKey: 'navigation.cards',
        path: `${AppRoutes.BANK.ROOT}/${AppRoutes.BANK.CREDIT_CARDS}`,
        icon: <CreditCard />,
      },
    ],
  },
  {
    labelKey: 'navigation.cinema',
    path: AppRoutes.CINEMA.ROOT,
    icon: <Popcorn />,
    subLinks: [
      {
        labelKey: 'navigation.movies',
        path: `${AppRoutes.CINEMA.ROOT}/${AppRoutes.CINEMA.MOVIES}`,
        icon: <Videotape />,
      },
      {
        labelKey: 'navigation.tv_shows',
        path: `${AppRoutes.CINEMA.ROOT}/${AppRoutes.CINEMA.TV_SHOWS}`,
        icon: <TvMinimalPlay />,
      },
    ],
  },
  {
    labelKey: 'navigation.gym',
    path: AppRoutes.GYM,
    icon: <Dumbbell />,
  },
]
