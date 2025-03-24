import { useReducer } from "react";
import { createContext } from "react";
import { ACTIONS, INITIAL_SHOPPING_CARD } from "./const/const";
import { shoppingCartReducer } from "./reducers/shopping-card-reducer/reducer";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    updateItemQuantity: () => { }
});

export function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, INITIAL_SHOPPING_CARD);

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: ACTIONS.ADD_ITEM,
            payload: {
                id
            }
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: ACTIONS.UPDATE_QUANTITY,
            payload: {
                productId,
                amount
            }
        })
    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    }
    return (
        <CartContext value={ctxValue}>
            {
                children
            }
        </CartContext>
    )
}
