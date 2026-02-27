import { useTranslation } from 'react-i18next'
import googleLogo from '@/assets/images/google.png'
import { getGoogleAuthRedirectUrl } from '@/features/auth/api/login.ts'

export const LoginPage = () => {
  const { t } = useTranslation()

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthRedirectUrl()
  }

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__image">
          <img src={googleLogo} alt={t('login.image_alt')} />
        </div>

        <h4 className="login__title">{t('login.title')}</h4>

        <button className="login__button" onClick={handleGoogleLogin}>
          {t('login.button')}
        </button>

        <p className="login__confidentiality">{t('login.confidentiality')}</p>
      </div>
    </div>
  )
}
