import { useAppDispatch } from '../../../store.ts';
import { booksSlice } from '../booksSlice.ts';

interface BooksFiltersProps {
  category: string
  sortBy: 'relevance' | 'newest'
}

export function BooksFilters({ category, sortBy }: BooksFiltersProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="books-filter d-flex flex-column flex-md-row gap-3 mb-4">
      <div className="d-flex gap-3">
        <div style={{ minWidth: '180px' }}>
          <label htmlFor="category-select" className="visually-hidden">
            Filter by category
          </label>
          <select
            id="category-select"
            className="form-select"
            value={category}
            onChange={(e) =>
              dispatch(booksSlice.actions.setCategory(e.target.value))
            }
          >
            <option value="all">All categories</option>
            <option value="art">Art</option>
            <option value="biography">Biography</option>
            <option value="computers">Computers</option>
          </select>
        </div>

        <div style={{ minWidth: '180px' }}>
          <label htmlFor="sort-select" className="visually-hidden">
            Sort by
          </label>
          <select
            id="sort-select"
            className="form-select"
            value={sortBy}
            onChange={(e) =>
              dispatch(
                booksSlice.actions.setSortBy(
                  e.target.value as 'relevance' | 'newest'
                )
              )
            }
          >
            <option value="relevance">By relevance</option>
            <option value="newest">By newest</option>
          </select>
        </div>
      </div>
    </div>
  )
}
