import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './style.css';

import { Header } from 'semantic-ui-react'; //eslint-disable-line

import { GET_DRIVERS } from '../../store/actions.js';
import { DriversSelector } from '../../store/selectors.js';

import LandingContainer from '../LandingContainer';

class Drivers extends Component {

  static propTypes = {
    history: PropTypes.object,
    getDrivers: PropTypes.func,
    getDriversList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'ABC',
          dateTime: '12-oct-18',
        },
        {
          name: 'EFG',
          dateTime: '19-nov-18',
        }
      ],
    };
  };

  componentDidMount() {
    this.props.getDrivers();
  }

  render() {

    return (
      <div className="Driver">
        <Header as='h1' textAlign='left'> Drivers
          <Header.Subheader> Below you can view all the drivers details. </Header.Subheader>
        </Header>
        <LandingContainer
          {...this.state}
          history={this.props.history}
          redirectTo={'/drivers/editDriver/'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDriversList: DriversSelector.getDriversList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDrivers: async () => {
    return dispatch(GET_DRIVERS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Drivers));
