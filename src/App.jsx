import Header from "./components/Header"
import Button from './components/Button'
import ApiExample from './components/ApiExample'
import BookingList from './components/BookingList'; 

function App() {
  return (
    <div>
      <Header />
      <p> Heisann hoppsann!</p>
      <h2> Velkommen til Villa Las Chicas!</h2>

      <p>Test av React-komponent med knapp:</p>
      <Button text={"Klikk deg"} />
      <Button text={"Klikk"} />
      <Button text={"Klikk hei"} />
      <p>Under ser du et enkelt eksempel på et API-kall:</p>

      <ApiExample />

       <p>Under ser du en enkel liste med "bookinger" hentet fra et API:</p>
      <BookingList />
    </div>
  )
}

export default App