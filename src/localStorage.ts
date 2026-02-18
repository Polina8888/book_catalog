import type { CartState } from "./modules/cart/cartSlice";

export const loadCartState = (): { cart: CartState } | undefined => {
    try {
        const loaded = localStorage.getItem('cart');
        if (!loaded) {
            return undefined;
        }

        const parsed = JSON.parse(loaded);
        return {
            cart: parsed
        }
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export const saveCartState = (cart: CartState): void => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
        console.error(e)
    }
}