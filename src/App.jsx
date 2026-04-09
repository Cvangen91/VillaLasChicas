import AppRoutes from './routes/AppRoutes'
import no from './locales/no'
import en from './locales/en'
import es from './locales/es'
import { useState } from 'react';
import './App.css';


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