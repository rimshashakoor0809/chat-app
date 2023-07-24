import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HandleJWTExpiration } from '../../auth/HandleJWTExpiration';

export const userSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3001/api/chat-app/users',
    credentials: 'include',
  }),
  tagTypes: ['User'],

  endpoints: (builder) => ({


    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: 'POST',
      }),
      invalidatesTags: ['User']
    }),

    getUserWithID: builder.query({
      query: (id) => `/${id}`,
      invalidatesTags: ['User']

    }),

    getUserList: builder.query({
      query: () => `/all`,
      providesTags: ['User']

    }),

    updateStatus: builder.mutation({
      query: (data) => ({
        url: "/status",
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User']
    }),



  }),

  // onError: (error, { dispatch }) => {
  //   const { status } = error.response;

  //   if (status === 401) {
  //     HandleJWTExpiration();
  //   }
  // },
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserWithIDQuery,
  useGetUserListQuery,
  useUpdateStatusMutation,
  useLogoutMutation


} = userSlice;