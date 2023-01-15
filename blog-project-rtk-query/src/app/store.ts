import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;
