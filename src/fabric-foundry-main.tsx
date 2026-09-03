import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FabricFoundryPage from './FabricFoundryPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FabricFoundryPage />
  </StrictMode>,
)