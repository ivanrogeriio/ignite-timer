import React from 'react'
import ReactDOM from 'react-dom/client'

import { Router } from './Router'
import { CyclesContextProvider } from './contexts/CyclesContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CyclesContextProvider>
      <Router />
    </CyclesContextProvider>
  </React.StrictMode>,
)
