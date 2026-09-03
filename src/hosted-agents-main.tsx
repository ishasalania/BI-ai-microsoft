import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AccessGate from './AccessGate'
import HostedAgentsPage from './HostedAgentsPage'

createRoot(document.getElementById('root')!).render(<StrictMode><AccessGate><HostedAgentsPage /></AccessGate></StrictMode>)