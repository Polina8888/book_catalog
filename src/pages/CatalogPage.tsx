import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '../api/GoogleBooksApi.ts'
import type { BooksResponse } from '../api/GoogleBooksApi.ts'
import { useDebounce } from '../hooks/useDebounce.ts'

function CatalogPage() {
  const [rawSearch, setRawSearch] = useState('react')
  const search = useDebounce(rawSearch, 500)
  
  const { isLoading, error } = useQuery<BooksResponse, Error>({
    queryKey: ['books', search],
    queryFn: () => fetchBooks(search, 0),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <input
      value={rawSearch}
      onChange={(e) => setRawSearch(e.target.value)}
      placeholder="Search books"
    />
  )
}

export default CatalogPage
