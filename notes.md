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
