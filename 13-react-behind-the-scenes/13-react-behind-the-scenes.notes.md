# React behind the scenes
Here there will be some deep dive into how react works under the hood.
The topics described earlier will be explained. And also performance optimization techniques will be introduced.

## How does React updates the DOM?
- it goes component by component, starting with the component defined in main.jsx file.
  - In our example the App component
- Next it goes over the jsx code, and if it spots a custom React component, it executes it's code and so on.

### Virtual DOM and render step by step
1. When we load the app for the 1st time or we reload it. React creates the
  component tree, and from that tree it creates a html code that will be rendered on the page.
2. Next it is stored in memory as a virtual representation.
3. Next it is compared with the last snapshot of the DOM
4. After the comparasion the changes are inserted into the real DOM.
5. After any action/click. We are going through each step again. And we again compare what will change.
  Thanks to this only needed changes will be applied in the real DOM.

NOTE: therefore, executing the component funciton again. Causes just virtual DOM update, but no update of the whole DOM.

## Performance optimization
- When a state is changed in the component it's function will be exectuted
- The same will happen with all of it's child components
- In some cases a state update won't affect the child components so it is not worth to re-execute their functions.

### memo function
For the reason above React gives us the 'memo' function that can be wrapped around the component declaration.
It will compare the props sent to the component with the new one. And only re-execute the fn.
If the props have changed.

WARNING: Do not over-use the memo fn. It is also taking time to compare the props, so it,
should be only used for components with quite a lot of children, that are high in component tree.
Otherwise it will affect perf in not wanted way.

````jsx
const Counter = memo(function Counter({ initialCount }) {
  return (
    <section className="counter">
      // ...
    </section>
  );
});

export default Counter;
````

### Component composition
The first thing that we should do before we use memo is structuring the components
in a smarter way. Sometimes just by moving the state down a bit, we can prevent many re-renders.
So for the counter example, it would be enough to move the state handling, that were causing not needed update.
To the component on the same level as the Counter.

### useMemo hook
Memo function is used for the whole component functions.
Some functions that are used inside of the components, can perform heavy operations.
Like looping over something or calculating tough things.
In order to reduce calls to those function we can use the useMemo hook.
This hook will only re-execute the function if one of it's dependencies have changed.
for the example below we should only execute this function when new initialCount was passed,
not when any Counter component state is changing.

````jsx
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );
})
````

## Why keys are needed?
- The state update is based on the component position in the component tree.
- Therefore when outputing list elements using 'map', we need to provide a key.
- This allows React to track which component state should be updated.
- This is also the reason why we shouldn't use array index as a key.
- Index of the item can change, and then we will set the state of the wrong component.
- Key should be something unique that won't ever change. Like item 'id' or other unique prop.
- Changing the key of the component will cause it's re-render. This i quite useful for efficient update,
  other than using the useEffect hook.
````jsx
function App() {
  const [chosenCount, setChosenCount] = useState(0);

  function handleSetClick() {
    // Now using this click we will cause the re-execution of the Counter component and reset it's counter
    setChosenCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <>
      <Header />
      <main>
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;

````


## PS. optimization library
- https://million.dev/