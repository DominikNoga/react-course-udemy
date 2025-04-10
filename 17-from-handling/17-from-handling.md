# Forms
Forms are combination of input fields, we want to both submit the form and validate the data that user is entering.

## Form submission
There are several ways for getting form data and handling it's submission, here we will go over them.

### Creating the form
````jsx
export default function Login() {
  // e is an event object, which is created for each event in browser 'click', 'hover', 'form submit'
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submission');
    console.log(e.target.email.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">Reset</button>
        <button type="submit" className="button">Login</button>
      </p>
    </form>
  );
}

````

### Getting user input
Throughout the course many ways of getting user input was shown.
For example:
- Using state, for each input field. Combining input onChange property with the value property.
  - cons: We need to implement update function for each form field
- Using shared state which will combine every input
````jsx
// State update
function Form() {
  updateState(fieldName, value) {
    setFormData(prevData => {
      ...prevData,
      [fieldName]: value
    })
  }
}
````
- using the refs -> Example in section 08-refs-and-portals
- using the native browser API
````jsx
export default function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    // FormData is a class provided by the js, that we can use
    // formData has access to methods like 'get', 'set', etc.
    // NOTE: in order to get this data all inputs must have a name property
    const formData = new FormData(e.target);
    // This is a trick to extract a form data as an object
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }
}
````

## Form validation
It is checking if the user input is in correct format. And applies to our rules.
There are several options of how we can validate the data.

### On each key stroke
- We need to listen to all changes on input
- Therefore we need to use state for managing our error state
#### RISK: the error message will be displayed to early
  - Before user started typing anything
  - User is still typing for the first time

````jsx
export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  // This will run on each component re-render so for each key stroke
  // We check
  const emailIsInvalid =
    enteredValues.email !== '' && !enteredValues.email.includes('@');
}
````

#### SOLUTION: validating the field when the focus is lost
The solution for this problem can be validating the field after user is swithcing to different
form field or switches the focus to other place. We can use the onBlur event for that
NOTE: We should reset is edited value as soon as user starts typing again in order to hide error message

````jsx
export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: {
      value: '',
      edited: false
    },
  });
  const emailIsInvalid =
    enteredValues.email.edited &&
    enteredValues.email.value !== '' &&
    !enteredValues.email.value.includes('@');

  function handleInputBlur(identifier) {
    // We need to assign this function to onBlur event of the input field
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: {
        value: prevValues[identifier].value,
        edited: true
      },
    }));
  }
}
````

### Upon from submission
If we don't want to validate on every keystroke, we can just show error message,
after the form was submitted.

SUMMARY: this approach is simpler and requires less code, but can be less informative for a user.
NOTE: even when doing validation on each key we still need to validate after submission to prevent sending the wrong data

````jsx
import { useRef, useState } from 'react';

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const email = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const emailIsValid = enteredEmail.includes('@');

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log('Sending HTTP request...');
  }
}
````