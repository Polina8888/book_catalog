import type { Book } from '../types.ts'

interface BooksList {
    books: Book[] | undefined
    isLoading: boolean
    isError: boolean

}

function BooksList({ books, isLoading, isError }: BooksList) {
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
                        {item.volumeInfo.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BooksList
