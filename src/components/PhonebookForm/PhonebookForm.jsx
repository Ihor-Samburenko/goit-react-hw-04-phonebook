import { Component } from 'react';

import css from '../Phonebook/Phonebook.module.css';

class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="">Name</label>
          <input
            value={name}
            onChange={this.handleChange}
            placeholder="Contact name"
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="">Number</label>
          <input
            value={number}
            onChange={this.handleChange}
            placeholder="Phone number"
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default PhonebookForm;
