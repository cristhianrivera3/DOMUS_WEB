import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ComparadorBar from './components/ComparadorBar'
import { ComparadorProvider } from './context/ComparadorContext'
import Home from './pages/Home'
import Apartamentos from './pages/Apartamentos'
import Detalle from './pages/Detalle'
import Simulador from './pages/Simulador'
import Comparador from './pages/Comparador'
import Contacto from './pages/Contacto'

export default function App() {
  return (
    <BrowserRouter>
      <ComparadorProvider>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartamentos" element={<Apartamentos />} />
            <Route path="/apartamentos/:id" element={<Detalle />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/comparador" element={<Comparador />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="*"
              element={
                <section className="container detalle-404">
                  <div className="vacio card">
                    <div className="vacio__icon" aria-hidden="true">
                      🧭
                    </div>
                    <h3>Esta ruta no existe</h3>
                    <p>Parece que te perdiste. Volvamos a terreno firme.</p>
                    <Link to="/apartamentos" className="btn btn--primary">
                      Ver apartamentos disponibles
                    </Link>
                  </div>
                </section>
              }
            />
          </Routes>
        </main>
        <Footer />
        <ComparadorBar />
      </ComparadorProvider>
    </BrowserRouter>
  )
}
