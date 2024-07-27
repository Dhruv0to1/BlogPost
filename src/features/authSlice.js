import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  post: [],
};

export const authSlice = createSlice({
  name: "LoginStatus",
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout(state, action) {
      state.status = false;
      state.userData = null;
    },
    addPost(state, action) {
      state.post.push(action.payload.res);
    },
    storeDeletePost(state, action) {
      state.post = state.post.filter((item) => item.$id !== action.payload.id);
    },
    updatePost(state, action) {
      state.post = state.post.map((item) => {
        if (item.$id === action.payload.id) {
          return action.payload.update;
        } else {
          return item;
        }
      });
    },
    getPost(state, action) {
      state.post = action.payload.storePosts;
    },
  },
});

export const { login, logout, addPost, storeDeletePost, updatePost, getPost } =
  authSlice.actions;

export default authSlice.reducer;
