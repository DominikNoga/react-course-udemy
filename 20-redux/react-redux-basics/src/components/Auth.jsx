import { useDispatch } from 'react-redux';
import classes from './Auth.module.css';
import { AUTH_ACTIONS } from '../store/authSlice';

const Auth = () => {
  const dispatch = useDispatch();

  const handleAuth = (event) => {
    event.preventDefault();
    const login = event.target.login.value;
    dispatch(AUTH_ACTIONS.login(login));
  }
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleAuth}>
          <div className={classes.control}>
            <label htmlFor='login'>Login</label>
            <input type='text' id='login' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
