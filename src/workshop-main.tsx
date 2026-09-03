import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AccessGate from './AccessGate'
import WorkshopPage from './WorkshopPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessGate><WorkshopPage /></AccessGate>
  </StrictMode>,
)