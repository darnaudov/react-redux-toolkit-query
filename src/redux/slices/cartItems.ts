import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface CartItem {
  productId: number;
  qty: number;
}

export const cartItemsAdapter = createEntityAdapter<CartItem>({
  selectId: (cartItem) => cartItem.productId,
});
const initialState = cartItemsAdapter.getInitialState();

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.entities[action.payload];

      let newQty = 1;
      if (existingItem) {
        newQty = existingItem.qty + 1;
      }

      cartItemsAdapter.upsertOne(state, {
        productId: action.payload,
        qty: newQty,
      });
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.entities[action.payload];

      if (existingItem) {
        if (existingItem.qty === 1) {
          cartItemsAdapter.removeOne(state, action.payload);
        } else {
          cartItemsAdapter.upsertOne(state, {
            productId: action.payload,
            qty: existingItem.qty - 1,
          });
        }
      }
    },
    clearCart: (state) => {
      cartItemsAdapter.removeAll(state);
    },
  },
});

export const { addProductToCart, removeProductFromCart, clearCart } =
  cartItemsSlice.actions;

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectEntities: selectCartItemEntities,
  selectIds: selectCartItemIds,
  selectTotal: selectTotalCartItems,
} = cartItemsAdapter.getSelectors((state: RootState) => state.cartItems);

export default cartItemsSlice.reducer;
