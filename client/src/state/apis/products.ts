import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Product from '../../models/entity/Product';

export const productsApi = createApi({
  tagTypes: ['Products'],
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/client/products`,
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
