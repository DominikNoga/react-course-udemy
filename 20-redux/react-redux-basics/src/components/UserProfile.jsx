import { useSelector } from 'react-redux';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const { auth: { login } } = useSelector((state) => state);
  return (
    <>

      <main className={classes.profile}>
        <h2>User Profile</h2>
        <p>Hello {login}</p>
      </main>
    </>
  );
};

export default UserProfile;
