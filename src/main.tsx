import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UDrivePage } from './UDrivePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UDrivePage />
  </StrictMode>,
)
