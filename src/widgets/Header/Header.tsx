import { useTranslation } from 'react-i18next'
import logo from '@/assets/images/logo.png'
import { Link } from 'react-router'
import BurgerMenu from '@/widgets/BurgerMenu'
import { navLinks } from '@/shared/consts/NavLinks.tsx'
import { Bolt, Globe, Menu, Moon, User, X } from 'lucide-react'

export const Header = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpenBurgerMenu = () => {
    setIsOpen(cur => !cur)
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

      <div className="header__burger-btn">
        <button onClick={toggleOpenBurgerMenu}>
          {isOpen ? <X /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && <BurgerMenu />}
    </header>
  )
}
