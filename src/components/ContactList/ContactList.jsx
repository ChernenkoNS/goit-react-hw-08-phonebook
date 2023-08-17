import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteContact, fetchContact } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';
import css from '../ContactList/ContactList.module.css';

export const ContactList = () => {
  const filteredContactsByName = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul>
      {filteredContactsByName.map(({ name, number, id }) => (
        <li key={id} className={css.contactsItem}>
          <p>
            {name}: {number}
          </p>
          <button onClick={() => handleDelete(id)}>Delet</button>
        </li>
      ))}
    </ul>
  );
};


