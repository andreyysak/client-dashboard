import { navLinks } from '@/shared/consts/NavLinks.tsx'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Bolt, Globe, Moon, User } from 'lucide-react'

export const BurgerMenu = () => {
  const { t } = useTranslation()

  return (
    <div className="burger-menu">
      <nav className="burger-menu__nav">
        <ul className="burger-menu__nav__list">
          {navLinks.map((link) => (
            <li key={link.path} className="burger-menu__nav__list--item">
              {link.icon}
              <Link to={link.path}>{t(link.labelKey)}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="burger-menu__bottom">
        <div className="burger-menu__bottom__controls">
          <button className="burger-menu__bottom__controls--item">
            <Globe />
          </button>
          <button className="burger-menu__bottom__controls--item">
            <Moon />
          </button>
          <button className="burger-menu__bottom__controls--item">
            <Link to="/settings">
              <Bolt />
            </Link>
          </button>
        </div>

        <div className="burger-menu__bottom__profile">
          <Link to="/profile">
            {t('header.profile')}
            <User />
          </Link>
        </div>
      </div>
    </div>
  )
}
