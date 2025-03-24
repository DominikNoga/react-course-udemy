# Context api

## Prop drilling
Forwarding props through many components. Which do not even need that props.
For example passing props from app component to component that is in depth 4.

### Solutions
- Component composition -> Lecture 166
- React context API

## Context API
This is a feature which we can use for providing a value to multiple components.
By wrapping those components with a given context.

### Creating context
````jsx
import { createContext } from "react";

export const CartContext = createContext({
    items: []
});
````

### Providing a context to the component
In order to provide that context we need to wrap our component with it.
We either do it like with normal component since React 19+ or by using '.Provider' property.
````jsx
function App() {
    return (
        <CartContext value={{items: []}}> {/* Or <CartContext.Provider>*/ }
            <Header />
            <Shop onAddItemToCart={handleAddItemToCart} />
        </CartContext.Provider>
    );
}
````

### Consuming the context
We can consume the context using one of two hooks provided by React.
Use or UseContext. The use hook is more flexible and unlike others it can be used inside of the if block.

````jsx
function Cart() {
    const cartCtx = useContext(CartContext);
    const cartCtx2 = use(CartContext); // available since React 19
}
````

### Linking context to state
In order to make context updatapble we can just simply pass a state variable as a value to this context.
If we just pass a whole state as a value it won't be editable. In order to manage this. We can just add a function to our context.
Which will manage the state.
````jsx
function App() {
  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart // function which will update a state variable
  }

  return (
    <CartContext value={ctxValue}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop />
    </CartContext>
  )
}
````

- Changing context value will re-execute component function.

### Outsourcing context to separate file
To make app component more lean and code more readable whe can create context in separate file.
By creating a wrapper component which will manage all state related to the context.

````jsx
export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    updateItemQuantity: () => { }
});

export function CartContextProvider({children}) {
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });
    function handleAddItemToCart(id) { }
    function handleUpdateCartItemQuantity(productId, amount) {}
    const ctxValue = {
        items: shoppingCart.items,
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
````

## useReducer hook
This hook is great substitute for useState. It is very useful for more complex state updating,
when there are several ways of updating the same state.
Then instead of writing separate logic in huge functions. We can divide it to more organized portions.

We can do this by using react useReducer hook. We define it similarly to useState, but the second argument is a reducer function.
Which is handling the state update, based on some action.
Action is anything we want to, typically it will be an object, but it can be a string, or even a boolean.
Reducer also has access to the latest state snapshot.

````jsx
const stateReducerFn = (state, action) => {
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

export function CartContextProvider({children}) {

    const [state, stateDispatch] = useReducer(stateReducerFn, {});

    const addItem = (itemId) => {
        this.stateDispatch({
            type: 'ADD_ITEM',
            payload: {id: itemId},
        });
    }

    const updateQuantity = () => {
        this.stateDispatch({
            type: 'UPDATE_QUANTITY',
            payload: {id: itemId},
        });
    }
}
````