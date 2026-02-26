import { Suspense } from 'react'
import { RouterProvider as ReactRouterProvider } from 'react-router-dom'
import { router } from '@/app/router/routes.ts'
import Loader from '@/widgets/Loader'

export const RouterProvider = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactRouterProvider router={router} />
    </Suspense>
  )
}
