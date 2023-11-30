import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";
import userDataSlice from "./slices/userDataSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    userData: userDataSlice,
  },
  middleware: (getDefaultMIddleware) =>
    getDefaultMIddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
