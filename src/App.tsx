import { Routes, Route } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage.tsx';
import BookPage from './pages/BookPage.tsx';
import CartPage from './pages/CartPage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/book/:id" element={<BookPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}

export default App
