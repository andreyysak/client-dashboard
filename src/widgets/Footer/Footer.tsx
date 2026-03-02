import { DollarSign, Euro, Github, Instagram, Linkedin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer__currency">
        <h6 className="footer__currency--title">{t('footer.currency_title')}</h6>
        <div className="footer__currency--item">
          <DollarSign />
          42.79 <span>/ 43.29</span>
        </div>
        <div className="footer__currency--item">
          <Euro />
          50.49 <span>/ 51.89</span>
        </div>
      </div>

      <div className="footer__copyright">
        <p className="footer__copyright--text">{t('footer.copyright')}</p>
      </div>

      <div className="footer__socials">
        <a
          href="https://github.com/andreyysak"
          target="_blank"
          rel="noreferrer"
          className="footer__socials--link"
        >
          <Github />
        </a>
        <a
          href="https://www.linkedin.com/in/andriy-sak-4a3839329/"
          target="_blank"
          rel="noreferrer"
          className="footer__socials--link"
        >
          <Linkedin />
        </a>
        <a
          href="https://www.instagram.com/andreyysak/"
          target="_blank"
          rel="noreferrer"
          className="footer__socials--link"
        >
          <Instagram />
        </a>
      </div>
    </footer>
  )
}
