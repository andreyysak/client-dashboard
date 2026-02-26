import { useTranslation } from 'react-i18next'

export const ProfilePage = () => {
  const { t } = useTranslation('profile')
  return (
    <div>
      <h2>{t('title')}</h2>
    </div>
  )
}
