import { API_URL } from "../../const/const";
import { uiActions } from "../uiSlice";

export const showNotification = (dispatch, notification) => {
  dispatch(
    uiActions.showNotification(notification),
  );
};

export const sendCartDataToAPI = async (cart) => {
  const response = await fetch(`${API_URL}/cart.json`, {
    method: 'PUT',
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error('Sending cart data failed.');
  }
};

export const getCartDataFromAPI = async () => {
  const response = await fetch(`${API_URL}/cart.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch cart data!');
  }
  return response.json();
};