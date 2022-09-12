import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.setAll(productsAdapter.getInitialState(), [
  {
    id: 1,
    name: 'MacBook',
    price: 1400,
  },
  {
    id: 2,
    name: 'Old Car',
    price: 2400,
  },
  {
    id: 3,
    name: 'W Shoes',
    price: 1000,
  },
]);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
  selectById: selectProductById,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export default productsSlice.reducer;
