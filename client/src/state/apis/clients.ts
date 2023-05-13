import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Geography from '../../models/Geography';
import Transaction, {
  TransactionQueryParam,
} from '../../models/entity/Transaction';

export const clientsApi = createApi({
  tagTypes: ['Transactions', 'Geography'],
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTransactions: builder.query<
      { transactions: Transaction[]; total: number },
      TransactionQueryParam
    >({
      query: (params: TransactionQueryParam) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { ...params },
      }),
      providesTags: ['Transactions'],
    }),

    getGeography: builder.query<Geography[], void>({
      query: () => 'client/geography',
      providesTags: ['Geography'],
    }),
  }),
});

export const { useGetTransactionsQuery, useGetGeographyQuery } = clientsApi;
