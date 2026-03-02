import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { UserApi, useUserStore } from '@/entities/user'
import Loader from '@/widgets/Loader'

export const ProfilePage = () => {
  const { t } = useTranslation('profile')
  const {setUser, setLoading, user, isLoading} = useUserStore()

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

  if (isLoading) {
    return <Loader />
  }

  console.log('user: ', user)

  return (
    <div>
      <h2>{t('title')}</h2>
    </div>
  )
}
