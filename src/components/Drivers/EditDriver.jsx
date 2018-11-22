import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Table, Input, Header, Button, Grid, Image, Icon, Label, Checkbox } from 'semantic-ui-react'; //eslint-disable-line
import './style.css';

import DisplayMessage from '../DisplayMessage/DisplayMessage';
import TimeslotListingRow from './TimeslotListingRow';
import {
  GET_DRIVER_TIMESLOTS,
  RELOAD_TIMESLOTS,
  CURRENT_DRIVER,
  GET_DRIVER_DATA,
  UPDATE_DRIVER,
  DELETE_DRIVER,
  DRIVER_TIMESLOTS_LIST,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class EditDriver extends Component {

  static propTypes = {
    history: PropTypes.object,
    currentDriver: PropTypes.object,
    driverTimeslotsList: PropTypes.array,
    setCurrentDriver: PropTypes.func,
    getDriverTimeslots: PropTypes.func,
    getDriverData: PropTypes.func,
    updateDriver: PropTypes.func,
    driverSaved: PropTypes.string,
    driverErrors: PropTypes.array,
    deleteDriver: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      data: {
        phone_number: '',
        email: '',
        password: '',
      },
      isEditing: false,
      driverTimeslotsList: [],
    };
  };

  componentDidMount() {
    const {
      location,
      getDriverTimeslots,
      currentDriver,
      setCurrentDriver,
      getDriverData,
    } = this.props;

    let driverId = currentDriver.driver_id;
    if (!driverId) {
      driverId = location.state && location.state.driver_id;
      setCurrentDriver(driverId);
    }
    getDriverData(driverId);
    getDriverTimeslots(driverId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      currentDriver,
      driverTimeslotsList
    } = nextProps;

    this.setState({
      data: {
        phone_number: currentDriver.phone_number,
        email: currentDriver.email,
        password: currentDriver.password,
      },
      driverTimeslotsList: driverTimeslotsList,
    })

    if (driverTimeslotsList && driverTimeslotsList.length > 0 && driverTimeslotsList[0].driver_id !== currentDriver.driver_id) {
      this.resetAndReload();
    }
  }

  resetAndReload = () => {
    const {
      resetData,
      getDriverTimeslots,
      currentDriver,
    } = this.props;

    resetData(RELOAD_TIMESLOTS, false);
    resetData(DRIVER_TIMESLOTS_LIST, []);
    getDriverTimeslots(currentDriver.driver_id);
  }

  handleChange = (e, { value, name }) => {
    const { data } = this.state;
    data[name] = value;
    this.setState({ data });
  }

  onEditDriverDetails = () => {
    const { isEditing, data } = this.state;
    this.setState({ isEditing: !isEditing });
    const updatedData = {
      phone_number: data.phone_number,
      email: data.email
    };
    if (data.password) {
      updatedData.password = data.password;
    }
    isEditing && this.props.updateDriver(this.props.currentDriver.driver_id, updatedData);
  };

  onDeleteDriver = () => {
    const { deleteDriver, currentDriver, history } = this.props;
    deleteDriver(currentDriver.driver_id);
    history.push('/drivers/driversList/');
  }

  renderDetailsTable = () => {
    const { isEditing, data } = this.state;

    return (
      <Table collapsing className={'addDrivers'} style={{ 'margin': 'auto' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}><b>Phone number: </b></Table.Cell>
            <Table.Cell textAlign={'right'}>
              <Input
                size='large'
                type="text"
                disabled={ !isEditing }
                defaultValue={data.phone_number}
                placeholder={'Phone Number'}
                onChange={this.handleChange}
                name={'phone_number'}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={4}><b>Email Address: </b></Table.Cell>
            <Table.Cell textAlign={'right'}>
              <Input
                size='large'
                disabled={ !isEditing }
                type="text"
                defaultValue={data.email}
                placeholder={'Email ID'}
                onChange={this.handleChange}
                name={'email'}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={4}><b>Password: </b></Table.Cell>
            <Table.Cell textAlign={'right'}>
              <Input
                size='large'
                disabled={ !isEditing }
                type="password"
                placeholder={'******'}
                defaultValue={data.password}
                onChange={this.handleChange}
                name={'password'}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  renderTimeslotsTable = () => {
    const { currentDriver } = this.props;

    return (
      <Table striped celled collapsing className={'driverDayOffDate'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Timeslots</Table.HeaderCell>
            <Table.HeaderCell width={4}>Order Per hour</Table.HeaderCell>
            <Table.HeaderCell width={4}>Enable / Disable</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.driverTimeslotsList.map((timeslot, i) => {
              return <TimeslotListingRow key={i + 1} {...this.state} resetAndReload={this.resetAndReload} timeslot={timeslot} driverId={currentDriver.driver_id} />
            })
          }
        </Table.Body>
      </Table>
    );
  }

  render() {
    const { data, isEditing } = this.state;
    const { driverSaved, driverErrors } = this.props;

    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'> Edit Driver <Header.Subheader> Below you can view all the Zip Code details </Header.Subheader></Header>
            <Button
              floated='right'
              color='green'
              icon={ !isEditing && 'edit' }
              onClick={this.onEditDriverDetails}
              content={ !isEditing ? 'Edit' : 'Done' }
            />
          </Segment>
          <DisplayMessage message={driverSaved} errors={driverErrors} />
          <Segment basic textAlign='center'>
            <Header as='h1' textAlign='center'>{data.name}</Header>
            {this.renderDetailsTable()}
          </Segment>
          <Segment basic textAlign='center'>
            {this.renderTimeslotsTable()}
            <Button className='delete-driver-btn' color='red' onClick={this.onDeleteDriver}> Delete Driver </Button>
          </Segment>
          <Segment basic textAlign='center'>
            <b>Special Notes</b>
            1. Delivery Date / Times
                Monday - Friday ( 07:00 AM - 09:00 PM )
                Saturday ( 09:00 AM - 04:00 PM )
                Sunday ( 10:00 AM - 02:00 PM )
            2. Delivery won't be available on OFF days.
            3. The global delivery date/times rules above will supersede enable/disable timeslots settings for each driver.
          </Segment>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  driverTimeslotsList: driverSelector.getDriverTimeslotsList(state),
  currentDriver: driverSelector.getCurrentDriver(state),
  driverSaved: driverSelector.driverSaved(state),
  driverErrors: driverSelector.getDriverErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDriverData: async (id) => {
    return dispatch(GET_DRIVER_DATA(id));
  },
  getDriverTimeslots: async (id) => {
    return dispatch(GET_DRIVER_TIMESLOTS(id));
  },
  resetData: async (type, data) => {
    return dispatch({ type, data });
  },
  setCurrentDriver: async (id) => {
    return dispatch({ type: CURRENT_DRIVER, data: { driver_id: id } });
  },
  updateDriver: async (id, data) => {
    return dispatch(UPDATE_DRIVER(id, data));
  },
  deleteDriver: async (id) => {
    return dispatch(DELETE_DRIVER(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditDriver));
