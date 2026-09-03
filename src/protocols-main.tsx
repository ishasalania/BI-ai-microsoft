import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProtocolsPage from './ProtocolsPage'

createRoot(document.getElementById('root')!).render(<StrictMode><ProtocolsPage /></StrictMode>)