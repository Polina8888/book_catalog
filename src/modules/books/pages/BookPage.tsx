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



function BookPage() {
  // const [book, setBook] = useState<Book>();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
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

  // useEffect(() => {
  //   if (!id) return;

  //   setLoading(true);

  //   getBookById(id)
  //     .then(data => {
  //       setBook(data);
  //       console.log(data)
  //     })
  //     .catch(() => setError("Failed to load book"))
  //     .finally(() => setLoading(false));
  // }, [id])

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
    <div className="d-flex justify-content-center align-items-center vh-100 scroll">
      <CartIcon />
      <AlertComponent showAlert={showAlert}></AlertComponent>
      <div className="container">
        <div className="row gy-4">
          <div className="col-sm col-md-6 d-flex flex-column justify-content-start gap-4">
            <div className="d-flex flex-column gap-2">
              <h1 className="mb-0">{data?.volumeInfo.title}</h1>
              {data?.volumeInfo.authors?.map((author) => (
                <h5 key={author} className="mb-1">
                  {author}
                </h5>
              ))}
            </div>
          </div>
          <div className="col-sm col-md-6 d-flex align-items-center">
            <h1>{data?.price} $</h1>
          </div>
          <div className="col-sm col-md-6">
            <div
              className="bg-light p-2"
              style={{ maxWidth: "25rem", height: "25rem" }}
            >
              <img
                src={
                  data?.volumeInfo.imageLinks?.thumbnail ??
                  "../../../assets/placeholder_book.png"
                }
                className="w-100 h-100 object-fit-contain"
                alt={data?.volumeInfo.title}
              />
            </div>
          </div>
          <div className="col-sm col-md-6 d-flex flex-column gap-4">
            <div className="container p-4 border scroll" style={{ height: '50vh'}}>{data?.volumeInfo.description}</div>
            <button className="btn btn-primary w-100"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(data);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 1000)
              }}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookPage;
