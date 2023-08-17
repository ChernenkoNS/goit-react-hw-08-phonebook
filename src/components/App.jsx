// import { ContactList } from './ContactList/ContactList';
// import { ContactForm } from './ContactForm/ContactForm';
// import { Filter } from './Filter/Filter';
import css from '../components/App.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
// import { Suspense } from 'react';

import Login from 'pages/Login'
import Contacts from 'pages/Contacts'
import Register  from 'pages/Register'


export function App() { 
  return (
    <div className={css.container}>
        <nav>
          <NavLink to='/contacts'>Contacts</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </nav>
      <Routes >
          <Route path="login" element={<Login />}/>
          <Route path="contacts" element={<Contacts />}/> 
          <Route path="register" element={<Register />}/>
      </Routes>
    </div>
  );
}


 