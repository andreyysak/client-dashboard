import { useTranslation } from 'react-i18next'
import logo from '@/assets/images/logo.png'
import {
  ArrowLeftRight,
  Banknote,
  Bolt,
  CarFront,
  CreditCard,
  Dumbbell,
  Fuel,
  Gavel,
  Globe,
  Grid2X2,
  MapPin,
  Moon,
  Popcorn,
  TvMinimalPlay,
  User,
  Videotape,
} from 'lucide-react'
import { Link } from 'react-router'

const navLinks = [
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

export const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__left--link">
          <img className="header__left--logo" src={logo} alt="logo" />
          <h5 className="header__left--title">{t('header.title')}</h5>
        </Link>
      </div>

      <nav className="header__center">
        <ul className="header__center__list">
          {navLinks.map((link) => (
            <li key={link.path} className="header__center__list--item">
              {link.icon}
              <Link to={link.path}>{t(link.labelKey)}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__right">
        <div className="header__right__controls">
          <button className="header__right__controls--item">
            <Globe />
          </button>
          <button className="header__right__controls--item">
            <Moon />
          </button>
          <button className="header__right__controls--item">
            <Link to="/settings">
              <Bolt />
            </Link>
          </button>
        </div>

        <div className="header__right__profile">
          <Link to="/profile">
            <User />
          </Link>
        </div>
      </div>
    </header>
  )
}
