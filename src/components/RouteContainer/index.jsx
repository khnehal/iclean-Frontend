import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import { Container } from 'semantic-ui-react';

import './style.css'
import NavBar from '../NavBar/NavBar.jsx';
import TopStickyNavBar from '../NavBar/TopStickyNavBar.jsx';
import { verifyAuth } from '../../utils.js';


class RouteContainer extends Component {
  static propTypes = {
    componentToUse: PropTypes.any,
    location: PropTypes.object,
  };

  state = {
    verifyCallDone: true,
  };

  componentWillMount() {
    if (verifyAuth()) {
      this.setState({ verifyCallDone: true });
    } else {
      this.setState({ verifyCallDone: false });
      window.location = `${window.location.origin}/login/`;
    }
  }

  componentWillReceiveProps() {
    if (verifyAuth()) {
      this.setState({ verifyCallDone: true });
    } else {
      this.setState({ verifyCallDone: false });
      window.location = `${window.location.origin}/login/`;
    }
  }

  render() {
    const { componentToUse: Component } = this.props;

    const { verifyCallDone } = this.state;

    if (verifyCallDone) {
      return (
        <Route
          {...this.props}
          render={props => (
            <div>
              <TopStickyNavBar />
              <div className="container iCleanContainer">
                <NavBar />
                <Container className="App">
                  <Component {...props} />
                </Container>
              </div>
            </div>
          )}
        />
      );
    }

    return null;
  }
}

export default RouteContainer;
