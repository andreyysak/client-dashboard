const API_URL = import.meta.env.VITE_API_URL || ''

export const getGoogleAuthRedirectUrl = () => {
  return `${API_URL}/auth/google`
}