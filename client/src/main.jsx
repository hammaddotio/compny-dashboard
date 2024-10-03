import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PriceListContext from './context/PriceListContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PriceListContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PriceListContext>
  </StrictMode>,
)
