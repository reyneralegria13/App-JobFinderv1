import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import mainRoutes from './routes/mainRoutes'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <mainRoutes/>
  </BrowserRouter>
)
