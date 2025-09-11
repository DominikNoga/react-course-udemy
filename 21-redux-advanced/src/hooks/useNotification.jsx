import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";

export const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (status, title, message) => {
    dispatch(
      uiActions.showNotification({
        status,
        title,
        message,
      })
    );
  };

  return { showNotification };
};