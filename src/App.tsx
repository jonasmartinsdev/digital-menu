import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './contexts/CartContext'
import { Home } from './pages/Home'
import { Router } from './Router'

export function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartContextProvider>
  )
}
