import { createSlice, configureStore } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  amount: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: INITIAL_STATE,
  reducers: {
    increment: (state) => {
      state.amount += 1;
    },
    decrement: (state) => {
      state.amount -= 1;
    },
    change: (state, action) => {
      state.amount += action.payload;
    },
    toggle: (state) => {
      state.showCounter = !state.showCounter;
    },
  },
});

export default counterSlice;
export const COUNTER_ACTIONS = counterSlice.actions;
