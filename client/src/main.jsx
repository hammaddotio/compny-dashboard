import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PriceListContext from './context/PriceListContext.jsx'
import CallApiContext from './context/CallApiAndUpdateState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CallApiContext>
        <PriceListContext>
          <App />
        </PriceListContext>
      </CallApiContext>
    </BrowserRouter>
  </StrictMode>,
)
