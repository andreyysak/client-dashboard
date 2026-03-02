import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { UserApi, useUserStore } from '@/entities/user'
import Loader from '@/widgets/Loader'

export const ProfilePage = () => {
  const { t, i18n } = useTranslation()
  const { setUser, setLoading, user, isLoading } = useUserStore()

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const data = await UserApi.getUserInfo()
        setUser(data)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [setLoading, setUser])

  if (isLoading) return <Loader />
  if (!user) return <div className="profile-error">{t('profile.not_found')}</div>

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(user.created_at))

  return (
    <div className="profile-grid">
      <section className="profile-main-card">
        <div className="profile-main-card__header">
          <img src={user.image} alt={user.googleName || 'User'} />
        </div>

        <div className="profile-main-card__content">
          <h3 className="profile-title">{t('profile.title')}</h3>

          <div className="profile-info-list">
            <div className="profile-info-item">
              <label>{t('profile.user_fields.name')}</label>
              <p>{user.googleName || 'Andriy Sak'}</p>
            </div>
            <div className="profile-info-item">
              <label>{t('profile.user_fields.phone')}</label>
              <p>{user.phone || '+38 067 000 00 00'}</p>
            </div>
            <div className="profile-info-item">
              <label>{t('profile.user_fields.email')}</label>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-side-column">
        <section className="profile-side-card">
          <div className="profile-side-card__header">
            <h3 className="profile-title">{t('navigation.bank')}</h3>
            <button className="profile-edit-tag">{t('profile.edit')}</button>
          </div>
          <div className="profile-side-card__body">
            <div className="bank-account">
              <span className="bank-account__label">{t('profile.bank_card')}</span>
              <p className="bank-account__number">**** **** **** 4525</p>
            </div>
          </div>
        </section>

        <section className="profile-side-card">
          <div className="profile-side-card__header">
            <h3 className="profile-title">{t('profile.user_fields.location')}</h3>
          </div>
          <div className="profile-side-card__body">
            <div className="profile-info-item">
              <p>
                {user.country || 'Ukraine'}, {user.city || 'Khmelnytskyi'}
              </p>
            </div>
            <div className="profile-info-item">
              <label>{t('profile.user_fields.role')}</label>
              <span className="profile-role-badge">{user.role}</span>
            </div>
            <div className="profile-info-item">
              <label>{t('profile.user_fields.joined')}</label>
              <p>{formattedDate}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
