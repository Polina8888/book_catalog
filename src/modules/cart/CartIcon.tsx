import { Link } from 'react-router-dom';
import cartIcon from '../../assets/shopping-cart-outline-svgrepo-com(1).svg';
import './Cart.css';
import { useAppSelector } from '../../store';

export default function Cart() {
  const totalCount = useAppSelector((state) => state.cart.totalCount);

  return (
    <Link to="/cart" className="cart-link">
      <img src={cartIcon} alt="Cart" />
      {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
    </Link>
  );
}
