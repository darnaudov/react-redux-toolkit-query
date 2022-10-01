import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import api from 'api';
import { productEntity } from 'api/schema';
import { normalize } from 'normalizr';
import { Seller } from 'redux/slices/sellers';
import { Loading } from 'redux/commonTypes';

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
  async (id: number, thunkApi) => {
    const product = await api.get(`products/${id}`);
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

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: Partial<Product>, thunkApi) => {
    const newProduct = await api.post('products', product);
    const normalized = normalize<
      any,
      {
        product: { [key: string]: Product };
        seller: { [key: string]: Seller };
      }
    >(newProduct.data, productEntity);
    return normalized.entities;
  }
);

export const removeProduct = createAsyncThunk(
  'products/remove',
  async (id: number, thunkApi) => {
    await api.delete(`products/${id}`);
    return id;
  }
);

export const productsAdapter = createEntityAdapter<Product>();
const initialState = productsAdapter.getInitialState({
  loading: Loading.idle,
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = Loading.pending;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = Loading.fulfilled;
        productsAdapter.upsertMany(state, action.payload.product);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = Loading.rejected;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        productsAdapter.upsertMany(state, action.payload.product);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        productsAdapter.upsertMany(state, action.payload.product);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        productsAdapter.upsertMany(state, action.payload.product);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        productsAdapter.removeOne(state, action.payload);
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
