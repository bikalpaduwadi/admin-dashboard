import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import SalesStat from '../../models/entity/SalesStat';

export const salesStatsApi = createApi({
  tagTypes: ['SalesStats', 'Dashboard'],
  reducerPath: 'SalesStatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getSalesStats: builder.query<SalesStat, void>({
      query: () => 'sales/salesStats',
      providesTags: ['SalesStats'],
    }),
    getDashboard: builder.query<any, void>({
      query: () => 'general/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetSalesStatsQuery, useGetDashboardQuery } = salesStatsApi;
