import {
  createSelector,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { IPost, IReaction } from "../../types/postType";
import { sub } from "date-fns";
import { apiSlice } from "../../api/apiSlice";

const postsAdapter = createEntityAdapter({
  sortComparer: (a: IPost, b) =>
    new Date(b.datetime)
      .toISOString()
      .localeCompare(new Date(a.datetime).toISOString()),
});

const initialState = postsAdapter.getInitialState();

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<EntityState<IPost>, void>({
      query: () => "/posts",
      transformResponse: (res: IPost[]) => {
        let min = 1;
        const mappedPosts = res.map((post: Partial<IPost>) => {
          if (!post?.datetime)
            post.datetime = sub(new Date(), { minutes: min++ });
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, mappedPosts as IPost[]);
      },
      providesTags: (result) => [
        { type: "Post", id: "LIST" },
        ...result.ids?.map((id) => ({ type: "Post" as const, id })),
      ],
    }),
    getPostsByUserId: builder.query<EntityState<IPost>, { userId: number }>({
      query: ({ userId }) => `/posts/?userId=${userId}`,
      transformResponse: (res: IPost[]) => {
        let min = 1;
        const mappedPosts = res.map((post: Partial<IPost>) => {
          if (!post?.datetime)
            post.datetime = sub(new Date(), { minutes: min++ });
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, mappedPosts as IPost[]);
      },
      providesTags: (result) => [
        ...result.ids?.map((id) => ({ type: "Post", id })),
      ],
    }),
    addPost: builder.mutation<IPost, Partial<IPost>>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...newPost,
          userId: Number(newPost.userId),
          datetime: new Date(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<IPost, IPost>({
      query: (updatedPost) => ({
        url: `/posts/${updatedPost.id}`,
        method: "PUT",
        body: {
          ...updatedPost,
          datetime: new Date(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation<IPost, { id: number }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation<
      IPost,
      { postId: number; reactions: IReaction }
    >({
      query: ({ postId, reactions }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        body: { reactions },
      }),
      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.entities[postId];
            if (post) post.reactions = reactions;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = postApiSlice;

export const selectPostsResult = postApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
