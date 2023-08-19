import css from '../components/App.module.css';
import {  NavLink, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAuthentificated,
  selectUserToken,
} from 'redux/auth/authSlice';
import { lazy, Suspense, useEffect } from 'react';
import { logoutUserThunk, refreshUserThunk } from 'redux/auth/authOperations';
import { Loader } from './Loader/Loader';
 

const Login = lazy(() => import('pages/Login'))
const Contacts = lazy(() => import('pages/Contacts'))
const Register = lazy(() => import('pages/Register'))



export function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const authentificated = useSelector(selectUserAuthentificated);

  useEffect(() => {
    console.log('qqqqq');

    if (!token || authentificated) return;

    dispatch(refreshUserThunk());
   
  }, [ token, dispatch, authentificated ]);
  

  const handleLogOut = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <div className={css.container}>
      <nav>
        {authentificated ? (
          <>
            <NavLink to="/contacts">Contacts</NavLink>
            <button onClick={handleLogOut}>Log Out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
      <Suspense fallback={<Loader /> }>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}
