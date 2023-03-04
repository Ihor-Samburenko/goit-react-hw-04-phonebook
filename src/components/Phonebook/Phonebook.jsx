import { Component } from 'react';

import ContactsBlock from 'components/ContactsBlock/ContactsBlock';
import PhoneBookList from 'components/PhonebookList/PhoneBookList';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import css from '../Phonebook/Phonebook.module.css';
import { nanoid } from 'nanoid';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('phonebook'));
    if (contacts && contacts.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem('phonebook', JSON.stringify(contacts));
    }
  }

  onDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  // беремо зі стейту пусті значення ней і намбер і ресетимо поля, в інпут додаємо атрибут велью зі значеннями нейм і намбер

  getFilter() {
    const { filter, contacts } = this.state;

    const normalazedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalazedFilter)
    );
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number === number
      );
    });

    return Boolean(dublicate);
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate({ name, number })) {
      return alert(`${name} is already exist`);
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      // Значення стейту на момент виклику превстейту, що ввели в форму і всі попередні контакти

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [...contacts, newContact] };

      // повертає об'єкт в якому є список старих контактів і в кінець додаємо новий
    });
  };

  render() {
    const contacts = this.getFilter();

    return (
      <div className={css.wrapper}>
        <h2 className={css.title}>Phonebook</h2>
        <div className={css.block}>
          <ContactsBlock title="Phonebook"></ContactsBlock>
          <PhonebookForm onSubmit={this.addContact} />
          <ContactsBlock title="Contacts">
            <input
              value={this.state.filter}
              onChange={this.handleFilterChange}
              className={css.input}
              placeholder="Find contact"
            />

            <PhoneBookList contacts={contacts} onDelete={this.onDelete} />
          </ContactsBlock>
        </div>
      </div>
    );
  }
}

export default Phonebook;
