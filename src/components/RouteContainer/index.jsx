import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter, Route } from 'react-router';
import { Route } from 'react-router';

import { Container } from 'semantic-ui-react';

import NavBar from '../NavBar/NavBar.jsx';

// import {
//   USER_AUTH_VERIFY,
// } from '../store/actions';

// import {
//   AuthSelector,
// } from '../store/selectors';


class RouteContainer extends Component {
  static propTypes = {
    componentToUse: PropTypes.any,
    // isAuthenticated: PropTypes.bool,
    location: PropTypes.object,
    // verifyAuthCall: PropTypes.func,
  };

  state = {
    verifyCallDone: true,
  };

  // componentWillMount() {
  //   const { isAuthenticated } = this.props;

    // this.setState({ verifyCallDone: false });
    // if (!isAuthenticated) {
    //   this.verifyAuth();
    // } else {
    //   this.setState({ verifyCallDone: true });
    // }
  // }

  verifyAuth = async () => {
    const {
      verifyAuthCall,
    } = this.props;
    this.setState({ verifyCallDone: false });
    await verifyAuthCall();
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

// const mapStateToProps = (state) => ({
//   isAuthenticated: AuthSelector.getIsAuthenticated(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   verifyAuthCall: async (history) => {
//     return dispatch(USER_AUTH_VERIFY(history));
//   },
// });


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RouteContainer));
export default RouteContainer;
