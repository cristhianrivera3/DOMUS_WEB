import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('DOMUS ErrorBoundary', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="container detalle-404">
          <div className="vacio card">
            <div className="vacio__icon" aria-hidden="true">
              🧭
            </div>
            <h3>Algo salió mal</h3>
            <p>Recarga la página o vuelve al inicio para seguir explorando.</p>
            <a href="/" className="btn btn--primary">
              Volver al inicio
            </a>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}
