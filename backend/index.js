// backend/index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const ical = require('ical');

// Bruk node-fetch v2
const fetch = require('node-fetch'); // viktig: etter npm install node-fetch@2

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

const AIRBNB_ICAL_URL = process.env.AIRBNB_ICAL_URL;
const BOOKING_COM_ICAL_URL = process.env.BOOKING_COM_ICAL_URL;
// Kan legge til flere senere, f.eks. OTHER_ICAL_URL

console.log('AIRBNB_ICAL_URL:', AIRBNB_ICAL_URL || '(ikke satt)');
console.log('BOOKING_COM_ICAL_URL:', BOOKING_COM_ICAL_URL || '(ikke satt)');


if (!AIRBNB_ICAL_URL) {
  console.warn('ADVARSEL: AIRBNB_ICAL_URL er ikke satt i .env-filen.');
}

if (!BOOKING_COM_ICAL_URL) {
  console.warn('ADVARSEL: BOOKING_COM_ICAL_URL er ikke satt i .env-filen.');
}

async function fetchCalendarFromUrl(url, sourceName) {
  if (!url) {
    console.warn(`Ingen URL satt for ${sourceName}, hopper over.`);
    return [];
  }

  console.log(`Henter iCal fra (${sourceName}):`, url);
  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error(`Feil ved henting av iCal (${sourceName}):`, response.status, text);
    return [];
  }

  const icsText = await response.text();
  console.log(`Lengde på iCal-tekst (${sourceName}):`, icsText.length);

  const parsed = ical.parseICS(icsText);

  const events = Object.values(parsed)
    .filter((event) => event.type === 'VEVENT')
    .map((event) => ({
      id: event.uid || event.summary,
      summary: event.summary,
      start: event.start,
      end: event.end,
      description: event.description || '',
      location: event.location || '',
      source: sourceName,        // ← viktig: merk med kilde
    }));

  console.log(`Antall events (${sourceName}):`, events.length);
  return events;
}

app.get('/api/calendar', async (req, res) => {
  try {
    // Hent fra hver kilde (de som er satt)
    const [airbnbEvents, bookingEvents] = await Promise.all([
      fetchCalendarFromUrl(AIRBNB_ICAL_URL, 'airbnb'),
      fetchCalendarFromUrl(BOOKING_COM_ICAL_URL, 'booking'),
      // Kan legge til flere senere
    ]);

    // Slå sammen alle events
    const allEvents = [...airbnbEvents, ...bookingEvents];

    // (valgfritt) sortér etter startdato
    allEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

    res.json({ events: allEvents });
  } catch (error) {
    console.error('Feil i /api/calendar:', error);
    res.status(500).json({ error: 'Intern serverfeil' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend kjører på http://localhost:${PORT}`);
});