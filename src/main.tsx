import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UDrivePage } from './UDrivePage'
import { TermsPage } from './TermsPage'
import { PrivacyPage } from './PrivacyPage'

function App() {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (path === '/terms' || path === '/terms/') return <TermsPage />
  if (path === '/privacy' || path === '/privacy/') return <PrivacyPage />
  return <UDrivePage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
