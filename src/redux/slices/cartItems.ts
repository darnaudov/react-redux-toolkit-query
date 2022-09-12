import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'redux/slices/products';
import { RootState } from 'redux/store';

export interface CartItem extends Product {
  qty: number;
}

export type CartItems = Array<CartItem>;

const initialState: CartItems = [];

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.qty = existingItem.qty + 1;
      } else {
        state.push({ ...action.payload, qty: action.payload.qty + 1 });
      }
    },
    removeProductFromCart: (state, action: PayloadAction<CartItem>) => {
      return state
        .map((item) => {
          if (item.name === action.payload.name) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    },
  },
});

export const { addProductToCart, removeProductFromCart } =
  cartItemsSlice.actions;

export const getCartItems = (state: RootState) => state.cartItems;

export default cartItemsSlice.reducer;
