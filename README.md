# Villa Las Chicas – Prosjektdokumentasjon

Nettside for Villa Las Chicas, en eksklusiv feriebolig i Fuengirola, Málaga. Besøkende kan bla gjennom informasjon om villaen, se bilder og fasiliteter, sjekke tilgjengelighet via en kalender, og gå direkte til booking på Airbnb eller Booking.com.

Prosjektet er utviklet som bacheloroppgave ved Universitetet i Sør-Øst Norge.

---

## Innholdsfortegnelse

- [Tech-stack](#tech-stack)
- [Forutsetninger](#forutsetninger)
- [Kom i gang](#kom-i-gang)
- [Miljøvariabler](#miljøvariabler)
- [Filstruktur](#filstruktur)
- [Routing og sider](#routing-og-sider)
- [Flerspråklig støtte](#flerspråklig-støtte)
- [Backend – Supabase](#backend--supabase)
- [Must knows](#must-knows)

---

## Tech-stack

| Teknologi | Versjon | Bruksområde |
|---|---|---|
| [React](https://react.dev/) | v19 | UI-rammeverk |
| [Vite](https://vite.dev/) | v7 | Byggeverktøy og utviklingsserver |
| [React Router](https://reactrouter.com/) | v7 | Klient-side routing |
| [FullCalendar](https://fullcalendar.io/) | v6 | Kalenderkomponent for bookingstatus |
| [Supabase](https://supabase.com/) | – | Backend: database og API for bookingkalender |

---

## Forutsetninger

- **Node.js** v18 eller nyere
- **npm** (følger med Node.js)
- Tilgang til prosjektets Supabase-prosjekt (se [Miljøvariabler](#miljøvariabler))

---

## Kom i gang

```bash
# 1. Pakk ut zip-filen og naviger til prosjektmappen
cd villalaschicas

# 2. Installer avhengigheter
npm install

# 3. Opprett miljøvariabelfil (se seksjonen under)
# Opprett en fil som heter .env i prosjektmappen med innholdet beskrevet nedenfor

# 4. Start utviklingsserveren
npm run dev
```

Åpne [http://localhost:5173](http://localhost:5173) i nettleseren.

### Tilgjengelige skript

| Kommando | Beskrivelse |
|---|---|
| `npm run dev` | Start lokal utviklingsserver med hot reload |
| `npm run build` | Bygg produksjonsklar versjon til `/dist` |
| `npm run preview` | Forhåndsvis produksjonsbygget lokalt |
| `npm run lint` | Kjør ESLint for å sjekke kodekvalitet |

---

## Miljøvariabler

Opprett en `.env`-fil i prosjektrotens mappe med følgende variabler:

```env
VITE_SUPABASE_URL=https://<ditt-prosjekt>.supabase.co
VITE_SUPABASE_ANON_KEY=<din-anon-nøkkel>
```

---

## Filstruktur

```
villalaschicas/
├── pictures/                # Bilder og videoer brukt på nettsiden
├── public/                  # Statiske filer som serveres direkte
├── src/
│   ├── components/
│   │   ├── layout/          # Globale layoutkomponenter
│   │   │   ├── Navbar.jsx         # Navigasjonsmeny med språkvelger
│   │   │   ├── Footer.jsx         # Bunntekst med kontaktinfo og lenker
│   │   │   ├── PageLayout.jsx     # Felles wrapper rundt sideinnhold
│   │   │   └── ScrollToTop.jsx    # Scroller til toppen ved rutebytte
│   │   └── sections/        # Gjenbrukbare innholdsseksjoner
│   │       ├── BookingCalendar.jsx  # Kalender med bookingstatus fra Supabase
│   │       ├── CalendarEvents.jsx   # Henter og formaterer bookingdata
│   │       └── ImageGallery.jsx     # Bildekarusell med forstørring
│   ├── locales/             # Oversettelsesstrenger for alle språk
│   │   ├── no.js            # Norsk
│   │   ├── en.js            # Engelsk
│   │   └── es.js            # Spansk
│   ├── pages/               # En fil per side/rute
│   │   ├── Home.jsx         # Forsiden: hero, features, galleri og booking
│   │   ├── About.jsx        # Om villaen: info, fasiliteter, kart og FAQ
│   │   └── Contact.jsx      # Kontaktside med skjema
│   ├── routes/
│   │   └── AppRoutes.jsx    # Samlet rutekonfigurasjon
│   ├── App.jsx              # Rotkomponent – håndterer språktilstand
│   ├── App.css              # Globale CSS-stiler
│   ├── index.css            # CSS-variabler og reset
│   └── main.jsx             # Inngangspunkt – renderer App til DOM
├── .env                     # Miljøvariabler (ikke i git)
├── Index.html               # HTML-mal som Vite bruker
├── vite.config.js           # Vite-konfigurasjon
└── package.json
```

---

## Routing og sider

Rutingen er satt opp i [src/routes/AppRoutes.jsx](src/routes/AppRoutes.jsx). Alle ruter er offentlige og krever ingen innlogging.

| Rute | Side | Beskrivelse |
|---|---|---|
| `/` | Home | Forsiden med hero-video, features, bildegalleri og bookingkalender |
| `/about` | About | Om villaen: fasiliteter, bilder, kart, FAQ og praktisk info |
| `/contact` | Contact | Kontaktskjema og kontaktinformasjon |

---

## Flerspråklig støtte

Nettsiden støtter tre språk: **norsk**, **engelsk** og **spansk**. Aktiv språkvalg lagres i state i `App.jsx` og sendes som props til alle sider og komponenter via `texts`-objektet.

Oversettelsesstrenger ligger i egne filer under [src/locales/](src/locales/):

| Fil | Språk |
|---|---|
| `no.js` | Norsk |
| `en.js` | Engelsk |
| `es.js` | Spansk |

Brukeren bytter språk via en velger i Navbar. Standard språk er engelsk.

---

## Backend – Supabase

Supabase brukes til å hente bookingdata for kalendervisningen. Klienten initialiseres via miljøvariablene i `.env`-filen.

### Databasetabeller

| Tabell | Beskrivelse |
|---|---|
| `bookings` | Bookede perioder med start- og sluttdato som vises i bookingkalenderen |

Resterende tabeller og informasjon finnes i rapporten.

---

## Must knows

**Bilder og video ligger i `/bilder`-mappen**
Statiske mediefiler (bilder og hero-video) importeres direkte i komponentene fra `../../bilder/`. Denne mappen er ikke under `src/` og håndteres ikke av Vite som en del av asset-pipelinen på vanlig måte.

**Booking-lenker må oppdateres**
I [src/pages/Home.jsx](src/pages/Home.jsx) er det hardkodede URL-er til Airbnb og Booking.com. Booking.com-lenken er en plassholder og må erstattes med korrekt URL.

**Miljøvariabler må starte med `VITE_`**
Vite eksponerer kun miljøvariabler som starter med `VITE_` til klientkoden. Variabler uten dette prefikset vil ikke være tilgjengelige i nettleseren.

**All tekst på siden hentes fra `locales/`**
Ingen tekst er hardkodet i komponentene. All synlig tekst hentes fra `texts`-objektet som sendes som props, og stammer fra oversettelsesfilene i `src/locales/`.
