import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExampleComponent from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExampleComponent />
  </StrictMode>,
)
