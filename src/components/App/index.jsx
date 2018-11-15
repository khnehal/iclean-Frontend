import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';

// import NavBar from './../NavBar/NavBar.jsx';

import './style.css';

const App = (props) => {
  const { children } = props;

  return (
    <div>
      <Container className="App">
        {children}
      </Container>
    </div>
  );

};

App.propTypes = {
  children: PropTypes.any,
};

export default App;
