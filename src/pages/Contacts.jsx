// import { ContactForm } from "components/ContactForm/ContactForm"
// import { ContactList } from "components/ContactList/ContactList"
// import { Filter } from "components/Filter/Filter"

import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAuthentificated } from 'redux/auth/authSlice';
import {
  addContactThunk,
  deleteContactThunk,
  requestContactsThunk,
} from 'redux/contacts/contactsOperations';
import {
  selectContactsError,
  selectContactsIsLosding,
  selectUserContacts,
} from 'redux/contacts/contactsSlice';

const Contacts = () => {
  const authentificated = useSelector(selectUserAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsLosding);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) return;

    dispatch(requestContactsThunk());
  }, [authentificated, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.contactName.value;
    const number = form.elements.contactNumber.value;

    dispatch(
      addContactThunk({
        name,
        number,
      })
    ); 
  };

  const handleDeleteContact = contactId => {
   dispatch(deleteContactThunk(contactId))
  }

  const showContacts = Array.isArray(contacts) && contacts.length > 0;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name:</p>
          <input name="contactName" type="tect" required />
        </label>
        <br />
        <label>
          <p>Number:</p>
          <input name="contactNumber" type="text" required />
        </label>
        <br />
        <button type="submit">Add contact</button>

      </form>

      {isLoading && <Loader />}
      {error && <p>Ooops some error occured {error} </p>}
      <ul>
        {showContacts &&
          contacts.map(contact => {
            return (
              <li key={contact.id}>
                <h3>Name: {contact.name}</h3>
                <p>Number: {contact.number}</p>
                <button type="button" onClick={() => handleDeleteContact(contact.id)}> X </button>

              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Contacts;
