import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Segment, Input, Header, Button, Grid, Icon } from 'semantic-ui-react';
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
      areasList: [{
        driver_id: '74ba912b-4e08-4116-b4c3-40469447b688',
        name: 'Driver One',
        driver_areas: [
          { "zip_code": "90004" },
          { "zip_code": "90005" },
          { "zip_code": "90006" },
          { "zip_code": "90012" },
        ],
      }],
      data: [
        { zip_code: '90067' }
      ],
    };
  };

  componentDidMount() {
    // this.props.getAreas();
  }

  componentWillReceiveProps(nextProps) {
    const {
      reloadAreas,
      resetData,
      areaSaved,
      areaErrors,
      // getAreas,
      // driversList,
      // areasList,
    } = nextProps;

    this.setState()
    if (reloadAreas) {
      resetData(RELOAD_AREAS);
      // getAreas();
    }

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

  handleChange = (e, { value }) => {
    this.setState({ zip_code: value });
  };

  renderDriverBlocks = (area, index) => {
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
                onChange={this.handleChange}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Button fluid floated='right' color='green' as={NavLink} to={'/drivers/addDrivers'}> <Icon name='plus' /> Add Zip Code </Button>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Button basic circular color={'red'} size='medium' icon='delete'></Button>
              <span>888909</span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    );
  };

  render() {
    const {
      areasList
    } = this.state;

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
              { areasList.map((area, i) => {
                return <DriverAreas key={i + 1} {...this.state} resetAndReload={this.resetAndReload} fadeOutMessage={this.fadeOutMessage} area={area} index={i} />;
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
