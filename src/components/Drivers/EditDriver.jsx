import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { Segment, Table, Input, Header, Button, Grid, Image, Icon, Label, Checkbox } from 'semantic-ui-react'; //eslint-disable-line

import './style.css';

class EditDriver extends Component {

  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        phone_number: '',
        email: '',
        password: '',
      },
      isEditing: false,
      "driver_time_slots": [
        {
            "id": 15,
            "driver_id": "190ef59f-206d-468b-946e-c44b3446110e",
            "time_slot": "7am_to_8am",
            "orders_per_hour": 4,
            "enabled": false,
        },
      ]
    };
  };

  handleZipCode = (e, { value }) => {
    this.setState({ zip_code: value }); // Dummy Code/ Remove it with ajax call
  };

  renderDetailsTable = () => {
    const { data } = this.state;

    return (
      <Table collapsing className={'addDrivers'} style={{ 'margin': 'auto' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={4}><b>Phone number: </b></Table.Cell>
            <Table.Cell textAlign={'right'}>
              <Input
                size='large'
                value={data.phone_number}
                onChange={(e, { value }) => this.handleDriverName('phone_number', value)}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={4}><b>Email Address: </b></Table.Cell>
            <Table.Cell textAlign={'right'}>
              <Input
                size='large'
                value={data.email}
                onChange={(e, { value }) => this.handleDriverName('email', value)}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={4}><b>Password: </b></Table.Cell>
            <Table.Cell textAlign={'right'}>
              <Input
                size='large'
                type="password"
                value={data.password}
                onChange={(e, { value }) => this.handleDriverName('password', value)}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  renderTimeslotsTable = () => {
    const { driver_time_slots } = this.state;

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
          {driver_time_slots.map((item) => {
            return (
              <Table.Row>
                <Table.Cell width={4}> {item.time_slot && item.time_slot} </Table.Cell>
                <Table.Cell width={4}>
                  <Input type='number' value={item.orders_per_hour} onChange={this.handleTimeChange} />
                </Table.Cell>
                <Table.Cell width={4}>
                  <Checkbox />
                </Table.Cell>
              </Table.Row>
            )
            })
          }
        </Table.Body>
      </Table>
    );
  }

  handleEditDriverDetails = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: (isEditing ? false : true) });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'> Edit Driver <Header.Subheader> Below you can view all the Zip Code details </Header.Subheader></Header>
            <Button floated='right' color='green' onClick={this.handleEditDriverDetails}> <Icon name='edit' /> Edit </Button>
          </Segment>
          <Segment basic textAlign='center'>
            <Header as='h1' textAlign='center'>{data.name}</Header>
            {this.renderDetailsTable()}
          </Segment>
          <Segment basic textAlign='center'>
            {this.renderTimeslotsTable()}
            <Button color='red'> Delete Driver </Button>
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

export default EditDriver;
