import AppRoutes from './routes/AppRoutes'
import no from './locales/no'
import en from './locales/en'
import { useEffect, useState } from 'react';
import './App.css';
import CalendarEvents from './components/sections/Calendar'; // ← Kalenderkomponenten

function App() {

  const [language, setLanguage] = useState('en')

  const texts = language === 'no' ? no : en

  

  return (
    <div>
      <AppRoutes
      language={language}
      setLanguage={setLanguage}
      texts={texts}
    />
      <div>
    
        <CalendarEvents />
      </div>
    </div>
  )
}




export default App;