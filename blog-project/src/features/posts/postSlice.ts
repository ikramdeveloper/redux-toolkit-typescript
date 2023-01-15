import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { StoreType } from "../../app/store";
import { IdType } from "../../types";
import {
  IPost,
  PostState,
  PostValue,
  ReactionType,
} from "../../types/postType";
import { POSTS_URL } from "../../constants";
import { sub } from "date-fns";

const postsAdapter = createEntityAdapter({
  sortComparer: (a: IPost, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  value: PostValue.IDLE,
  error: "" as string | undefined,
  count: 0,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get(POSTS_URL);
  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/createPost",
  async (payload: Partial<IPost>) => {
    // const { data } = await axios.post(POSTS_URL, payload, {
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // });
    return payload;
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (payload: Partial<IPost>) => {
    return payload;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (payload: IdType) => {
    return payload;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload as {
        postId: IdType;
        reaction: ReactionType;
      };
      const foundPost = state.entities[postId] as IPost;
      if (reaction in foundPost.reactions) {
        foundPost.reactions[reaction]++;
      }
    },
    increaseCount: (state) => {
      state.count = Number(state.count) + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.value = PostValue.LOADING;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.value = PostValue.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.value = PostValue.SUCCEEDED;

        let min = 1;
        const mappedPosts = action.payload.map((post: Partial<IPost>) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        postsAdapter.upsertMany(state, mappedPosts);
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const newPost = action.payload;

        newPost.id = state.ids[state.ids.length - 1];
        newPost.date = new Date().toISOString();
        newPost.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        postsAdapter.addOne(state, newPost as IPost);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const { id } = action.payload ?? {};
        if (!id) {
          console.log("could not edit post with payload: ", action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();

        postsAdapter.upsertOne(state, action.payload as IPost);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        if (!postId) {
          console.log(
            `Could not proceed delete post action with id: ${postId}`
          );
          return;
        }

        postsAdapter.removeOne(state, postId);
      });
  },
});

export const { addReaction, increaseCount } = postSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectIds: selectPostsIds,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state: StoreType) => state.posts);

export const getPostsStatus = (state: StoreType) => state.posts.value;
export const getPostsError = (state: StoreType) => state.posts.error;
export const selectCountValue = (state: StoreType) => state.posts.count;
export const selectPostsByUserId = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) =>
    posts.filter((item) => String(item.userId) === String(userId))
);

export default postSlice.reducer;
