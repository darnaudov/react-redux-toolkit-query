import {
  createSlice,
  createEntityAdapter,
  current,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import api from 'api';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (arg, thunkApi) => {
    const products = await api.get('products');
    return products.data;
  }
);

export const productsAdapter = createEntityAdapter<Product>();
const initialState = productsAdapter.getInitialState({
  loading: 'idle',
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
      });
  },
});

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
