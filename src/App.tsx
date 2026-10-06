import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Apartamentos from './pages/Apartamentos'
import Detalle from './pages/Detalle'
import Simulador from './pages/Simulador'
import Comparador from './pages/Comparador'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartamentos" element={<Apartamentos />} />
          <Route path="/apartamentos/:id" element={<Detalle />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
