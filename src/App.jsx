import Header from "./components/Header"
import Button from './components/Button'
import ApiExample from './components/ApiExample'; 

function App() {
  return (
    <div>
      <Header />
      <p> Heisann hoppsann!</p>
      <h2> Velkommen til Villa Las Chicas!</h2>

      <p>Test av React-komponent med knapp:</p>
      <Button />
      <p>Under ser du et enkelt eksempel på et API-kall:</p>

      <ApiExample />
    </div>
  )
}

export default App