import { Outlet } from 'react-router-dom'
import Header from '@/widgets/Header'
import Footer from '@/widgets/Footer'

export const MainLayout = () => {
  return (
    <main>
      <Header />

      <div>
        <Outlet />
      </div>

      <Footer />
    </main>
  )
}
