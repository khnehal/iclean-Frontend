import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Input, Button, Grid, Icon } from 'semantic-ui-react';
import './style.css';

import {
  // GET_DRIVERS,
  GET_AREAS,
  // AREA_SAVED,
  // AREA_ERRORS,
  // RELOAD_AREAS,
  SAVE_AREA,
  DELETE_AREA,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class DriverAreas extends Component {

  static propTypes = {
    area: PropTypes.object,
    index: PropTypes.number,
    resetAndReload: PropTypes.func,
    // fadeOutMessage: PropTypes.func,
    // driversList: PropTypes.array,
    // areasList: PropTypes.array,
    // areaErrors: PropTypes.array,
    // areaSaved: PropTypes.string,
    reloadAreas: PropTypes.bool,
    // areaDeleted: PropTypes.string,
    // getDrivers: PropTypes.func,
    getAreas: PropTypes.func,
    saveArea: PropTypes.func,
    deleteArea: PropTypes.func,
    resetData: PropTypes.func,
  };

  state = {
    zipCode: '',
    driverId: this.props.area.driver_id,
  };

  componentWillReceiveProps(nextProps) {
    const {
      reloadAreas,
      resetAndReload,
    } = nextProps;

    if (reloadAreas) {
      resetAndReload();
    }
  }

  onDeleteArea = (id, zipCode) => {
    this.props.deleteArea(id, zipCode);
  }

  onAddZipCode = (id) => {
    this.props.saveArea(id, { zip_code: this.state.zipCode });
  }

  handleChange = (e, { value }) => {
    this.setState({ zipCode: value });
  }

  render() {
    const {
      zipCode,
      driverId,
    } = this.state;

    const {
      index,
      area,
    } = this.props;

    return (
      <Grid.Column key={ index + 1 } mobile={16} tablet={8} computer={8}>
        <Segment>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={10}>
              <Input
                fluid
                size='large'
                type={'number'}
                placeholder={'Please enter zipcode here...'}
                value={zipCode}
                onChange={this.handleChange}
                name='zip_code'
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Button fluid floated='right' color='green' onClick={() => this.onAddZipCode(driverId)}>
                <Icon name='plus' /> Add Zip Code
              </Button>
            </Grid.Column>
          </Grid>
          <Grid>
            {
              area.driver_areas.map((driverArea, i) => {
                return (
                  <Grid.Column key={ i + 1 } mobile={16} tablet={8} computer={5}>
                    <Button
                      basic
                      circular
                      color={'red'}
                      size='medium'
                      icon='delete'
                      onClick={() => this.onDeleteArea(driverId, driverArea.zip_code)}
                    />
                    <span>{ driverArea.zip_code }</span>
                  </Grid.Column>
                )
              })
            }
          </Grid>
        </Segment>
      </Grid.Column>
    );
  }
};


const mapStateToProps = (state) => ({
  // driversList: driverSelector.getDriversList(state),
  // areasList: driverSelector.getAreasList(state),
  // areaErrors: driverSelector.getAreaErrors(state),
  // areaSaved: driverSelector.areaSaved(state),
  reloadAreas: driverSelector.reloadAreas(state),
  // areaDeleted: driverSelector.areaDeleted(state),
});

const mapDispatchToProps = (dispatch) => ({
  // getDrivers: async () => {
  //   return dispatch(GET_DRIVERS());
  // },
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DriverAreas));
