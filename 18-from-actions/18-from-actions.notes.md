# Form actions
Built in feature since React 19+, that helps handling form submission in a easier way.

## Overview
We are passing the action by passing prop named like this to the form component.
This is known attribute from html, but it is overwritten in React env.

````jsx
export default function Signup() {
  // this object will be passed automatically 
  // in order to have access to the value we need to pass names to our input fields
  // this will also take care of prevent default and form reset after submit
  function handleSubmit(formData) {
    console.log(formData.get('email'));
  }
  return (
    <form action={handleSubmit}>
      <input type="email" name="email" />
      <input type="password" name="password" />
    </form>
  );
}
````

## getting form data outside the form
docs: http://react.dev/reference/react-dom/hooks/useFormStatus

We can use the useFormStatus hook to get the current form data and status.
The common use case is to disable the submit button while the form is submitting.

````jsx
export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
    </p>
  )
}
````

## Setting up few form actions
Instead of assigning the form action to the form itself, we can define specific actions for each button.
The example is a voting system where each button has its own action.
````jsx
function Component() {
  const voteUpAction = async () => {
    await upvoteOpinion(id);
  };
  const voteDownAction = async () => {
    await downvoteOpinion(id);
  };
  return (
    <form className="votes">
      {/* Instead of adding action prop to the form we add formAction to each button */}
      <button formAction={voteUpAction}>+</button>
      <button formAction={voteDownAction}>-</button>
    </form>
  );
}
````