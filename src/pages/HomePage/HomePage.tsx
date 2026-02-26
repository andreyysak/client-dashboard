import { useTranslation } from 'react-i18next'

export const HomePage = () => {
  const { t } = useTranslation('home')
  return (
    <div>
      <h2>{t('title')}</h2>
    </div>
  )
}
