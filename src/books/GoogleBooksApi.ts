import axios from "axios";
import type { Book } from "./types";

const BASE_URL = '/api/books/v1'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

export interface BooksResponse {
  items: Book[],
  totalItems: number
}

export async function fetchBooks(
  search: string,
  startIndex: number,
  maxResults: number
): Promise<BooksResponse> {
  const response = await axios.get(`${BASE_URL}/volumes`, {
    params: {
      q: search,
      startIndex,
      maxResults,
      key: API_KEY,
    },
  })

  console.log(response.data)
  return response.data
}
