import PropTypes from 'prop-types';
import './style.css'

function Header({children}) {
  return (
    <header className="header">
      {children}
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;