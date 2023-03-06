import { useState, useEffect } from 'react';

import ContactsBlock from 'components/ContactsBlock/ContactsBlock';
import PhoneBookList from 'components/PhonebookList/PhoneBookList';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import css from '../Phonebook/Phonebook.module.css';
import { nanoid } from 'nanoid';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const items = JSON.parse(localStorage.getItem('phonebook'));
    return items?.length ? items : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => setFilter(e.target.value);

  const addContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      return alert(`${name} is already exist`);
    }

    setContacts(prevContacts => {
      // Значення стейту на момент виклику превстейту, що ввели в форму і всі попередні контакти
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [...prevContacts, newContact];

      // повертає об'єкт в якому є список старих контактів і в кінець додаємо новий
    });
  };

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number === number
      );
    });
    return Boolean(dublicate);
  };

  const onDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getFilter = () => {
    if (!filter) {
      return contacts;
    }

    const normalazedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazedFilter)
    );
  };

  const items = getFilter();

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Phonebook</h2>
      <div className={css.block}>
        <ContactsBlock title="Phonebook"></ContactsBlock>
        <PhonebookForm onSubmit={addContact} />
        <ContactsBlock title="Contacts">
          <input
            value={filter}
            onChange={handleFilterChange}
            className={css.input}
            placeholder="Find contact"
          />

          <PhoneBookList items={items} onDelete={onDelete} />
        </ContactsBlock>
      </div>
    </div>
  );
};

export default Phonebook;
