import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartData } from "../store/cartSlice/cartSlice.actions";

export const useGetCartData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);
};
