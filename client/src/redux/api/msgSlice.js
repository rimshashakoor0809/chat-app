import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const msgSlice = createApi({
  reducerPath: 'msgApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3001/api/chat-app/chat',
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


    addMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: 'POST',
        body: data
      })
    }),



    getAllMsgs: builder.query({
      query: (id) => `/message/${id}`,

    }),

    // updateStatus: builder.mutation({
    //   query: (data) => ({
    //     url: "/status",
    //     method: 'PATCH',
    //     body: data
    //   })
    // }),
  })
})

export const {
  useAddMessageMutation,
  useGetAllMsgsQuery
} = msgSlice;