# Ways to style the React app
## Using vanilla css
We can easily use vailla css with jsx. We can split styles between components.
Into several files, the problem is even when we are splitting the css files.
The styles are not scoped to the component. We are using those styles by importing them into our components.
Using normal import syntax

### Conditional styling with vanilla css
We can add a class dynamically.
````jsx
export default function Header() {
  return (
    <header>
        <p className={invalid ? 'invalid' : undefined}></p>
        <label className={`label ${invalid ? 'invalid' : ''}`}></label>
    </header>
  );
}
````

### Css modules
This is feature provided by Vite, we can convert our css file to a module. By naming it 'file-name.module.css'.
Then import it to our component using different syntax.
Under the hood our build tool will transform those class names to the unique value, so even after assiging it to a different component it won't affect it.

````jsx
import logo from '../assets/logo.png';
// Build tool provides us with an object, the name is up to the developer
// it gives an access to
import classes from './header.module.css';

export default function Header() {
  return (
    <header>
      <p className={classes.headerParagraph}>A community of artists and art-lovers.</p>
    </header>
  );
}
````

## In-line styling
We can set any style in-line using the style prop and passing an object. With css props.
This should be only added if we want to add some style conditionaly. Otherwise it is too big
of a mess in a codebase.
````jsx
export default function Header() {
  return (
    <header>
      <p style={{
        color: isInvalid ? 'red' : 'inherit',
        'text-align': 'center'
      }}>A community of artists and art-lovers.</p>
    </header>
  );
}
````

## Styled-components
It is a third party lib, which provides an access to the ready components.
````bash
    npm i styled-components
````

<b>Tagged template resources:</b> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

It gives us the control of an object which has access to the html tags. We can create custom react components
with styles applied. By using special template tag syntax. Which is like passing template literals to a function.
````jsx
import { styled } from 'styled-components'

// This creates a custom ControlsContainer which can be used instead of div in the template
const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

return (
    // Styled components by default forward props and also use 'children' props so we can inject the content inside.
    <ControlsContainer>
        <Label className={invalid ? 'invalid' : undefined}></Label>
    </ControlsContainer>
)
````

### Styling components dynamically
We can style components dynamically using template literals. We should use a function there.
Because this is how the special template tag syntax works. We can now get access to 'props'
object which will store every prop added to the Label component. Here we are using desctructure.
````jsx
export const Label = styled.label`
  text-transform: uppercase;
  color: ${({invalid}) => invalid ? INVALID_COLOR : '#6b7280'};
`;
// Usage
return (
    <div>
        <Label inalid={emailInvalid}>tetxty</Label>
    </div>
)
````

### Media queries and nested selectors and pseudo selectors
We can use nested styles using the syntax like in scss. Using the '&' symbol.

````jsx
const AppHeader = styled.header`
  display: flex;

  &:hover {
    cursor: pointer;
  }

  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  @media (min-width: 768px) {
    margin-bottom: 4rem;

    & h1 {
        font-size: 2.25rem;
    }
  }
`;
````

### Pros and cons

- Pros:
  - it gives us easy possibility to scope styles for a component
  - we can re-use the styles not like in inline styles
  - it is easy to set up
  - we can use js syntax combined with a css
- Cons:
  - Poor separation of css code and react code
  - Creating a bunch of wrapper components for everything in our template
