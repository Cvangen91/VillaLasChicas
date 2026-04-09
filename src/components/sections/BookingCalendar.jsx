// src/components/BookingCalendar.jsx
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function BookingCalendar({ texts }) {
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
          throw new Error(texts.calendar.errorPrefix + 'Feil ved henting av kalender');
        }

        const data = await res.json();

        // Konverter backend-events til FullCalendar-format
        const fcEvents = (data.events || []).map((event) => ({
          title: texts.calendar.booked, // tekst som vises i kalenderen
          start: event.start, // FullCalendar takler Date-objekt eller ISO-streng
          end: event.end,
          allDay: true,       // vi antar bookinger gjelder hele dagen
          extendedProps: {
            source: event.source,
          },
        }));

        setEvents(fcEvents);
      } catch (err) {
        setError(err.message || 'Ukjent feil');
      } finally {
        setLoading(false);
      }
    }

    fetchCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts]); // Kjør på nytt ved endring av språk 

  if (loading) {
    return <div>{texts.calendar.loading}</div>;
  }

  if (error) {
    return <div>{texts.calendar.errorPrefix}{error}</div>;
  }

  if (!events.length) {
    return <div>{texts.calendar.empty}</div>;
  }

  return (
    <div>
      <h2>{texts.calendar.title}</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}

export default BookingCalendar;