import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Table, Input, Checkbox } from 'semantic-ui-react';

import {
  UPDATE_TIMESLOT,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class TimeslotListingRow extends Component {
  static propTypes = {
    timeslot: PropTypes.object,
    driverId: PropTypes.string,
    reloadTimeslots: PropTypes.bool,
    resetAndReload: PropTypes.func,
    updateTimeslot: PropTypes.func,
  };

  state = {
    orders_per_hour: this.props.timeslot.orders_per_hour,
    enabled: this.props.timeslot.enabled,
  };

  componentWillReceiveProps(nextProps) {
    const {
      reloadTimeslots,
      resetAndReload,
    } = nextProps;

    if (reloadTimeslots) {
      resetAndReload();
    }
  }

  handleTimeSlotChange = (e, { value, name, checked }) => {
    const {
      updateTimeslot,
      driverId,
      timeslot,
    } = this.props;
    const data = {};
    if (name === 'enabled') {
      data[name] = checked;
    } else {
      data[name] = value;
    }
    this.setState(data);
    updateTimeslot(driverId, timeslot.time_slot, data);
  };

  render() {
    const {
      orders_per_hour,
      enabled,
    } = this.state;

    const {
      timeslot,
    } = this.props;

    return (
      <Table.Row>
        <Table.Cell width={4}> {timeslot.time_slot} </Table.Cell>
        <Table.Cell width={4}>
          <Input
            type='number'
            name='orders_per_hour'
            value={orders_per_hour}
            onChange={this.handleTimeSlotChange}
          />
        </Table.Cell>
        <Table.Cell width={4}>
          <Checkbox
            checked={enabled}
            value={timeslot.time_slot}
            name={'enabled'}
            onClick={this.handleTimeSlotChange}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
};


const mapStateToProps = (state) => ({
  reloadTimeslots: driverSelector.reloadTimeslots(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetData: async (type) => {
    return dispatch({ type, data: false });
  },
  updateTimeslot: async (drivevrId, timeSlot, data) => {
    return dispatch(UPDATE_TIMESLOT(drivevrId, timeSlot, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimeslotListingRow));
