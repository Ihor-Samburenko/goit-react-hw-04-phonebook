import css from '../Phonebook/Phonebook.module.css';

import PropTypes from 'prop-types';

const PhoneBookList = ({ contacts, onDelete }) => {
  const elements = contacts.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      {name}: {number}
      <button onClick={() => onDelete(id)} className={css.btn}>
        Delete
      </button>
    </li>
  ));

  return <ul className={css.list}>{elements}</ul>;
};

export default PhoneBookList;

PhoneBookList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
