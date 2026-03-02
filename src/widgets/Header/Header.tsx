import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '@/assets/images/logo.png'
import { Link } from 'react-router'
import { navLinks } from '@/shared/consts/NavLinks.tsx'
import { Bolt, Globe, Menu, Moon, User, X, ChevronDown } from 'lucide-react'
import BurgerMenu from '@/widgets/BurgerMenu'

export const Header = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpenBurgerMenu = () => {
    setIsOpen((cur) => !cur)
  }

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
            <li key={link.path} className="header__center__item">
              <div className="header__center__link-wrapper">
                {link.icon}
                <Link to={link.path}>{t(link.labelKey)}</Link>
                {link.subLinks && (
                  <ChevronDown size={14} className="header__center__arrow" />
                )}
              </div>

              {link.subLinks && (
                <ul className="header__dropdown">
                  {link.subLinks.map((sub) => (
                    <li key={sub.path} className="header__dropdown__item">
                      <Link to={sub.path}>
                        {sub.icon}
                        <span>{t(sub.labelKey)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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

      <div className="header__burger-btn">
        <button onClick={toggleOpenBurgerMenu}>
          {isOpen ? <X /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && <BurgerMenu />}
    </header>
  )
}
