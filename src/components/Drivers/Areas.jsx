import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Segment, Header, Button, Grid, Icon } from 'semantic-ui-react';
import './style.css';

import DriverAreas from './DriverAreas';
import {
  GET_DRIVERS,
  AREA_SAVED,
  AREA_ERRORS,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class Areas extends Component {

  static propTypes = {
    driversList: PropTypes.array,
    getDrivers: PropTypes.func,
    resetData: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
    };
  };

  componentDidMount() {
    this.props.getDrivers();
  }

  componentWillReceiveProps(nextProps) {
    const {
      areaSaved,
      areaErrors,
    } = nextProps;

    if (areaSaved && !(areaErrors && areaErrors.length > 0)) {
      this.fadeOutMessage();
    }
  }

  fadeOutMessage = () => {
    const {
      resetData
    } = this.props;
    window.setTimeout(() => {
      resetData(AREA_SAVED, '');
      resetData(AREA_ERRORS, []);
    }, 3000);
  }

  render() {
    const {
      driversList
    } = this.props;

    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'>
              Drivers
              <Header.Subheader> Below you can view all the Zip Code details </Header.Subheader>
            </Header>
            <Button floated='right' color='green' as={NavLink} to={'/drivers/addDrivers'}> <Icon name='plus' /> Add a Driver </Button>
          </Segment>
          <Segment padded basic textAlign='center'>
            <Grid>
              { driversList.map((driver, i) => {
                return (
                  <DriverAreas
                    key={i + 1}
                    {...this.state}
                    fadeOutMessage={this.fadeOutMessage}
                    driver={driver}
                  />
                )
              })}
            </Grid>
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  driversList: driverSelector.getDriversList(state),
  areaSaved: driverSelector.areaSaved(state),
  areaErrors: driverSelector.getAreaErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDrivers: async () => {
    return dispatch(GET_DRIVERS());
  },
  resetData: async (type, data) => {
    return dispatch({ type, data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Areas));
