import axios from "axios";
import type { Book } from "../types/book";

const BASE_URL = '/api/books/v1'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

export interface BooksResponse {
  items: Book[]
}

export async function fetchBooks(
  search: string,
  startIndex: number
): Promise<BooksResponse> {
  const response = await axios.get(`${BASE_URL}/volumes`, {
    params: {
      q: search,
      startIndex,
      maxResults: 20,
      key: API_KEY,
    },
  })

  return response.data
}
