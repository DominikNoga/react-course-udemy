import { redirect } from "react-router-dom";
import authService from "../services/authService";

export const logoutAction = () => {
  authService.removeUserData();
  return redirect("/auth");
};
  