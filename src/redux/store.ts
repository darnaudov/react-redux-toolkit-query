import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from 'redux/slices/products';
import cartItemsReducer from 'redux/slices/cartItems';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
