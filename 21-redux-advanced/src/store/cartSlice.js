import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
  items: [],
  isToggled: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    toggle(state) {
      state.isToggled = !state.isToggled;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.title === newItem.title);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
        return;
      }
      state.items = state.items.map((item) => item.title === newItem.title ? ({
        ...item,
        quantity: item.quantity + 1,
        totalPrice: item.totalPrice + item.price,
      }) : item);
    },
    removeItemFromCart(state, action) {
      const title = action.payload;
      const existingItem = state.items.find((item) => item.title === title);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.title !== title);
        return;
      }
      state.items = state.items.map((item) => item.title === existingItem.title ? ({
        ...item,
        quantity: item.quantity - 1,
        totalPrice: item.totalPrice - item.price,
      }) : item);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
