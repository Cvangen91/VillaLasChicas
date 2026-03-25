import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import no from './locales/no'
import en from './locales/en'
import './App.css'

function App() {
  const [language, setLanguage] = useState('en')

  const texts = language === 'no' ? no : en

  return (
    <AppRoutes
      language={language}
      setLanguage={setLanguage}
      texts={texts}
    />
  )
}

export default App