import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BooksState {
    category: string
    sortBy: 'relevance' | 'newest'
}

const initialState: BooksState = {
    category: 'all',
    sortBy: 'relevance'
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        },
        setSortBy(state, action: PayloadAction<'relevance' | 'newest'>) {
            state.sortBy = action.payload
        }
    }
})

