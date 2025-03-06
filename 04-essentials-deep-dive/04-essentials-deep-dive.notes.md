# React essentials deep dive

## JSX
JSX is not required, we can just use function React.createElement function.
Behind the scenes we just build the react code and then we get exact same syntax.
Cause jsx is not readable by the browser.

### Fragment component
You cannot return two separate components in jsx template, therefore.
React is providing special component to wrap your elements and do not modify DOM.
Now we can just use empty brackets, but earlier we have used Fragment component provided by React.
````jsx
return (
    // Older code
    <Fragment>
        ... some code
    </Fragment>
    // Same as this below !!
    <>
      ... some code
    </>
)
````

## Good practices and common patterns
### Splitting up components
We should split up component when:
- The managed state in given component is not used in whole component
    * This is a problem, because we will re-render to much when a state is changed

### Props destructure
If we want to pass multiple props, and we do not wanna specify what exact props we will use.
To make it more scalable we can use props destructuring.

````jsx
// This is a wrapper component for section. It would be great to assign built in html props like class, id, onClick.
// Directly to the component without specifying them in component function
export default function AppSection({ title, children, ...props }) {
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}
// Usage of this ...props
export default function ExamplesList() {
     return (
        // booleanProp will be set to true in appSection component when no value is passed at all
        <AppSection id='examples' className='flex-section' booleanProp>
            <p>
                tertgxgxfcgdfgd
            <p/>
        </AppSection>
     )
}
````

### Passing multiple jsx values
We can pass more jsx templates to our component, not just using the children property.
We can also pass jsx as a normal prop.
````jsx

export default function AppTabs({children, buttons}) {
  return (
    <>
      <menu>
        {
          buttons
        }
      </menu>
      {
        children
      }
    </>
    <AppTabs buttons={
        <>
            <button>
            <button>
            <button>
        </>
    }>
        ...children
    </AppTabs>
  )
}
````

### Dynamic component type setting
In this example we are setting the wraper component dynamiaclly. The important thing is a prop format.
It has to start with a uppercase letter. Just like the custom component.
````jsx
export default function AppTabs({children, buttons, ButtonsContainer = 'menu'}) {
  // If this will be a string it will detect that we are passing a built-in component
  // If this will be a dynamic value, it will be a custom component
  return (
    <>
      <ButtonsContainer>
        {
          buttons
        }
      </ButtonsContainer>
    </>
    // USAGE in other component
    // if we passing built in component
    <AppTabs {...someProps} ButtonsContainer='div'></AppTabs>
    // if we passing custom component.
    <AppTabs {...someProps} ButtonsContainer={AppSection}></AppTabs>
  )
}
````

### Storing images and assets
Assets like images, that should be available to all users, and are not used in a components. Like background or favicon.
Should be stored in the public folder outside of a src folder. Those files will be available to all users on the page.
Other assets should be stored in the src/assets folder (name can be different). Those will be imported to components and not public.

### UseState how to use?
If we want to have our state change right away instead of scheduling it for later.
We need to set state using function instead of passing the value.

````jsx
export default function Player({ name, symbol }) {
  const [showInput, setShowInput] = useState(false);

  const toggleInputMode = () => {
    // Because of scheduling this won't cause changes to happen right away, and the showInput will be modified.
    setShowInput(!showInput);
    setShowInput(!showInput);
    // Here we are also scheduling the update, but we are passing the latest value for this state.
    // So we are guaranteed that this showInput will be the latest possible value
    setShowInput((showInput) => !showInput);
    setShowInput((showInput) => !showInput);
  };
  // ....
}
````

## Handling input and 2w data binding
If we want to bind a form input to the variable, we need to use value and onChange event.

````jsx
export default function Player({ name, symbol }) {
  const [playerName, setPlayersName] = useState(name);

  const onNameChange = (event) => {
    const newName = event.target.value;
    setPlayersName(newName);
  };

  return (
    <span className="player">
      // Setting on change will update the value based on user's input
      // Using value prop we are conntecting this input to our state variable
      <input type='text' onChange={onNameChange} value={playerName} required /> :
      <span className='player-name'>{playerName}</span>
    </span>
  )
}
````

## Sharing the state
If two components needs to share the same state, we have to use pattern called state lifting.
Which means we have to move the state to the neearest ancestor of both components.