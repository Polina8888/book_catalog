import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchBooks } from '../api/GoogleBooksApi.ts'
import type { BooksResponse } from '../api/GoogleBooksApi.ts'
import type { Book } from '../types.ts'
import { useDebounce } from '../../../hooks/useDebounce.ts'
import { useAppSelector } from '../../../store.ts'
import { BooksFilters } from '../components/BooksFilter.tsx'
import BooksList from '../components/BooksList.tsx'
import { Link } from 'react-router-dom'

function CatalogPage() {
  const [rawSearch, setRawSearch] = useState<string>('');
  const [effectiveSearch, setEffectiveSearch] = useState<string>('')

  const debouncedSearch = useDebounce(rawSearch, 500);
  const maxResults = '40';
  const { category, sortBy } = useAppSelector((state) => state.books);

  useEffect(() => {
    if (debouncedSearch.trim().length > 0) {
      setEffectiveSearch(debouncedSearch)
    }
  }, [debouncedSearch])

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      BooksResponse,
      Error,
      Book[],
      string[],
      number
    >({
      queryKey: ['books', effectiveSearch, category, sortBy, maxResults],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => fetchBooks(effectiveSearch, category, sortBy, pageParam, Number(maxResults)),
      getNextPageParam: (lastPage, pages) => {
        const loadedItems = pages.reduce((acc, page) => acc + page.items.length, 0);

        return loadedItems < lastPage.totalItems ? loadedItems : undefined
      },
      select: (data) => {
        const items = data.pages.flatMap((page) => page.items);
        return items.map((item) => {
          return { ...item, price: Math.round(Math.random() * 10000) }
        })
      },
      enabled: !(effectiveSearch.trim().length === 0 && category === 'all'),
    })

  if (error) {
    console.log(error);
  }

  return (
    <div className='vh-100 d-flex flex-column justify-content-center align-items-center'>
      <input
        value={rawSearch}
        onChange={(e) => setRawSearch(e.target.value)}
        placeholder="Search books"
      />
      <BooksFilters category={category} sortBy={sortBy}></BooksFilters>
      <BooksList books={data} isLoading={isLoading} isError={error ? true : false}></BooksList>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
      <Link to="/cart">Cart</Link>
    </div>
  )
}

export default CatalogPage
