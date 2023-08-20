import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from 'redux/contacts/contactsOperations';
import { selectUserContacts } from 'redux/contacts/contactsSlice';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectUserContacts);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;

    const name = form.elements.contactName.value;
    const number = form.elements.contactNumber.value;

    console.log('name', name);

    if (contacts.some(contact => contact.name === name))
      return alert(`Contact with name ${name} already exists!`);

    dispatch(addContactThunk({ name: name.trim() , number }));

    event.currentTarget.reset()
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Name:</p>
        <input name="contactName" type="text" pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      </label>
      <br />
      <label>
        <p>Number:</p>
        <input name="contactNumber" type="text" pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      </label>
      <br />
      <button type="submit">Add contact</button>
    </form>
  );
}
