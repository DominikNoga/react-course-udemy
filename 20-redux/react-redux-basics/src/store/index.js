import { createStore } from 'redux';

const INITIAL_STATE = {
  counter: 0
};

const ACTION_TYPES = {
  INC: 'inc',
  DEC: 'dec',
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INC:
      return { ...state, counter: state.counter + 1 }
    case ACTION_TYPES.DEC:
      return { ...state, counter: state.counter - 1 }
    default:
      return state;
  }
}

const store = createStore(counterReducer, INITIAL_STATE);

export default store;

export const ACTIONS = {
  INC: {
    type: ACTION_TYPES.INC
  },
  DEC: {
    type: ACTION_TYPES.DEC
  }
};
