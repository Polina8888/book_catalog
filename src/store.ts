import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import booksReducer from "./modules/books/booksSlice";
import cartReducer from "./modules/cart/cartSlice";
import { loadCartState, saveCartState } from "./localStorage";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        cart: cartReducer
    },
    preloadedState: loadCartState(),
});

store.subscribe(() => {
    const state = store.getState();
    saveCartState(state.cart);
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();