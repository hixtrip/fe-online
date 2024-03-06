import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import './style.css'
import App from './App.tsx'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
