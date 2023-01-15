import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;
