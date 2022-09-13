import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from 'redux/store';
import api from 'api';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const productsAdapter = createEntityAdapter<Product>();
const initialState = productsAdapter.getInitialState({
  loading: 'idle',
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    productsReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'received';
        productsAdapter.setAll(state, action.payload);
      }
    },
  },
});

export const { productsLoading, productsReceived } = productsSlice.actions;

export async function fetchProducts(dispatch: AppDispatch) {
  dispatch(productsLoading());
  const products = await api.get('products');
  dispatch(productsReceived(products.data));
  return products.data;
}

export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export const selectProductsLoading = (state: RootState) =>
  state.products.loading;

export default productsSlice.reducer;
