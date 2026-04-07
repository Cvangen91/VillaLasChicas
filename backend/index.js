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
  origin: 'http://localhost:5174',
}));

const AIRBNB_ICAL_URL = process.env.AIRBNB_ICAL_URL;
console.log('AIRBNB_ICAL_URL:', AIRBNB_ICAL_URL || '(ikke satt)');

if (!AIRBNB_ICAL_URL) {
  console.warn('ADVARSEL: AIRBNB_ICAL_URL er ikke satt i .env-filen.');
}

app.get('/api/calendar', async (req, res) => {
  try {
    if (!AIRBNB_ICAL_URL) {
      return res.status(500).json({ error: 'AIRBNB_ICAL_URL er ikke konfigurert' });
    }

    console.log('Henter iCal fra:', AIRBNB_ICAL_URL);
    const response = await fetch(AIRBNB_ICAL_URL);

    console.log('Svar fra Airbnb status:', response.status);
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('Feil ved henting av iCal:', response.status, text);
      return res.status(500).json({ error: 'Klarte ikke å hente kalender fra Airbnb' });
    }

    const icsText = await response.text();
    console.log('Lengde på iCal-tekst:', icsText.length);

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
      }));

    console.log('Antall events:', events.length);
    res.json({ events });
  } catch (error) {
    console.error('Feil i /api/calendar:', error);
    res.status(500).json({ error: 'Intern serverfeil' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend kjører på http://localhost:${PORT}`);
});