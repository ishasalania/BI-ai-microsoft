import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HostedAgentsPage from './HostedAgentsPage'

createRoot(document.getElementById('root')!).render(<StrictMode><HostedAgentsPage /></StrictMode>)