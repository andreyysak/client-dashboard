export const AppRoutes = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_SUCCESS: '/login-success',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  GARAGE: {
    ROOT: '/garage',
    TRIPS: 'trips',
    FUEL: 'fuel',
    MAINTENANCE: 'maintenance',
  },

  BANK: {
    ROOT: '/bank',
    CATEGORIES: 'categories',
    TRANSACTIONS: 'transactions',
    CREDIT_CARDS: 'credit_cards',
  },

  CINEMA: {
    ROOT: '/cinema',
    MOVIES: 'movies',
    TV_SHOWS: 'tv_shows',
  },

  GYM: '/gym',
  NOT_FOUND: '*',
} as const
