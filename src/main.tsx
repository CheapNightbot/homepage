import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden bg-[url('/src/assets/imgs/background.jpg')] animate-in fade-in zoom-in-105 scale-110 duration-1000 ease-in-out"></div>
    <App />
  </StrictMode>,
)
