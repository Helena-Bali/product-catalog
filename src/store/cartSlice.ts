import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== item.id);
                }
            }
            state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
