import AppRoutes from './routes/AppRoutes'
import no from './locales/no'
import en from './locales/en'
import es from './locales/es'
import { useEffect, useState } from 'react';
import './App.css';
import CalendarEvents from './components/sections/CalendarEvents'; // ← Kalenderkomponenten

function App() {

  const [language, setLanguage] = useState('en')

  const locales = { no, en, es }
  const texts = locales[language] ?? en

  return (
      <AppRoutes
      language={language}
      setLanguage={setLanguage}
      texts={texts}
    />
    
  )
}




export default App;