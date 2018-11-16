import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { Container } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import NavBar from '../NavBar/NavBar.jsx';
// import TopNavbar from '../NavBar/TopNavbar.jsx';
import { getCookie } from '../../utils.js';


class RouteContainer extends Component {
  static propTypes = {
    componentToUse: PropTypes.any,
    location: PropTypes.object,
  };

  state = {
    verifyCallDone: true,
  };

  componentWillMount() {
    this.verifyAuth();
  }

  componentWillReceiveProps() {
    this.verifyAuth();
  }

  verifyAuth = () => {
    const token = getCookie('token');
    const userId = getCookie('user_id');
    if (isEmpty(token) || isEmpty(userId)) {
      this.setState({ verifyCallDone: false });
      window.location = `${window.location.origin}/login/`;
    }
    this.setState({ verifyCallDone: true });
  }

  render() {
    const { componentToUse: Component } = this.props;

    const { verifyCallDone } = this.state;

    if (verifyCallDone) {
      return (
        <Route
          {...this.props}
          render={props => (
            <div className="container iCleanContainer">
              <NavBar />
              <Container className="App">
                <Component {...props} />
              </Container>
            </div>
          )}
        />
      );
    }

    return null;
  }
}

export default RouteContainer;
