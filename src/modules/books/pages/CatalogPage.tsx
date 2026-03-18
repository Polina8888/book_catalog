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
import styles from '../css-modules/CatalogPage.module.css'

function CatalogPage() {
  const dispatch = useAppDispatch();
  const { search, category, sortBy } = useAppSelector((state) => state.books);
  const [rawSearch, setRawSearch] = useState(search);

  const { ref, inView } = useInView()

  const debouncedSearch = useDebounce(rawSearch, 500);

  useEffect(() => {
    console.log('debaounced')
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
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>
            GoogleBooks
          </span>

          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>
            <label htmlFor="search-input" className="visually-hidden">
              Search books
            </label>
            <input
              id="search-input"
              type="search"
              className={styles.search}
              value={rawSearch}
              onChange={(e) => setRawSearch(e.target.value)}
              placeholder="Search by keywords or author…"
              aria-label="Search books"
            />
          </div>

          <CartIcon></CartIcon>
        </div>
      </header>

      <div className={styles.filtersBar}>
        <BooksFilters category={category} sortBy={sortBy} />
      </div>

      <main className={styles.main}>

        <BooksList books={data} isLoading={isLoading} isError={!!error} />

        {hasNextPage && (
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            className={styles.loadingButton}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading…' : 'Load more'}
          </button>
        )}
      </main>
    </div>
  )
}

export default CatalogPage
