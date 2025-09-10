import { createSlice } from '@reduxjs/toolkit';

const initialProductsState = {
  items: [{
    id: 'p1',
    title: 'Book',
    price: 6,
    description: 'A great book!',
  }, {
    id: 'p2',
    title: 'Pen',
    price: 1.5,
    description: 'A blue ink pen.',
  }],
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {}
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
