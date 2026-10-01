import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./user-slice/auth-slice/userAuthSlice";


export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});
