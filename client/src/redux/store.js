
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./api/userSlice";
import api from './api/api';
import { msgSlice } from "./api/msgSlice";

export const store = configureStore({
  reducer: {
    api,
    [userSlice.reducerPath]: userSlice.reducer,
    [msgSlice.reducerPath]: msgSlice.reducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userSlice.middleware)
    .concat(msgSlice.middleware)
});
