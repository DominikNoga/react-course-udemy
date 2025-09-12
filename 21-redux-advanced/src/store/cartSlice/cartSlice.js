import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, removeItemFromCart, setCartData } from './cartSlice.actions';

const initialCartState = {
  items: [],
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItemToCart,
    removeItemFromCart,
    setCartData,
    resetChanged(state) {
      state.changed = false;
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
