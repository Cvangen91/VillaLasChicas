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
- [Backend](#backend)
- [Must knows](#must-knows)

---

## Tech-stack

| Teknologi | Versjon | Bruksområde |
|---|---|---|
| [React](https://react.dev/) | v19 | UI-rammeverk |
| [Vite](https://vite.dev/) | v7 | Byggeverktøy og utviklingsserver |
| [React Router](https://reactrouter.com/) | v7 | Klient-side routing |
| [FullCalendar](https://fullcalendar.io/) | v6 | Kalenderkomponent for bookingstatus |
| [Express](https://expressjs.com/) | v5 | Backend-server for iCal-integrasjon |

---

## Forutsetninger

- **Node.js** v18 eller nyere
- **npm** (følger med Node.js)
- Starter opp backend med riktige miljøvariabler (se [Miljøvariabler](#miljøvariabler))

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

### Backend (`.env` i `villalaschicas/backend/`)

Opprett en `.env`-fil i `backend/`-mappen med følgende variabler:

```env
AIRBNB_ICAL_URL=<iCal-URL fra Airbnb>
BOOKING_COM_ICAL_URL=<iCal-URL fra Booking.com>
```


---

## Filstruktur

```
villalaschicas/
├── backend/                 # Express-backend for iCal-integrasjon
│   ├── index.js             # Serverlogikk – henter og eksponerer iCal-data
│   ├── .env                 # iCal-URLer (ikke i git)
│   └── package.json
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
│   │       ├── BookingCalendar.jsx  # Kalender med bookingstatus fra iCal via backend
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

## Backend - Express

Prosjektet har en egen Express-server som henter bookingdata fra Airbnb og Booking.com via iCal og eksponerer det til frontend via `/api/calendar` på port 4000.

**Backenden må kjøres i en egen terminal** ved siden av frontend-serveren for at kalendervisningen skal fungere.

```bash
# I en egen terminal – naviger til backend-mappen
cd villalaschicas/backend

# Installer avhengigheter (kun første gang)
npm install

# Start backenden
node index.js
```

Backenden kjører på [http://localhost:4000](http://localhost:4000). Husk å opprette `.env`-filen i `backend/`-mappen med riktige iCal-URLer (se [Miljøvariabler](#miljøvariabler)).

### Starte prosjektet (totalt to terminaler)

| Terminal | Kommando | Hva den gjør |
|---|---|---|
| Terminal 1 | `cd villalaschicas && npm run dev` | Starter frontend på port 5173 |
| Terminal 2 | `cd villalaschicas/backend && node index.js` | Starter backend på port 4000 |


## Must knows

**Bilder og video ligger i `/bilder`-mappen**
Statiske mediefiler (bilder og hero-video) importeres direkte i komponentene fra `../../bilder/`. Denne mappen er ikke under `src/` og håndteres ikke av Vite som en del av asset-pipelinen på vanlig måte.

**Booking-lenker må oppdateres**
I [src/pages/Home.jsx](src/pages/Home.jsx) er det hardkodede URL-er til Airbnb og Booking.com. Booking.com-lenken er en plassholder og må erstattes med korrekt URL.

**Miljøvariabler må starte med `VITE_`**
Vite eksponerer kun miljøvariabler som starter med `VITE_` til klientkoden. Variabler uten dette prefikset vil ikke være tilgjengelige i nettleseren.

**All tekst på siden hentes fra `locales/`**
Ingen tekst er hardkodet i komponentene. All synlig tekst hentes fra `texts`-objektet som sendes som props, og stammer fra oversettelsesfilene i `src/locales/`.
