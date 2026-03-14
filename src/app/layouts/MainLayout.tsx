import { Outlet } from 'react-router-dom'
import Header from '@/widgets/Header'
import Footer from '@/widgets/Footer'

export const MainLayout = () => {
  return (
    <div className="layout">
      <Header />

      <div className="layout__content">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
