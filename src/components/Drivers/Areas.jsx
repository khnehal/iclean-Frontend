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
  GET_AREAS,
  AREA_SAVED,
  AREA_ERRORS,
  RELOAD_AREAS,
  SAVE_AREA,
  DELETE_AREA,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class Areas extends Component {

  static propTypes = {
    driversList: PropTypes.array,
    areasList: PropTypes.array,
    areaErrors: PropTypes.array,
    areaSaved: PropTypes.string,
    reloadAreas: PropTypes.bool,
    areaDeleted: PropTypes.string,
    getDrivers: PropTypes.func,
    getAreas: PropTypes.func,
    saveArea: PropTypes.func,
    deleteArea: PropTypes.func,
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

  resetAndReload = () => {
    const {
      getAreas,
      resetData,
    } = this.props;

    resetData(RELOAD_AREAS, false);
    getAreas();
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
                    resetAndReload={this.resetAndReload}
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
  areasList: driverSelector.getAreasList(state),
  areaErrors: driverSelector.getAreaErrors(state),
  areaSaved: driverSelector.areaSaved(state),
  reloadAreas: driverSelector.reloadAreas(state),
  areaDeleted: driverSelector.areaDeleted(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDrivers: async () => {
    return dispatch(GET_DRIVERS());
  },
  getAreas: async (driverIds) => {
    return dispatch(GET_AREAS(driverIds));
  },
  saveArea: async (driverId, data) => {
    return dispatch(SAVE_AREA(driverId, data));
  },
  deleteArea:  async (driverId, zipCode) => {
    return dispatch(DELETE_AREA(driverId, zipCode));
  },
  resetData: async (type, data) => {
    return dispatch({ type, data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Areas));
