import type { Book } from '../types.ts'
import { cartSlice } from '../../cart/cartSlice.ts'
import { useAppDispatch } from '../../../store.ts'
import type { CartItem } from '../../cart/types.ts'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AlertComponent from './Alert.tsx'

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
        <p>Loading...</p>
    </div>
    if (isError) return <div className='d-flex justify-content-center align-items-center'>
        <p>An error occurred</p>
    </div>

    return (
        <>
            {books?.length === 0 && (
                <div className='d-flex justify-content-center align-items-center'>
                    <p>Unfortunately, nothing was found for your request.</p>
                </div>
            )}

            <AlertComponent showAlert={showAlert}></AlertComponent>

            {books?.map(item => (
                <div className='col' key={item.id}>
                    <div className="card h-100 border p-2"
                        style={{ height: "300px", width: '230px' }}
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
                                <button className="btn btn-primary w-100"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(item);
                                        setShowAlert(true);
                                        setTimeout(() => setShowAlert(false), 500)
                                    }}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default BooksList
