import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ComparadorBar from './components/ComparadorBar'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import CookieConsent from './components/CookieConsent'
import { ComparadorProvider } from './context/ComparadorContext'
import { FavoritosProvider } from './context/FavoritosContext'

const Home = lazy(() => import('./pages/Home'))
const Apartamentos = lazy(() => import('./pages/Apartamentos'))
const Detalle = lazy(() => import('./pages/Detalle'))
const Simulador = lazy(() => import('./pages/Simulador'))
const Comparador = lazy(() => import('./pages/Comparador'))
const Favoritos = lazy(() => import('./pages/Favoritos'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Privacidad = lazy(() => import('./pages/Privacidad'))
const Terminos = lazy(() => import('./pages/Terminos'))

function RouteFallback() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      Cargando…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ComparadorProvider>
        <FavoritosProvider>
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          <ScrollToTop />
          <Header />
          <main className="main" id="contenido">
            <ErrorBoundary>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/apartamentos" element={<Apartamentos />} />
                  <Route path="/apartamentos/:id" element={<Detalle />} />
                  <Route path="/simulador" element={<Simulador />} />
                  <Route path="/comparador" element={<Comparador />} />
                  <Route path="/favoritos" element={<Favoritos />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/privacidad" element={<Privacidad />} />
                  <Route path="/terminos" element={<Terminos />} />
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
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
          <ComparadorBar />
          <CookieConsent />
        </FavoritosProvider>
      </ComparadorProvider>
    </BrowserRouter>
  )
}
