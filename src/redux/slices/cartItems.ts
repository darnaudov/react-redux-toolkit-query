import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Product } from 'redux/slices/products';
import { RootState } from 'redux/store';

export interface CartItem extends Product {
  qty: number;
}

export const cartItemsAdapter = createEntityAdapter<CartItem>();
const initialState = cartItemsAdapter.getInitialState();

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.entities[action.payload.id];

      let newQty = 1;
      if (existingItem) {
        newQty = existingItem.qty + 1;
      }

      cartItemsAdapter.upsertOne(state, {
        ...action.payload,
        qty: newQty,
      });
    },
    removeProductFromCart: (state, action: PayloadAction<CartItem>) => {
      if (action.payload.qty === 1) {
        cartItemsAdapter.removeOne(state, action.payload.id);
      } else {
        cartItemsAdapter.upsertOne(state, {
          ...action.payload,
          qty: action.payload.qty - 1,
        });
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
