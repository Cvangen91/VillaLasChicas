// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="App">
      <h1>Kalender</h1>
      {events.length === 0 && <p>Ingen events funnet.</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong>
            <br />
            Fra: {new Date(event.start).toLocaleDateString()}
            <br />
            Til: {new Date(event.end).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;