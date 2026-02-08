export interface CartItem {
    id: string
    title: string
    price: number
    amount: number
    imageLinks?: {
        thumbnail?: string
    }
}
