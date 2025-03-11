import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CryptoDetails from './pages/CryptoDetails'
import Compare from './pages/Compare'
import Education from './pages/Education'
import NotFound from './pages/NotFound'
import { CryptoProvider } from './context/CryptoContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <CryptoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="crypto/:id" element={<CryptoDetails />} />
            <Route path="compare" element={<Compare />} />
            <Route path="education" element={<Education />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CryptoProvider>
    </ThemeProvider>
  )
}

export default App