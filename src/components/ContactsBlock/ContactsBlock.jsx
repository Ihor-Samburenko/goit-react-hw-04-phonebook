import css from '../ContactsBlock/ContactsBlock.module.css';
import PropTypes from 'prop-types';

const ContactsBlock = ({ title, children }) => {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>{title}</h3>
      {children}
    </div>
  );
};

export default ContactsBlock;

ContactsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array,
};
