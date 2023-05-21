import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../../models/entity/User';

export const usersApi = createApi({
  tagTypes: ['User', 'Customers', 'Admins', 'Performance'],
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userId: string) => `/general/users/${userId}`,
      providesTags: ['User'],
    }),

    getUserPerformance: builder.query<any, string>({
      query: (id) => `management/performance/${id}`,
      providesTags: ['Performance'],
    }),

    getAdmins: builder.query<User[], void>({
      query: () => 'management/admins',
      providesTags: ['Admins'],
    }),

    getCustomers: builder.query<User[], void>({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetCustomersQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
} = usersApi;
