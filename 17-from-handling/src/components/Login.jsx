import { useState } from 'react';
import Input from './Input';
import useInput from '../hooks/useInput';

export default function Login() {
  const {
    enteredValue: enteredEmail,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasErrors: emailInvalid
  } = useInput((value) => value !== '' && value.includes('@'));

  const {
    enteredValue: enteredPassword,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasErrors: passwordInvalid
  } = useInput();

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredEmail);
    console.log(enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={(event) => handleEmailChange(event.target.value)}
          value={enteredEmail.value}
          error={emailInvalid && 'Please enter a valid email!'}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) => handlePasswordChange(event.target.value)}
          onBlur={handlePasswordBlur}
          value={enteredPassword.value}
          error={passwordInvalid && 'Please enter a valid password!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
