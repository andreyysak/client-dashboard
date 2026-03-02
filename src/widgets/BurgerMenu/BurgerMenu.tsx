import { useState } from 'react'
import { navLinks } from '@/shared/consts/NavLinks.tsx'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Bolt, Globe, Moon, User, ChevronDown } from 'lucide-react'

export const BurgerMenu = () => {
  const { t } = useTranslation()
  const [expandedLinks, setExpandedLinks] = useState<string[]>([])

  const toggleExpand = (path: string, e: React.MouseEvent) => {
    if (navLinks.find((link) => link.path === path)?.subLinks) {
      e.preventDefault()
      setExpandedLinks((prev) =>
        prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
      )
    }
  }

  return (
    <div className="burger-menu">
      <nav className="burger-menu__nav">
        <ul className="burger-menu__nav__list">
          {navLinks.map((link) => {
            const isExpanded = expandedLinks.includes(link.path)
            const hasSubLinks = !!link.subLinks

            return (
              <li key={link.path} className="burger-menu__nav__item-container">
                <div
                  className={`burger-menu__nav__list--item ${isExpanded ? 'active' : ''}`}
                  onClick={(e) => toggleExpand(link.path, e)}
                >
                  {link.icon}
                  <Link to={link.path}>{t(link.labelKey)}</Link>
                  {hasSubLinks && (
                    <ChevronDown
                      size={20}
                      className={`burger-menu__arrow ${isExpanded ? 'rotated' : ''}`}
                    />
                  )}
                </div>

                {hasSubLinks && (
                  <ul className={`burger-menu__sub-list ${isExpanded ? 'open' : ''}`}>
                    {link.subLinks?.map((sub) => (
                      <li key={sub.path} className="burger-menu__sub-list--item">
                        <Link to={sub.path}>
                          {sub.icon}
                          <span>{t(sub.labelKey)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
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
