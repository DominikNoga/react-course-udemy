# Redux
A third party library for managing application state. It is an alternative to using React Context API for managing cross-component state or app-wide state.

## Types of State Management
- Local state: State that is managed within a component. (e.g., using `useState` in React)
- Cross-component state: State that is managed across multiple components.
- App-wide state: State that is managed across the entire application.

## Downsides of a React Context API
- Using React Context lead to using tough set-up where there will be a lot of contexts that depend on each other.
  Which is both hard to manage and hard to debug.
- The performance of React Context is not as good. Especially when the state is updated frequently.
  Because when a context value changes, all components that consume that context will re-render.

## How Redux Works?
- Redux uses a single store to manage the state of the entire application.
- The state in the store is immutable, meaning it cannot be changed directly.
- Components that depend on the state are using subscribers to listen for changes in the store. (They get a slice of the state in store)
- Components cannot change the state directly. Instead, they dispatch actions (JavaScript objects) to the store.
- The store uses reducers (pure functions) to determine how the state should change based on the action dispatched.
![schema](schema.png)

## Writing Redux Code
- Writing a redux code does not require React. It can be used with any JavaScript or even in Node.js.
- Below is a simplest redux code that demonstrates the core concepts of Redux. Shown on the diagram above.
```js
const redux = require("redux");

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

const incrementAction = { type: ACTION.INCREMENT };
const decrementAction = { type: ACTION.DECREMENT };

// returns new state based on state and action.
// reducer is a pure function which means it always returns the same output for the same input and has no side effects.
const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return {
        counter: state.counter + 1,
      };
    case ACTION.DECREMENT:
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

// create a store with the reducer and initial state
const store = redux.createStore(counterReducer, { counter: 0 });

// a subscriber function that gets called whenever the state changes
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// subscribe to changes in the store
store.subscribe(counterSubscriber);

// dispatch an action to change the state
store.dispatch(incrementAction);
````
