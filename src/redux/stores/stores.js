import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlices";

const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default reduxStore;
