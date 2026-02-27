import Loader from '@/widgets/Loader'
import { useEffect } from 'react'
import { useAppStore } from '@/app/store/useAppStore.ts'
import { AppRoutes } from '@/shared/consts/AppRoutes.ts'

export const LoginSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setToken = useAppStore((state) => state.setToken)

  useEffect(() => {
    const token = searchParams.get('token')

    if (token) {
      setToken(token)

      const timeout = setTimeout(() => {
        navigate(AppRoutes.HOME)
      }, 500)

      return () => clearTimeout(timeout)
    } else {
      navigate(AppRoutes.LOGIN)
    }
  }, [searchParams, navigate, setToken])

  return <Loader />
}