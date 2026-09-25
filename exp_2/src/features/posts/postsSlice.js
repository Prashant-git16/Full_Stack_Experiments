import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsThunk";
const initialState = {
  items: [],
  loading: false,
  error: null,
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.push(action.payload);
    },

    deletePost: (state, action) => {
      state.items = state.items.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost: (state, action) => {
      const index = state.items.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;

      state.items = action.payload.map((post) => ({
        id: post.id,
        title: post.title,
        platform: "API",
        likes: Math.floor(Math.random() * 500),
      }));
    })

    .addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}

});

export const { addPost, deletePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;