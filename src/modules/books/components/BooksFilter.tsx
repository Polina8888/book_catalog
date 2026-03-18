import { useAppDispatch } from '../../../store.ts';
import { booksSlice } from '../booksSlice.ts';
import styles from '../css-modules/CatalogPage.module.css'

const categories: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'art', label: 'Art' },
  { value: 'biography', label: 'Biography' },
  { value: 'computers', label: 'Computers' },
]

const sorts: { value: 'relevance' | 'newest', label: string }[] = [
  { label: 'By relevance', value: 'relevance' },
  { label: 'By newest', value: 'newest' }
]

interface BooksFiltersProps {
  category: string
  sortBy: 'relevance' | 'newest'
}

export function BooksFilters({ category, sortBy }: BooksFiltersProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.filtersWrapper}>
      <div className='d-flex gap-2'>
        {categories.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.chip} ${category === value ? styles.chipActive : ''}`}
            onClick={() => dispatch(booksSlice.actions.setCategory(value))}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='d-flex gap-2'>
        {sorts.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.chip} ${sortBy === value ? styles.chipActive : ''}`}
            onClick={() => dispatch(booksSlice.actions.setSortBy(value))}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
