import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface Product {
  name: string;
  price: number;
}

export type ProductsState = Array<Product>;

const initialState: ProductsState = [
  {
    name: 'MacBook',
    price: 1400,
  },
  {
    name: 'Old Car',
    price: 2400,
  },
  {
    name: 'W Shoes',
    price: 1000,
  },
];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export const getProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
