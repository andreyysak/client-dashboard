import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Home } from 'lucide-react'
import { AppRoutes } from '@/shared/consts/AppRoutes'

const formatPathName = (name: string) => {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const isIdentifier = (value: string) => {
  if (!isNaN(Number(value))) return true
  if (value.length > 20 && /^[a-zA-Z0-9-]+$/.test(value)) return true
  return false
}

const formatId = (id: string) => {
  return id.length > 8 && isNaN(Number(id)) ? `${id.substring(0, 8)}...` : id
}

export const Breadcrumbs = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const pathnames = location.pathname.split('/').filter((x) => x)

  if (pathnames.length === 0) return null

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={AppRoutes.HOME}
            className="breadcrumbs__link breadcrumbs__link--home"
            title={t('navigation.home', 'Home')}
          >
            <Home size={16} strokeWidth={2.5} />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          const isId = isIdentifier(value)
          const label = isId
            ? formatId(value)
            : t(`navigation.${value}`, formatPathName(value))

          return (
            <li key={to} className="breadcrumbs__item">
              <ChevronRight size={14} className="breadcrumbs__separator" />
              {last ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {label}
                </span>
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
