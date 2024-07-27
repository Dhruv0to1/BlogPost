import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/authSlice";
const store = configureStore({
  reducer: {
    LoginStatus: AuthReducer,
  },
});

export default store;
