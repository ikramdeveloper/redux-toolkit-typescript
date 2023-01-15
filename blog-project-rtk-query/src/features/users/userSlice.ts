import {
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { IUser, UserState } from "../../types/userType";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<IUser>, void>({
      query: () => "/users",
      transformResponse: (res: IUser[]) =>
        usersAdapter.setAll(initialState, res as IUser[]),
      providesTags: (result) => [
        result
          ? [
              { type: "User", id: "LIST" },
              ...result.ids.map((id) => ({ type: "User", id })),
            ]
          : [{ type: "User", id: "LIST" }],
      ],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;

export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectIds: selectUsersIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
