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

export interface Action {
  productId: number;
}

export const cartItemsAdapter = createEntityAdapter<CartItem>({
  selectId: (cartItem) => cartItem.productId,
});
const initialState = cartItemsAdapter.getInitialState();

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Action>) => {
      const existingItem = state.entities[action.payload.productId];

      let newQty = 1;
      if (existingItem) {
        newQty = existingItem.qty + 1;
      }

      cartItemsAdapter.upsertOne(state, {
        ...action.payload,
        qty: newQty,
      });
    },
    removeProductFromCart: (state, action: PayloadAction<Action>) => {
      const existingItem = state.entities[action.payload.productId];

      if (existingItem) {
        if (existingItem.qty === 1) {
          cartItemsAdapter.removeOne(state, action.payload.productId);
        } else {
          cartItemsAdapter.upsertOne(state, {
            ...action.payload,
            qty: existingItem.qty - 1,
          });
        }
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart } =
  cartItemsSlice.actions;

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectEntities: selectCartItemEntities,
  selectIds: selectCartItemIds,
  selectTotal: selectTotalCartItems,
} = cartItemsAdapter.getSelectors((state: RootState) => state.cartItems);

export default cartItemsSlice.reducer;
