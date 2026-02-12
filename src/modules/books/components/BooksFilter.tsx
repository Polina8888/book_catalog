import { useAppDispatch } from '../../../store.ts';
import { booksSlice } from '../booksSlice.ts';

interface BooksFiltersProps {
  category: string
  sortBy: 'relevance' | 'newest'
}

export function BooksFilters({ category, sortBy }: BooksFiltersProps) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <select
        value={category}
        onChange={e => dispatch(booksSlice.actions.setCategory(e.target.value))}
      >
        <option value="all">All</option>
        <option value="art">Art</option>
        <option value="biography">Biography</option>
        <option value="computers">Computers</option>
      </select>

      <select
        value={sortBy}
        onChange={e => dispatch(booksSlice.actions.setSortBy(e.target.value as 'relevance' | 'newest'))}
      >
        <option value="relevance">Relevance</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  )
}
