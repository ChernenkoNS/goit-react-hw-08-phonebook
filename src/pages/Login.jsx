import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate,  } from 'react-router-dom';
import { loginUserThunk } from 'redux/auth/authOperations';
import { selectUserAuthentificated } from 'redux/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const authentificated = useSelector(selectUserAuthentificated)


  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.elements.userEmail.value;
    const password = form.elements.userPassword.value;

    dispatch(
      loginUserThunk({
        email,
        password,
      })
    );
  };
if(authentificated) return <Navigate to="/contacts"/>

  return (
    <div>
      <h1>Logit Into your Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input name="userEmail" type="email" required />
        </label>
        <br />
        <label>
          <p>Password:</p>
          <input name="userPassword" type="password" required minLength={7} />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default Login;
