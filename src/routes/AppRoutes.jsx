import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'

function AppRoutes({ language, setLanguage, texts }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            language={language}
            setLanguage={setLanguage}
            texts={texts}
          />
        }
      />
      <Route
        path="/about"
        element={
          <About
            language={language}
            setLanguage={setLanguage}
            texts={texts}
          />
        }
      />
      <Route
        path="/contact"
        element={
          <Contact
            language={language}
            setLanguage={setLanguage}
            texts={texts}
          />
        }
      />
    </Routes>
  )
}

export default AppRoutes