import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Home } from 'lucide-react'
import { AppRoutes } from '@/shared/consts/AppRoutes'

export const Breadcrumbs = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={AppRoutes.HOME} className="breadcrumbs__link">
            <Home size={16} />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          const isId = !isNaN(Number(value))
          const label = isId ? value : t(`navigation.${value}`, value)

          return (
            <li key={to} className="breadcrumbs__item">
              <ChevronRight size={14} className="breadcrumbs__separator" />
              {last ? (
                <span className="breadcrumbs__current">{label}</span>
              ) : (
                <Link to={to} className="breadcrumbs__link">
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
