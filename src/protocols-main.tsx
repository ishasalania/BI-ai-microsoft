import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AccessGate from './AccessGate'
import ProtocolsPage from './ProtocolsPage'

createRoot(document.getElementById('root')!).render(<StrictMode><AccessGate><ProtocolsPage /></AccessGate></StrictMode>)