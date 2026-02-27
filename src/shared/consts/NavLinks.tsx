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

export const navLinks = [
  {
    labelKey: 'navigation.garage',
    path: '/garage',
    icon: <CarFront />,
    subLinks: [
      {
        labelKey: 'navigation.trips',
        path: '/trips',
        icon: <MapPin />,
      },
      {
        labelKey: 'navigation.fuel',
        path: '/fuel',
        icon: <Fuel />,
      },
      {
        labelKey: 'navigation.maintenance',
        path: '/maintenance',
        icon: <Gavel />,
      },
    ],
  },
  {
    labelKey: 'navigation.bank',
    path: '/bank',
    icon: <Banknote />,
    subLinks: [
      {
        labelKey: 'navigation.categories',
        path: '/categories',
        icon: <Grid2X2 />,
      },
      {
        labelKey: 'navigation.transactions',
        path: '/transactions',
        icon: <ArrowLeftRight />,
      },
      {
        labelKey: 'navigation.cards',
        path: '/cards',
        icon: <CreditCard />,
      },
    ],
  },
  {
    labelKey: 'navigation.cinema',
    path: '/cinema',
    icon: <Popcorn />,
    subLinks: [
      {
        labelKey: 'navigation.movies',
        path: '/movies',
        icon: <Videotape />,
      },
      {
        labelKey: 'navigation.tv_shows',
        path: '/tv-shows',
        icon: <TvMinimalPlay />,
      },
    ],
  },
  {
    labelKey: 'navigation.gym',
    path: '/gym',
    icon: <Dumbbell />,
  },
]
