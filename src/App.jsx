import AppRoutes from './routes/AppRoutes'
import no from './locales/no'
import en from './locales/en'
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('en')

  const texts = language === 'no' ? no : en

  useEffect(() => {
    async function fetchCalendar() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:4000/api/calendar');
        if (!res.ok) {
          throw new Error('Feil ved henting av kalender');
        }

        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        setError(err.message || 'Ukjent feil');
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
  }, []);

  if (loading) {
    return <div className="App">Laster kalender...</div>;
  }

  if (error) {
    return <div className="App">Feil: {error}</div>;
  }

  return (
    <div>
      <AppRoutes
      language={language}
      setLanguage={setLanguage}
      texts={texts}
    />
      <div>
        <h1>Villa Las Chicas</h1>
      </div>
    </div>
  )
}




export default App;