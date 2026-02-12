export interface Book {
  id: string
  volumeInfo: {
    title: string
    authors: string[]
    description?: string
    categories?: string[]
    imageLinks?: {
      thumbnail?: string
    }
  },
  price: number
}
