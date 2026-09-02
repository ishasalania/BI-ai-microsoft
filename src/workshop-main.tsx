import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WorkshopPage from './WorkshopPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkshopPage />
  </StrictMode>,
)