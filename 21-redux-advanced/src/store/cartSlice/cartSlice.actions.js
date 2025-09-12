import { cartActions } from "./cartSlice";
import { getCartDataFromAPI, sendCartDataToAPI, showNotification } from "./cartSlice.helpers";

export const addItemToCart = (state, action) => {
  state.changed = true;
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
}

export const removeItemFromCart = (state, action) => {
  state.changed = true;
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
};

export const setCartData = (state, action) => {
  return {
    items: action.payload.items || [],
    changed: false,
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    showNotification(dispatch, {
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!',
    });
    try {
      await sendCartDataToAPI(cart);
      dispatch(cartActions.resetChanged());
      showNotification(dispatch, {
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      });
    } catch (error) {
      showNotification(dispatch, {
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      });
      dispatch(cartActions.resetChanged());
    }
  }
};

export const getCartData = () => {
  return async (dispatch) => {
    try {
      const cartData = await getCartDataFromAPI();
      dispatch(cartActions.setCartData(cartData));
    } catch (error) {
      showNotification(dispatch, {
        status: 'error',
        title: 'Error!',
        message: 'Getting cart data failed!',
      });
    }
  };
};
