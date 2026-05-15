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
    <div className={styles.page}>

      <div className={styles.topBar}>
        <CartIcon />
      </div>

      <AlertComponent showAlert={showAlert} />

      <div className={`container ${styles.container}`}>
        <div className={`card shadow-sm border-0 ${styles.bookCard}`}>

          <div className="row g-4 align-items-start">

            <div className="col-12 col-md-5 col-lg-4">
              <div className={styles.imageWrapper}>
                <img
                  src={data?.volumeInfo.imageLinks?.thumbnail ?? placeholderImg}
                  className={styles.bookImage}
                  alt={data?.volumeInfo.title}
                />
              </div>
            </div>

            <div className="col-12 col-md-7 col-lg-8">
              <div className={styles.content}>

                <div>
                  <h1 className={styles.title}>
                    {data?.volumeInfo.title}
                  </h1>

                  {!!data?.volumeInfo.authors?.length && (
                    <p className={styles.authors}>
                      {data.volumeInfo.authors.join(", ")}
                    </p>
                  )}
                </div>

                <div className={styles.price}>
                  ${data?.price}
                </div>

                <div className={styles.description}>
                  {data?.volumeInfo.description
                    ? (
                      <SanitizedDescription
                        htmlContent={data.volumeInfo.description}
                      />
                    )
                    : 'Description unavailable'}
                </div>

                <button
                  className="btn btn-dark btn-lg"
                  onClick={() => {
                    handleAddToCart(data);
                    setShowAlert(true);
                    setTimeout(() => setShowAlert(false), 1500);
                  }}
                >
                  Add to cart
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
