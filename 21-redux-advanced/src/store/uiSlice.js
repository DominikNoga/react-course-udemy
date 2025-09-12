import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
  isCartToggled: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    toggleCart(state) {
      state.isCartToggled = !state.isCartToggled;
    },
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
