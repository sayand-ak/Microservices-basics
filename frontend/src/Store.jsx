import { configureStore } from "@reduxjs/toolkit";
import { userAuthSlice } from "./slices/userAuthSlice"; 


const store = configureStore({
  reducer: {
    auth: userAuthSlice.reducer,
  },
  devTools: true,
});

export default store;
