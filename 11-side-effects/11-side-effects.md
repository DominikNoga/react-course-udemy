# Side effects
A side effect is an action/task that does not impact the component render cycle directly.

## useEffect hook
This is a function which runs once per render cycle.
It also can be configured to run only when a certain dependency is changed.
Dependency is either state or a prop.
It was created to mimic the behavior of class components and use logic like in componentDidUpdate or componentDidMount.

Typical use-cases:
- fetching data based on the state
- setting up subscriptions or timers
- filtering the data based on the state
- modifying the DOM -> for example using some ref methods (ref is available in useEffect but on in main block of function component)

````jsx
const Component = ({props}) => {
  const [name, setName] = useState('Dominik');

  // This effect will run every time the name changes
  useEffect(() => {
    // Here for example we are fetching user friends to display them
    getUserFriends(name);

    return () => {
      // perform cleanup;
      /*
        here we can for example:
          * clearTimeout
          * unsub to an observable
          * etc.
      */
    }
  }, [name]);

  // This will run on each render
  useEffect(() => {});
  // this will run only on first render
  useEffect(() => {}, []);
}
````

## useCallback hook
Makes it possible to save function definition in memory and not recreate it each time,
a component is re-rendered. It is useful when we are using function inside of useEffect dependencies.
Then we won't trigger useEffect to run again when the component function runs again and re-declares a function.

````jsx
function Parent() {
  // store this function in memory and recreate only when dependency is changing
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setIsModalOpen(false);
  }, []);
  return (
    <DeleteConfirmation onConfirm={handleRemovePlace} />
  )
}

function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    // do sometthing each time onConfirm changes
  }, [onConfirm]);

  return ();
}
````
