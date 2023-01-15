import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { StoreType } from "../../app/store";
import { IUser, UserState } from "../../types/userType";
import { USERS_URL } from "../../constants";
import axios from "axios";
import { IdType } from "../../types";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get(USERS_URL);
  return data;
});

const initialState: UserState = {
  users: [] as IUser[],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectAllUsers = (state: StoreType) => state.users.users;
export const selectUserById = (state: StoreType, userId: IdType) =>
  state.users.users.find((item) => String(item.id) === userId);

export default userSlice.reducer;
