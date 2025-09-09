import { useDispatch, useSelector } from 'react-redux';
import { COUNTER_ACTIONS } from '../../store/counterSlice';
import classes from './Counter.module.css';
import { useState } from 'react';
import CounterHeader from './CounterHeader';

const Counter = () => {
  // useSelector allows us to extract given part of the Redux store state
  // automatically subscribes to the Redux store and runs the provided selector function whenever an action is dispatched
  const { counter: { amount, showCounter } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [value, setValue] = useState(5);
  const toggleCounterHandler = () => {
    dispatch(COUNTER_ACTIONS.toggle());
  };
  console.log('RENDER: Counter');
  return (
    <main className={classes.counter}>
      <CounterHeader />
      {showCounter && <div className={classes.value}>{amount}</div>}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="value">Set Increment/Decrement Value: </label>
        <input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => dispatch(COUNTER_ACTIONS.increment())}>Increment</button>
        <button onClick={() => dispatch(COUNTER_ACTIONS.change(value))}>Change by value</button>
        <button onClick={() => dispatch(COUNTER_ACTIONS.decrement())}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
