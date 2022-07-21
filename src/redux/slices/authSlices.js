import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../apis/services/authApi";

export const getAllUsers = createAsyncThunk(
  "slice/getAllUsers",
  async (params, thunkAPI) => {
    const res = await authApi.getAllUsers();
    return res;
  }
);

const slice = createSlice({
  name: "getUsers",
  initialState: {
    user: {},
    loading: false,
    error: "",
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      return { ...state, username: user, isLogin: true };
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export default slice;
