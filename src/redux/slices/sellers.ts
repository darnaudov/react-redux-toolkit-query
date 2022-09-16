import { createEntityAdapter, createSlice, current } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductById,
  updateProduct,
} from 'redux/slices/products';

export interface Seller {
  id: number;
  name: string;
}

export const sellersAdapter = createEntityAdapter<Seller>();

export const sellersSlice = createSlice({
  name: 'sellers',
  initialState: sellersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        sellersAdapter.upsertMany(state, action.payload.seller);
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        sellersAdapter.upsertMany(state, action.payload.seller);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        sellersAdapter.upsertMany(state, action.payload.seller);
      });
  },
});

export default sellersSlice.reducer;
