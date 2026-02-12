import type { Book } from '../types.ts'
import { cartSlice } from '../../cart/cartSlice.ts'
import { useAppDispatch } from '../../../store.ts'
import type { CartItem } from '../../cart/types.ts'

interface BooksList {
    books: Book[] | undefined
    isLoading: boolean
    isError: boolean

}

function BooksList({ books, isLoading, isError }: BooksList) {
    const dispatch = useAppDispatch();
    // const cart = useAppSelector((state) => state.cart)

    const handleAddToCart = (book: Book): void => {
        const { id, volumeInfo, price } = book;
        const cartItem: CartItem = {
            id,
            title: volumeInfo.title,
            price,
            amount: 1,
        }
        dispatch(cartSlice.actions.addItem(cartItem))
        // console.log(cart)
        // console.log('Added to cart')
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>An error occurred</p>

    return (
        <>
            {books?.length === 0 && (
                <p>Unfortunately, nothing was found for your request.</p>
            )}
            <ul>
                {books?.map(item => (
                    <li key={item.id}>
                        <button className='btn btn-primary' onClick={() => handleAddToCart(item)}>Add to cart</button>
                        <p>{item.volumeInfo.title}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BooksList
