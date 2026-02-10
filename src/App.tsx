import { Routes, Route } from 'react-router-dom'
import CatalogPage from './modules/books/pages/CatalogPage.tsx';
import BookPage from './modules/books/pages/BookPage.tsx';
import CartPage from './modules/cart/CartPage.tsx';

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
