import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  // This hook allow us to use the action and submit the form without navigation to another page
  // It is great for the actions that are available on multiple pages
  // like newsletter signup form in the footer
  // fetcher offers multiple other features like loading state, data returned from action etc.
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      alert(data.message);
    }
  }, [data, state]);
  return (
    <fetcher.Form
      method="post"
      action='/newsletter'
      className={classes.newsletter}
    >
      <input
        type="text"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
