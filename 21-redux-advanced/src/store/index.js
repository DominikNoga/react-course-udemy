/* TODO: 
1. on pressing my cart button, toggle the cart visibility
2. when we press add to cart button, on the product item, it should be added to the cart or increase the quantity if it already exists in the cart
3. add or deduct the quantity of a cart item when we press the + or - button in the cart
*/

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

const store = configureStore({
  reducer: { cart: cartReducer, products: productsReducer },
});

export default store;