import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBookById } from "../api/GoogleBooksApi";
import type { Book } from "../types";
import CartIcon from "../../cart/CartIcon";
import { cartSlice } from '../../cart/cartSlice.ts'
import { useAppDispatch } from '../../../store.ts'
import { Spinner } from "react-bootstrap";
import type { CartItem } from '../../cart/types.ts'
import AlertComponent from "../components/Alert.tsx";
import placeholderImg from "../../../assets/placeholder_book.png";
import SanitizedDescription from "../components/Sanitized.tsx";
import styles from '../css-modules/BookPage.module.css'


function BookPage() {
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useAppDispatch();

  const handleAddToCart = (book: Book | undefined): void => {
    if (!book) {
      return;
    }
    const { id, volumeInfo, price } = book;
    const cartItem: CartItem = {
      id,
      title: volumeInfo.title,
      price,
      amount: 1,
    }
    dispatch(cartSlice.actions.addItem(cartItem))
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id!),
    enabled: !!id,
  })

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" className="m-5" />
    </div>
  )

  if (isError) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <p>An error occurred</p>
    </div>
  )
  return (
    <div className={styles.container}>
      <div className={styles.alertWrapper}>
        <AlertComponent showAlert={showAlert} />
      </div>

      <div className={styles.floatingCart}>
        <CartIcon />
      </div>

      <div className={styles.bookLayout}>
        <div className={styles.imageWrapper}>
          <img
            src={data?.volumeInfo.imageLinks?.thumbnail ?? placeholderImg}
            className={styles.bookImage}
            alt={data?.volumeInfo.title}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>{data?.volumeInfo.title}</h1>
            {data?.volumeInfo.authors && (
              <h5 className={styles.authors}>
                {data?.volumeInfo.authors.join(", ")}
              </h5>
            )}
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.price}>${data?.price ?? "0.00"}</span>
          </div>

          <div className={styles.descriptionBox}>
            {data?.volumeInfo.description ?
              <SanitizedDescription htmlContent={data?.volumeInfo.description}></SanitizedDescription>
              : "Описание отсутствует."}
          </div>

          <button
            type="button"
            className={styles.addToCartBtn}
            onClick={() => {
              handleAddToCart(data);
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 1500);
            }}
          >
            Add to the cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
