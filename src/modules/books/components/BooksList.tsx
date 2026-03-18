import type { Book } from '../types.ts'
import { cartSlice } from '../../cart/cartSlice.ts'
import { useAppDispatch } from '../../../store.ts'
import type { CartItem } from '../../cart/types.ts'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import AlertComponent from './Alert.tsx'
import styles from '../css-modules/CatalogPage.module.css'

interface BooksList {
    books: Book[] | undefined
    isLoading: boolean
    isError: boolean

}

function BooksList({ books, isLoading, isError }: BooksList) {
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useAppDispatch();

    const handleAddToCart = (book: Book): void => {
        const { id, volumeInfo, price } = book;
        const cartItem: CartItem = {
            id,
            title: volumeInfo.title,
            price,
            amount: 1,
        }
        dispatch(cartSlice.actions.addItem(cartItem))
    }

    const navigate = useNavigate();

    if (isLoading) return <div className='d-flex justify-content-center align-items-center'>
        <Spinner animation="border" className='mt-5' />
    </div>
    if (isError) return <div className='d-flex justify-content-center align-items-center'>
        <p className='mt-5'>An error occurred</p>
    </div>

    return (
        <>
            {books?.length === 0 && (
                <div className='d-flex justify-content-center align-items-center'>
                    <p>Unfortunately, nothing was found for your request.</p>
                </div>
            )}

            <AlertComponent showAlert={showAlert}></AlertComponent>
            <div className={styles.grid}>
                {books?.map(item => (
                    <div className='col d-flex justify-content-center' key={item.id}>
                        <div className={`${styles.card} card h-100 border p-2`}
                            style={{ width: '15rem', cursor: 'pointer' }}
                            onClick={() => navigate(`/books/${item.id}`)}>
                            <div className="bg-light" style={{ height: "200px" }}>
                                <img
                                    src={item.volumeInfo.imageLinks?.thumbnail ?? '../../../assets/placeholder_book.png'}
                                    className="card-img-top object-fit-contain p-2"
                                    alt={item.volumeInfo.title}
                                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                                />
                            </div>

                            <div className="card-body d-flex flex-column">
                                <h6 className="card-title text-truncate-2">
                                    {item.volumeInfo.title}
                                </h6>

                                <div className="mt-auto">
                                    <p className="fw-bold mb-2">{item.price} $</p>
                                    <button className={styles.addBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(item);
                                            setShowAlert(true);
                                            setTimeout(() => setShowAlert(false), 1500)
                                        }}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BooksList
