import { 
  Form,
  Link,
  useSearchParams,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';
import { useEffect } from 'react';
import authService from '../services/authService';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    if (!searchParams.get('mode')) {
      setSearchParams({ mode: 'login' });
    }
  }, [searchParams, setSearchParams]);
  
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

const BASE_URL = 'http://localhost:5000/';

const auth = async (authData, mode) => {
  try {
    const response = await fetch(`${BASE_URL}${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw new Error(`Something went wrong during login`)
    }
    const result = await response.json();
    authService.setUserData(result);
    console.log(result);
    return redirect('/');
  } catch (error) {
    return { error: error.message };  
  }
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const mode = new URL(request.url).searchParams.get('mode') || 'login';

  return await auth(authData, mode);
};
