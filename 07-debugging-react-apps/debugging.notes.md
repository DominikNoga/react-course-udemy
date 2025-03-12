# Debugging
In react apps we can debug using the built-in debugger. There are some helpers like StrictMode and React dev tools.

## StrictMode
This is a separate react component, we can wrap components inside our app with it.
````jsx
    import { StrictMode } from 'react';
    ReactDOM.createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
````
### What it does?
docs: https://legacy.reactjs.org/docs/strict-mode.html
* In dev mode it runes every component function twice. It helps detect errors when for example our code is mutable.
    And we see some changes twice
* Identifying components with unsafe lifecycles
* Warning about legacy string ref API usage
* Warning about deprecated findDOMNode usage
* Detecting unexpected side effects
* Detecting legacy context API
* Ensuring reusable state