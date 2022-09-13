import { createEntityAdapter, createSlice, current } from '@reduxjs/toolkit';
import { fetchProducts } from 'redux/slices/products';

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
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      sellersAdapter.setAll(state, action.payload.seller);
    });
  },
});

export default sellersSlice.reducer;
