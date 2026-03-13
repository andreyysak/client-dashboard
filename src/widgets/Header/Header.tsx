import { useTranslation } from 'react-i18next'
import logo from '@/assets/images/logo.png'
import { Link } from 'react-router'
import { navLinks } from '@/shared/consts/NavLinks.tsx'
import { Bolt, Globe, Menu, Moon, Sun, User, X, ChevronDown } from 'lucide-react'
import BurgerMenu from '@/widgets/BurgerMenu'
import { useAppStore } from '@/app/store/useAppStore.ts'

export const Header = () => {
  const { t } = useTranslation()
  const { isMenuOpen, setMenuOpen, language, setLanguage, theme, toggleTheme } =
    useAppStore()

  const handleToggleLanguage = () => {
    setLanguage(language === 'ua' ? 'en' : 'ua')
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
          <button
            onClick={handleToggleLanguage}
            className="header__right__controls--item"
            title={language.toUpperCase()}
          >
            <Globe size={20} />
            <span style={{ fontSize: '10px', marginLeft: '4px' }}>
              {language.toUpperCase()}
            </span>
          </button>

          <button onClick={toggleTheme} className="header__right__controls--item">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button className="header__right__controls--item">
            <Link to="/settings">
              <Bolt size={20} />
            </Link>
          </button>
        </div>

        <div className="header__right__profile">
          <Link to="/profile">
            <User size={20} />
          </Link>
        </div>
      </div>

      <div className="header__burger-btn">
        <button onClick={() => setMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && <BurgerMenu />}
    </header>
  )
}
