import { Filter } from 'components/Filter/Filter';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'redux/contacts/contactsOperations';
import { selectUserContacts } from 'redux/contacts/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectUserContacts);

  const handleDeleteContact = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  const showContacts = Array.isArray(contacts) && contacts.length > 0;

  const [filterValue, setFilterValue] = useState('');

  const changeFilter = e => {
    const value = e.currentTarget.value;
    setFilterValue(value);
  };

//   const visibleContacts = contacts.filter(contact =>
//     contact.name.toLowerCase().includes(filterValue.toLowerCase())
//   );

  return (
    <div>
      {showContacts && <Filter value={filterValue} onChange={changeFilter} />}
      <ul>
        {showContacts &&
          contacts.map(contact => {
            return (
              <li key={contact.id}>
                <h3>Name: {contact.name}</h3>
                <p>Number: {contact.number}</p>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  {' '}
                  X{' '}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
