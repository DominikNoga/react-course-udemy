import { ACTIONS } from "../../const/const";
import { handleAddItem, handleUpdateQuantity } from "./handlers";

/**
 *
 * @param {Object} state
 * @param {{
 *  payload: Object,
 *  type: string
 * }} action
 * @returns
 */
export const shoppingCartReducer = (state, action) => {
  let updatedState = {};
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      updatedState = handleAddItem(action.payload.id, state);
      break;
    case ACTIONS.UPDATE_QUANTITY:
      updatedState = handleUpdateQuantity(state, action.payload.amount, action.payload.productId);
    default:
      break;
  }
  return {
    ...state,
    ...updatedState
  };
};