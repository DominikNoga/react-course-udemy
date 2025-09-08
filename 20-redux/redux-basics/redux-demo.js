const redux = require("redux");

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

// action is a JavaScript object that has a type property. It describes what happened.
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

const store = redux.createStore(counterReducer, { counter: 0 });

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// subscribe to changes in the store
store.subscribe(counterSubscriber);

// dispatch an action to change the state
store.dispatch(incrementAction);
store.dispatch(incrementAction);
store.dispatch(decrementAction);
store.dispatch(decrementAction);