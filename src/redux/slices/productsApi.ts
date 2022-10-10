import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverBaseUrl } from 'api';

export interface Product {
  id: number;
  name: string;
  price: number;
}

const productsAdapter = createEntityAdapter<Product>();

const productTag = 'Product';
const listTagId = 'List';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: serverBaseUrl }),
  tagTypes: [productTag],
  endpoints: (builder) => ({
    getProducts: builder.query<EntityState<Product>, void>({
      query: () => 'products',
      providesTags: (result) => {
        if (result && result.ids) {
          return [
            ...result.ids.map((id) => ({
              type: 'Product' as const,
              id: id,
            })),
            { type: productTag, id: listTagId },
          ];
        }

        return [{ type: productTag, id: listTagId }];
      },
      transformResponse: (response: Product[]) => {
        return productsAdapter.addMany(
          productsAdapter.getInitialState(),
          response
        );
      },
    }),
    getProduct: builder.query<Product, number>({
      query: (id: number) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: productTag, id }],
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: `products/${product.id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: productTag, id: arg.id },
      ],
      async onQueryStarted({ id, ...update }, { dispatch, queryFulfilled }) {
        if (id) {
          const getProductUpdate = dispatch(
            productsApi.util.updateQueryData('getProduct', id, (draft) => {
              Object.assign(draft, update);
            })
          );
          const getProductsUpdate = dispatch(
            productsApi.util.updateQueryData(
              'getProducts',
              undefined,
              (draft) => {
                productsAdapter.updateOne(draft, { id, changes: update });
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            getProductUpdate.undo();
            getProductsUpdate.undo();
          }
        }
      },
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: productTag, id: listTagId }],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => {
        return [
          { type: productTag, id: arg.id },
          { type: productTag, id: listTagId },
        ];
      },
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = productsApi;
