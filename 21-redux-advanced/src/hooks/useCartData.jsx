import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../const/const";
import { useNotification } from "./useNotification";

export const useCartData = () => {
  const { showNotification } = useNotification();
  const cart = useSelector(state => state.cart);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    
    const sendCartData = async () => {
      // showNotification('pending', 'Sending...', 'Sending cart data!');
      const response = await fetch(`${API_URL}/cart.json`, {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        // showNotification('error', 'Error!', 'Sending cart data failed!');
        throw new Error('Sending cart data failed.');
      }
      // showNotification('success', 'Success!', 'Sent cart data successfully!');
    };
    sendCartData();
  }, [cart, showNotification]);

  return {
    isToggled: cart.isToggled,
  }
};
