import React from 'react';
import PropTypes from 'prop-types';

// import NavBar from './../NavBar/NavBar.jsx';

import './style.css';

const App = (props) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  );

};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
