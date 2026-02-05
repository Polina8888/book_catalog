export interface Book {
  id: string
  title: string
  authors: string[]
  description?: string
  categories?: string[]
  imageLinks?: {
    thumbnail?: string
  }
  price: number
}
