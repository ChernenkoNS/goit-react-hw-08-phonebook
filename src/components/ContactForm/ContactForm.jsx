import css from '../ContactForm/ContactsForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import shortid from 'shortid';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

export function ContactForm() {
  const contacts = useSelector(selectContacts);
  const [nameValue, setNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = event => {
    const form = event.target;
    switch (form.name) {
      case 'name':
        setNameValue(form.value);
        break;
      case 'number':
        setNumberValue(form.value);
        break;

      default:
        return;
    }
  };

  const checkingUniqueNames = nameValue => {
    return contacts.find(obj => obj.name === nameValue);
  };

  const addContactName = (nameValue, numberValue) => {
    if (checkingUniqueNames(nameValue)) {
      alert(`${nameValue} is already is contacts`);
    } else {
      const newContact = {
        name: nameValue,
        number: numberValue,
        contactId: shortid.generate(),
      };

      dispatch(addContact(newContact));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    addContactName(nameValue, numberValue);

    setNameValue('');
    setNumberValue('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        value={nameValue}
        onChange={handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label>Number</label>

      <input
        value={numberValue}
        onChange={handleChange}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button>Add contact</button>
    </form>
  );
}
