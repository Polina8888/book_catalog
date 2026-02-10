import axios from "axios";
import type { Book } from "../types.ts";

const BASE_URL = '/api/books/v1'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

export interface BooksResponse {
  items: Book[],
  totalItems: number
}

export async function fetchBooks(
  search: string,
  category: string,
  sortBy: 'relevance' | 'newest',
  startIndex: number,
  maxResults: number
): Promise<BooksResponse> {
  try {
    const q = category !== 'all' ? `${search}+subject:${category}` : search;

    const response = await axios.get(`${BASE_URL}/volumes`, {
      params: {
        q,
        startIndex,
        maxResults,
        key: API_KEY,
        orderBy: sortBy,
      },
    })

    console.log(response.data)
    return {
      ...response.data,
      items: response.data.items ?? [],
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message ??
        'Ошибка при загрузке книг'
      )
    }

    throw new Error('Неизвестная ошибка')
  }
}
