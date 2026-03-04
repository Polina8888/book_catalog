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

    const items = response.data?.items ?? [];
    const itemsWithPrice = items.map((item: Book) => {
      const hash = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const price = (hash % 191) + 10;   // price from 10 to 200
      return { ...item, price }
    });

    return {
      ...response.data,
      items: itemsWithPrice,
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

export async function getBookById(id: string): Promise<Book> {
  const response = await axios.get(`${BASE_URL}/volumes/${id}`, {
    params: {
      key: API_KEY
    }
  });

  if (!response) {
    throw new Error("Failed to fetch book");
  }

  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const price = (hash % 191) + 10;   // price from 10 to 200
  return { ...response.data, price }
}