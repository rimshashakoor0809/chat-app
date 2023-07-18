import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3001/api/chat-app/users',
    credentials: 'include',

    prepareHeaders: (headers, { getState }) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({


    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: 'POST',
        body: data
      })
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: 'POST',
        body: data
      })
    }),

    getUserWithID: builder.query({
      query: (id) => `/${id}`,

    }),

    getUserList: builder.query({
      query: () => `/all`,

    }),

    updateStatus: builder.mutation({
      query: (data) => ({
        url: "/status",
        method: 'PATCH',
        body: data
      })
    }),
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserWithIDQuery,
  useGetUserListQuery,
  useUpdateStatusMutation

} = userSlice;