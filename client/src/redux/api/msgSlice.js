import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const msgSlice = createApi({
  reducerPath: 'msgApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3001/api/chat-app/chat',
    credentials: 'include',
  }),
  tagTypes: ['Message'],

  endpoints: (builder) => ({


    addMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: 'POST',
        body: data
      }),
      invalidatesTags: (result, error, data) => [
        { type: 'Message', id: data.sender },
        { type: 'Message', id: data.receiver },
      ],
    }),



    getAllMsgs: builder.query({
      query: (id) => `/message/${id}`,
      providesTags: (result, error, id) => [{ type: 'Message', id }],

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