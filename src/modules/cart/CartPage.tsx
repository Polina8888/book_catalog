import { useAppDispatch } from "../../store"
import { cartSlice } from "./cartSlice"
import { useAppSelector } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import styles from './Cart.module.css'

function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { items, totalCount, totalPrice } = cart;

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h3>Your cart is empty</h3>
          <p>Start shopping to fill your cart</p>
          <Link to="/" className={styles.backLink}>
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();
  
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        
        <header className={styles.header}>
          <h1 className={styles.title}>Cart</h1>
          <button className={styles.clearBtn} onClick={() => dispatch(cartSlice.actions.clearCart())}>
            Clear cart
          </button>
        </header>

        <ul className={styles.cartList}>
          {items.map((item) => (
            <li key={item.id} className={styles.cartItem} onClick={() => navigate(`/books/${item.id}`)}>
              
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <span className={styles.itemPrice}>{item.price} $</span>
              </div>

              <div className={styles.controls}>
                <button
                  className={`${styles.qtyBtn} ${styles.danger}`}
                  onClick={() => dispatch(cartSlice.actions.removeItem(item.id))}
                  aria-label="Decrease amount"
                >
                  −
                </button>

                <span className={styles.qtyValue}>{item.amount}</span>

                <button
                  className={styles.qtyBtn}
                  onClick={() => dispatch(cartSlice.actions.addItem(item))}
                  aria-label="Increase amount"
                >
                  +
                </button>

                <span className={styles.itemTotal}>
                  {item.price * item.amount} $
                </span>
              </div>
            </li>
          ))}
        </ul>

        <footer className={styles.footer}>
          <div className={styles.totalRow}>
            <span>Total items:</span>
            <span>{totalCount}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.final}`}>
            <span>Total price:</span>
            <span>{totalPrice} $</span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default CartPage
