import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchBooks } from '../api/GoogleBooksApi.ts'
import type { BooksResponse } from '../api/GoogleBooksApi.ts'
import type { Book } from '../types.ts'
import { useDebounce } from '../../../hooks/useDebounce.ts'
import { useAppSelector } from '../../../store.ts'
import { useAppDispatch } from '../../../store.ts';
import { booksSlice } from '../booksSlice.ts';
import { BooksFilters } from '../components/BooksFilter.tsx'
import { useInView } from 'react-intersection-observer'
import BooksList from '../components/BooksList.tsx'
import CartIcon from '../../cart/CartIcon.tsx'

function CatalogPage() {
  const dispatch = useAppDispatch();
  const { search, category, sortBy } = useAppSelector((state) => state.books);
  const [rawSearch, setRawSearch] = useState(search);

  const { ref, inView } = useInView()

  const debouncedSearch = useDebounce(rawSearch, 500);

  useEffect(() => {
    dispatch(booksSlice.actions.setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    setRawSearch(search);
  }, [search]);

  const maxResults = 40;

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      BooksResponse,
      Error,
      Book[],
      (string | number)[],
      number
    >({
      queryKey: ['books', search, category, sortBy, maxResults],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => fetchBooks(search, category, sortBy, pageParam, maxResults),
      getNextPageParam: (lastPage, pages) => {
        const loadedItems = pages.reduce((acc, page) => acc + page.items.length, 0);

        return loadedItems < lastPage.totalItems ? loadedItems : undefined
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.items);
      },
      enabled: !(search.trim().length === 0 && category === 'all'),
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ padding: '2.5rem' }}>
      <label htmlFor="search-input" className="visually-hidden">
        Search books
      </label>
      <div className='mb-4'>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search text-muted" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
          <input
            id="search-input"
            type="search"
            className="form-control border-start-0"
            value={rawSearch}
            onChange={(e) => setRawSearch(e.target.value)}
            placeholder="Search books"
            aria-label="Search books"
          />
        </div>

        <CartIcon></CartIcon>
      </div>
      <BooksFilters category={category} sortBy={sortBy}></BooksFilters>
      <div className='container mb-4'>
        <div className='row gy-4'>
          <BooksList books={data} isLoading={isLoading} isError={error ? true : false}></BooksList>
        </div>
      </div>

      {hasNextPage && (
        <button
          ref={ref}
          className='btn btn-primary'
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
