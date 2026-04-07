import PageLayout from '../components/layout/PageLayout'
import CalendarEvents from '../components/sections/Calendar'
import BookingCalendar from '../components/sections/BookingCalendar'


function Home({ texts, setLanguage, language }) {
  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <h1>{texts.home.title}</h1>
      <p>{texts.home.subtitle}</p>
       <CalendarEvents texts={texts} />
       <BookingCalendar texts={texts} />
    </PageLayout>
  )
}

export default Home