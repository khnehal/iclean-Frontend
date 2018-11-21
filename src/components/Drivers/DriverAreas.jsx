import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Input, Button, Grid, Icon, Header } from 'semantic-ui-react';
import './style.css';

import {
  GET_AREAS,
  // AREA_SAVED,
  // AREA_ERRORS,
  RELOAD_AREAS,
  SAVE_AREA,
  DELETE_AREA,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class DriverAreas extends Component {

  static propTypes = {
    driver: PropTypes.object,
    // fadeOutMessage: PropTypes.func,
    areasList: PropTypes.array,
    allAreas: PropTypes.object,
    // areaErrors: PropTypes.array,
    // areaSaved: PropTypes.string,
    reloadAreas: PropTypes.bool,
    // areaDeleted: PropTypes.string,
    getAreas: PropTypes.func,
    saveArea: PropTypes.func,
    deleteArea: PropTypes.func,
    resetData: PropTypes.func,
    currentDriver: PropTypes.object,
    setCurrentDriver: PropTypes.func,
  };

  state = {
    zipCode: '',
    allAreas: [],
  };

  componentDidMount() {
    const {
      driver,
      getAreas,
      allAreas
    } = this.props;
    getAreas(driver.driver_id, allAreas);
    this.setState({ allAreas });
  }

  componentWillReceiveProps(nextProps) {
    const {
      reloadAreas,
      getAreas,
      allAreas,
      resetData,
      currentDriver
    } = nextProps;

    if (reloadAreas) {
      resetData(RELOAD_AREAS, false);
      getAreas(currentDriver.driver_id, allAreas);
      this.setState({ allAreas });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('---------nextstate', nextState.allAreas, nextProps.allAreas);
  }

  onDeleteArea = (driver, zipCode) => {
    this.props.deleteArea(driver.driver_id, zipCode);
  }

  onAddZipCode = (driver) => {
    this.setState({
      zipCode: '',
    });
    this.props.saveArea(driver.driver_id, { zip_code: this.state.zipCode });
  }

  handleChange = (e, { value }) => {
    this.setState({ zipCode: value });
  }

  render() {
    const {
      zipCode,
      allAreas,
    } = this.state;

    const {
      driver,
    } = this.props;

    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        <Segment class={'DriverAreas'}>
          <Header content={ driver.name } textAlign={'left'} size={'large'} />
          <Header content={ driver.driver_id } textAlign={'left'} size={'tiny'} />
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
              <Button fluid floated='right' color='green' onClick={() => this.onAddZipCode(driver)}>
                <Icon name='plus' /> Add Zip Code
              </Button>
            </Grid.Column>
          </Grid>
          <Grid>
            {
              allAreas[driver.driver_id] && allAreas[driver.driver_id].map((area, i) => {
                return (
                  <Grid.Column key={ i + 1 } mobile={16} tablet={8} computer={5}>
                    <Button
                      basic
                      circular
                      color={'red'}
                      size='medium'
                      icon='delete'
                      onClick={() => this.onDeleteArea(driver, area.zip_code)}
                    />
                    <span>{ area.zip_code }</span>
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
  areasList: driverSelector.getAreasList(state),
  // areaErrors: driverSelector.getAreaErrors(state),
  // areaSaved: driverSelector.areaSaved(state),
  reloadAreas: driverSelector.reloadAreas(state),
  allAreas: driverSelector.getAllAreas(state),
  // areaDeleted: driverSelector.areaDeleted(state),
  currentDriver: driverSelector.getCurrentDriver(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAreas: async (driverId, existingAreas) => {
    return dispatch(GET_AREAS(driverId, existingAreas));
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
