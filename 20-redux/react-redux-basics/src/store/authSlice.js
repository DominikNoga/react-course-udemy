import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isAuthenticated: false,
  login: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.login = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.login = undefined;
    },
  },
});

export const AUTH_ACTIONS = authSlice.actions;
export default authSlice;
