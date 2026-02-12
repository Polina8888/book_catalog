import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./types";

interface CartState {
    items: CartItem[]
    totalCount: number
    totalPrice: number
}

const initialState: CartState = {
    items: [],
    totalCount: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            // console.log("был вызван экшен")
            const item = state.items.find(({ id }) => id === action.payload.id);
            if (item) {
                item.amount += 1
                // console.log(`тут уже был item, items: ${state.items.length}`)
            } else {
                state.items.push(action.payload)
                // console.log(`добавили item, items: ${state.items.length}`)   
            }
            state.totalCount += 1;
            state.totalPrice += action.payload.price;
        },
        removeItem(state, action: PayloadAction<string>) {
            const index = state.items.findIndex(item => item.id === action.payload)
            if (index === -1) {
                return
            }

            const item = state.items[index];

            if (item.amount === 1) {
                state.items.splice(index, 1)
            } else {
                item.amount -= 1
            }

            state.totalCount -= 1;
            state.totalPrice -= item.price;
        },
        clearCart(state) {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        }
    }
})

// export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
