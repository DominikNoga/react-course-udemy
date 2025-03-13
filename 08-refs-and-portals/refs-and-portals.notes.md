# Refs and portals
## Ref
This is a special kind of variable, which is accessed by using built-in useRef hook.
It gives you access to the referenced native html element. Which is stored in ref.current property.

It is great for handling input when update on each key stroke is not needed
````jsx
export default function Player() {
  const playerNameInput = useRef();
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = () => {
    // We are updating name on click, instead of every key stroke
    setPlayerName(playerNameInput.current.value);
  }
  return (
    <section id="player">
      <p>
        <input
          ref={playerNameInput}
          type="text"
        />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
````

### Storing other values with ref
Refs can be used for any other things, not only html native elements.
The advantage for storing variables with ref is that the value is not lost.
When a component function is re-executed.
````jsx
// In this example we are storing the timeout id using ref, to make sure that.
// Even when the component f is executed we will have an access to exact same timer.
// And it will be different in every component
export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();

    const handleStart = () => {
        setGameStarted(true);
        timer.current = setTimeout(() => {
            setTimerExpired(true);
        }, targetTime * 1000);
    };

    const handleStop = () => {
        clearTimeout(timer.current);
    };
}
````

### Using ref as a prop
Since React 19 we can pass a reference as a prop to the other components.
Earlier you were forced to use forwardRef function. Which you should wrap around your component function
and pass a ref as a parameter.
````jsx
const ResultModal = forwardRef(function ResultModal({props}), ref) {
  // We can use ref just like passing it as a prop since react 19
  return (
    // ... component template
  )
}
````

### Ref vs State
- Changing state causes component function to re-execute. Refs does not do that.
- State should be used for values displayed in the UI
- State shouldn't be used for values that are not displayed. Some helper values.

## Exposing component API, and referencing the custom component
There is a way to expose a function defined inside our component and use it in other components.
By referencing this one.
````jsx
export default function ResultModal({result, targetTime, ref}) {
  const dialogRef = useRef();
  // hook from react
  useImperativeHandle(ref, () => ({
    // custom method that could be used in other components
    open() {
      dialogRef.current.showModal();
    }
  }));

  return (
    <dialog className='result-modal' ref={dialogRef}>
      ...some content
    </dialog>
  )
}

````

## Portal
We can move our component to be rendered in a different place than the one specified in our JSX code.
This is useful for stuff like modals, or other components that we don't want to place in automatic place.

For this use case React offers createPortal function from reac-dom which allows you to specify where,
the component should be injected
````jsx
export default function ResultModal({ remainingTime, targetTime, ref, onReset }) {
  return createPortal(
    <dialog className='result-modal' ref={dialogRef}>
      // ...content
    </dialog>,
    // Here we are injecting our modal to the div with id modal, which is placed in index.html file
    document.getElementById('modal')
  );
}
````