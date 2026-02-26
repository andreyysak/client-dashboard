import { useTranslation } from 'react-i18next'

export const LoginPage = () => {
  const { t } = useTranslation('login')

  return (
    <div>
      <h2>{t('title')}</h2>
    </div>
  )
}
