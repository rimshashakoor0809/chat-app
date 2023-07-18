import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { msgSlice } from './msgSlice';

export default combineReducers({
  [userSlice.reducerPath]: userSlice.reducer,
  [msgSlice.reducerPath]: msgSlice.reducer,
});