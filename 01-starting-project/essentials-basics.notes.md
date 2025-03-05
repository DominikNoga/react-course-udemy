# React notes
Library which helps building UI. It allows you to write a <b>declarative</b> UI code.
Which means, you just define target UI not, the steps how to get there. It is handled by the React library.
On the other hand JS uses <b>imperative</b> approach. So we define steps.

## Creating React App
- Using code sandbox online -> react.new 
- vite -> npm create vite@latest react-project
    - npm run dev -> runs a local server
    - npm i
    - ctrl + c  
- create react app -> old and slow

## Components
In order to acknowledge a file as a component in React it has to:
- Start with an Uppercase letter and use UpperCamelCase: 'MyComponent'
- Return a renderable content. Whcich means the jsx template or a string , boolean etc.


## Img loading
We can import images in react. It is better for optimization.
````jsx
import reactImg from '../../../assets/react-core-concepts.png'

export default function AppHeader() {
    return (
        <header>
            <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />  -> Standard html way
            <img src={reactImg} alt="Stylized atom" /> -> Optimized React way
            <h1>React Essentials</h1>
            <p>
                {description} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    )
}
````

## Props
We can pass some params to the component. It is called props
There are two syntaxes.

````jsx
export default function CoreConcept({ image, title, description }) {
    return (
        <li>
            <img src={image} alt="alt" />
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    )
}

export default function CoreConcept2(props) {
    return (
        <li>
            <img src={props.image} alt="alt" />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </li>
    )
}
````

## Css styles
We can split our css files into smaller pieaces. We can simply write our css code for the given component, in the same folder.
In order to apply those styles we need to import this css file into our component code.

````jsx
import './core-concepts-list.css'; // Importing the css file

export default function CoreConceptsList() {
    return ()
}
````

## Content projection
If we want to pass content to our component we can use two approaches

1. Use children props -> Those are built-in
````jsx

export default function TabButton(props) {
  return (
    <li>
        <button>
            { props.children }
        </button>
    </li>
  )
}

export function ButtonList() {
    return (
        <menu>
            <TabButton>
                Content
            </TabButton>
        </menu>
    );
}

````
2. Pass content as a custom prop
````jsx
export default function TabButton({text}) {
  return (
    <li>
        <button>
            { text }
        </button>
    </li>
  )
}

export function ButtonList() {
    return (
        <menu>
            <TabButton text={'Content'} />
        </menu>
    );
}
````

## Reacting to events
In order to react to some event like click | mouseMove, etc.
You need to use it with 'on' keyword

### Click
````jsx
export default function TabButton({
    children
}) {

    const handleClick = () => {
        console.log('button clicked');
    };

    return (
        <li>
        // IMPORTANT -> Do not execute this function, we want to run it on click not when it is rendered
            <button onClick={handleClick}>
                {children}
            </button>
        </li>
    )
}
````
#### Passing params
````jsx
export default function TabButton() {
    const handleClick = (param) => {
        console.log('button clicked');
    };

    return (
        <li>
            <button onClick={() => handleClick(Math.random())}>
                {children}
            </button>
        </li>
    )
}
````

## Executing react code
By default react code is executed just once, when it is rendered in the DOM.
Therefore changing the regular variable in the component won't make any difference.
We need to use state in order to trigger any change.

### Hooks
Special react function which allows state management, side effects and many others
Rules of hooks:
1. Can't be created outside of the component
2. Can't be created in a block 
    - some nested function
    - in if statement

### State
In order to manage application state we neeed to use a react hook.

#### UseState hook
````jsx
export default function ExamplesList() {
    // first value is a variable, second is a function used to set this variable
    // param in useState is an initial value
    const [selectedTopic, setSelectedTopic] = useState('Select a topic');
    const handleClick = (index) => {
        setSelectedTopic(TOPICS[index]);
        // IMPORTANT!! React won't update the state right away, it will schedule it
        // Therefore here it will print the old value
        // Updated value will be available after the next function component execution
        console.log(selectedTopic);
    };
    const options = ['Components', 'JSX', 'Props', 'State'];
    return (
        <div id="examples">
            <menu>
                {
                    options.map((option, index) => (
                        <TabButton onClick={() => handleClick(index)} key={index}>{ option }</TabButton>
                    ))
                }
            </menu>
            {selectedTopic}
        </div>
    )
}
````

## Conditional styling
