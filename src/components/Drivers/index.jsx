import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Header, Segment } from 'semantic-ui-react';

import { GET_DRIVERS } from '../../store/actions';
import { driverSelector } from '../../store/selectors';

import LandingContainer from '../LandingContainer';
import './style.css';

class Drivers extends Component {

  props: {
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
      <Segment className="Driver">
        <Header as='h1' textAlign='left'> Drivers
          <Header.Subheader> Below you can view all the drivers details. </Header.Subheader>
        </Header>
        <LandingContainer
          {...this.state}
          history={this.props.history}
          redirectTo={'/drivers/editDriver/'}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  getDriversList: driverSelector.getDriversList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDrivers: async () => {
    return dispatch(GET_DRIVERS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Drivers));
