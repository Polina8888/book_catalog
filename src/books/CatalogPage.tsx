import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchBooks } from './GoogleBooksApi.ts'
import type { BooksResponse } from './GoogleBooksApi.ts'
import type { Book } from './types.ts'
import { useDebounce } from '../hooks/useDebounce.ts'

function CatalogPage() {
  const [rawSearch, setRawSearch] = useState('react')
  const search = useDebounce(rawSearch, 500)
  const maxResults = '40';

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      BooksResponse,
      Error,
      Book[],
      string[],
      number
    >({
      queryKey: ['books', search, maxResults],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => fetchBooks(search, pageParam, Number(maxResults)),
      getNextPageParam: (lastPage, pages) => {
        const loadedItems = pages.reduce((acc, page) => acc + page.items.length, 0);

        return loadedItems < lastPage.totalItems ? loadedItems : undefined
      },
      select: (data) => 
        data.pages.flatMap((page) => page.items),
    })

  if (isLoading) return <p>Loading...</p>
  if (error) console.log(error)
  if (error) return <p>Error</p>

  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <input
        value={rawSearch}
        onChange={(e) => setRawSearch(e.target.value)}
        placeholder="Search books"
      />
      <ul>
        {data?.map(item => (
          <li key={item.id}>
            {item.volumeInfo.title}
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>

  )
}

export default CatalogPage
