import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from 'redux/slices/products';
import cartItemsReducer from 'redux/slices/cartItems';
import sellersReducer from 'redux/slices/sellers';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartItems: cartItemsReducer,
    sellers: sellersReducer,
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
