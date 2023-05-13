import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../../models/entity/User';

export const usersApi = createApi({
  tagTypes: ['User', 'Customers'],
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => `/general/users/${userId}`,
      providesTags: ['User'],
    }),

    getCustomers: builder.query<User[], void>({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),
  }),
});

export const { useGetUserQuery, useGetCustomersQuery } = usersApi;
