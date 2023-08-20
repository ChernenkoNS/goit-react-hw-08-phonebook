// import { ContactForm } from "components/ContactForm/ContactForm"
// import { ContactList } from "components/ContactList/ContactList"
// import { Filter } from "components/Filter/Filter"

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthentificated } from 'redux/auth/authSlice';
import { requestContactsThunk } from 'redux/contacts/contactsOperations';
import {
  selectContactsError,
  selectContactsIsLosding,
} from 'redux/contacts/contactsSlice';

const Contacts = () => {
  const authentificated = useSelector(selectUserAuthentificated);
  const isLoading = useSelector(selectContactsIsLosding);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) return;

    dispatch(requestContactsThunk());
  }, [authentificated, dispatch]);

  return (
    <section>
      <ContactForm />
      {isLoading && <Loader />}
      {error && <p>Ooops some error occured {error} </p>}
      <ContactList />
    </section>
  );
};

export default Contacts;

// import { ContactForm } from "components/ContactForm/ContactForm"
// import { ContactList } from "components/ContactList/ContactList"
// import { Filter } from "components/Filter/Filter"

// import { ContactForm } from 'components/ContactForm/ContactForm';
// import { ContactList } from 'components/ContactList/ContactList';
// import { Loader } from 'components/Loader/Loader';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUserAuthentificated } from 'redux/auth/authSlice';
// import {
//     addContactThunk,
//     deleteContactThunk,
//   requestContactsThunk,
// } from 'redux/contacts/contactsOperations';
// import {
//   selectContactsError,
//   selectContactsIsLosding,
//     selectUserContacts,
// } from 'redux/contacts/contactsSlice';

// const Contacts = () => {
//   const authentificated = useSelector(selectUserAuthentificated);
//     const contacts = useSelector(selectUserContacts);
//   const isLoading = useSelector(selectContactsIsLosding);
//   const error = useSelector(selectContactsError);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!authentificated) return;

//     dispatch(requestContactsThunk());
//   }, [authentificated, dispatch]);

//     const handleDeleteContact = contactId => {
//       dispatch(deleteContactThunk(contactId))
//      }

//     const handleSubmit = event => {
//       event.preventDefault();

//       const form = event.currentTarget;

//       const name = form.elements.contactName.value;
//       const number = form.elements.contactNumber.value;

//       console.log('name', name);

//       if(contacts.some(contact => contact.name === name))
//       return alert(`Contact with name ${name} already exists!`  )

//       dispatch( addContactThunk({name, number,})
//       );

//     };

//     const showContacts = Array.isArray(contacts) && contacts.length > 0;

//   return (
//     <section>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <p>Name:</p>
//           <input name="contactName" type="tect" required />
//         </label>
//         <br />
//         <label>
//           <p>Number:</p>
//           <input name="contactNumber" type="text" required />
//         </label>
//         <br />
//         <button type="submit">Add contact</button>

//       </form>

//       <ContactForm />

//       {isLoading && <Loader />}
//       {error && <p>Ooops some error occured {error} </p>}
//       <ul>
//         {showContacts &&
//           contacts.map(contact => {
//             return (
//               <li key={contact.id}>
//                 <h3>Name: {contact.name}</h3>
//                 <p>Number: {contact.number}</p>
//                 <button type="button" onClick={() => handleDeleteContact(contact.id)}> X </button>

//               </li>
//             );
//           })}
//       </ul>
//       <ContactList />
//     </section>
//   );
// };

// export default Contacts;
