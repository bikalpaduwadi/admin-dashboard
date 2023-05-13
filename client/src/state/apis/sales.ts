import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import SalesStat from '../../models/entity/SalesStat';

export const salesStatsApi = createApi({
  tagTypes: ['SalesStats'],
  reducerPath: 'SalesStatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getSalesStats: builder.query<SalesStat, void>({
      query: () => 'sales/salesStats',
      providesTags: ['SalesStats'],
    }),
  }),
});

export const { useGetSalesStatsQuery } = salesStatsApi;
