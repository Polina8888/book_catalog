import { Routes, Route } from 'react-router-dom'
import CatalogPage from '../books/CatalogPage.tsx';
import BookPage from '../books/BookPage.tsx';
import CartPage from '../cart/CartPage.tsx';

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
