import { Link } from 'react-router-dom';
import cartIcon from '../../assets/shopping-cart-outline-svgrepo-com(1).svg';
import styles from './Cart.module.css';
import { useAppSelector } from '../../store';

export default function Cart() {
  const totalCount = useAppSelector((state) => state.cart.totalCount);

  return (
    <Link to="/cart" className={styles.link}>
      <img src={cartIcon} alt="Cart" className={styles.icon} />
      {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
    </Link>
  );
}
