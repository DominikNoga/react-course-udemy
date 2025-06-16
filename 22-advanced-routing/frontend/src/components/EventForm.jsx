import { Form, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // This Form component will prevent the default submission behavior and pass the request to the action function
    // Defined in the route
    <>
      {
        isSubmitting && <p>Form submission in progress...</p>
      }
      {
        data && data.errors &&
          <ul>
            {
              Object.values(data.errors).map(err => (
                <li>{err}</li>
              ))
            }
          </ul>
      }
      <Form method='POST' className={classes.form}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            defaultValue={event ? event.title : ''}
          />
        </p>
        <p>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="url"
            name="image"
            required
            defaultValue={event ? event.image : ''}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            required
            defaultValue={event ? event.date : ''}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={event ? event.description : ''}
          />
        </p>
        <div className={classes.actions}>
          <button 
            disabled={isSubmitting} 
            type="button" 
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button disabled={isSubmitting}>Save</button>
        </div>
      </Form>
    </>
  );
}

export default EventForm;
