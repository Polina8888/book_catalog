import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BooksState {
    search: string
    category: string
    sortBy: 'relevance' | 'newest'
}

const initialState: BooksState = {
    search: '',
    category: 'all',
    sortBy: 'relevance'
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
        setSortBy(state, action: PayloadAction<'relevance' | 'newest'>) {
            state.sortBy = action.payload
        }
    }
})

export default booksSlice.reducer;
