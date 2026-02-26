import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <Outlet />
      </div>
    </div>
  )
}
