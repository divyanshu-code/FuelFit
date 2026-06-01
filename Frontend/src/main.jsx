import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DataContext from '../Context/DataContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <DataContext>
      <App />
    </DataContext>
  </BrowserRouter>

)
