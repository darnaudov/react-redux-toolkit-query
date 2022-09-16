import {
  createSlice,
  createEntityAdapter,
  current,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import api from 'api';
import { productEntity } from 'api/schema';
import { normalize } from 'normalizr';
import { Seller } from 'redux/slices/sellers';

export interface Product {
  id: number;
  name: string;
  price: number;
  seller: number;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (arg, thunkApi) => {
    const products = await api.get('products');
    const normalized = normalize<
      any,
      {
        product: { [key: string]: Product };
        seller: { [key: string]: Seller };
      }
    >(products.data, [productEntity]);
    return normalized.entities;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId: number, thunkApi) => {
    const product = await api.get(`products/${productId}`);
    const normalized = normalize<
      any,
      {
        product: { [key: string]: Product };
        seller: { [key: string]: Seller };
      }
    >(product.data, productEntity);
    return normalized.entities;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: Partial<Product>, thunkApi) => {
    const updatedProduct = await api.patch(`products/${product.id}`, product);
    const normalized = normalize<
      any,
      {
        product: { [key: string]: Product };
        seller: { [key: string]: Seller };
      }
    >(updatedProduct.data, productEntity);
    return normalized.entities;
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
        productsAdapter.upsertMany(state, action.payload.product);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'rejected';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        productsAdapter.upsertMany(state, action.payload.product);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productsAdapter.upsertMany(state, action.payload.product);
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
