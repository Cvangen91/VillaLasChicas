// src/components/BookingList.jsx
import { useEffect, useState } from 'react';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Dummy-API: vi bruker "todos" som vi later som er bookinger
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');

        if (!response.ok) {
          throw new Error('Kunne ikke hente booking-data');
        }

        const data = await response.json();

        // Her mapper vi om API-data til "booking"-objekter
        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title,
          // dummy-datoer – senere kommer dette fra Airbnb/backend
          start: '2025-04-01',
          end: '2025-04-03',
        }));

        setBookings(mapped);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Laster bookinger...</p>;
  }

  if (error) {
    return <p>En feil oppstod: {error}</p>;
  }

  if (bookings.length === 0) {
    return <p>Ingen bookinger funnet.</p>;
  }

  return (
    <div>
      <h2>Kommende bookinger (fake API)</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.title}</strong>
            <br />
            {booking.start} – {booking.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;