import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/globals.scss'
import { Providers } from '@/app/providers'
import { RouterProvider } from '@/app/providers/RouterProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider />
    </Providers>
  </StrictMode>,
)
