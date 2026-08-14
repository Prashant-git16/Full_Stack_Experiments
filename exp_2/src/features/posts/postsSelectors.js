import { createSelector } from "@reduxjs/toolkit";

export const selectPosts = (state) => state.posts.items;

export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);

export const selectLongTitlePosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.title.length > 20)
);