import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AccessGate from './AccessGate'
import FabricFoundryPage from './FabricFoundryPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccessGate><FabricFoundryPage /></AccessGate>
  </StrictMode>,
)