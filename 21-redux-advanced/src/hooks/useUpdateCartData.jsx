import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "../store/cartSlice/cartSlice.actions";

export const useUpdateCartData = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current || !cart.changed) {
      isInitial.current = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
};
