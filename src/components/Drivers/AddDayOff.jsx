import React, { Component } from 'react';

import {
  Segment,
  Table,
  Input,
  Header,
  Button,
} from 'semantic-ui-react';

import './style.css';

class AddDayOff extends Component {

  constructor() {
    super();
    this.state = {
      date: '',
      dayOffDates: [
        {
          day_off_date: '12-12-2018'
        }
      ],
    };
  };

  handleDriverName = (e, { value }) => {
    const { date } = this.state;

    if (date !== value) {
      this.setState({ date: value });
    }
  };

  renderDateTable = () => {
    const { date } = this.state;
    const today = new Date();
    const dateValue = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;

    return (
      <Table striped collapsing className={'driverDate'}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8} verticalAlign='middle'><b>Date: </b></Table.Cell>
            <Table.Cell width={8}>
              <Input
                type={'date'}
                value={date}
                min={dateValue}
                onChange={this.handleDateChange}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  renderDayOffsTable = () => {
    const { dayOffDates } = this.state;

    return (
      <Table striped celled collapsing className={'driverDayOffDate'}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={4}>Day Off Date</Table.HeaderCell>
            <Table.HeaderCell width={4}>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dayOffDates.map((item) => {
            return (
              <Table.Row>
                <Table.Cell width={4}> {item.day_off_date && item.day_off_date} </Table.Cell>
                <Table.Cell width={4}>
                  <Button basic circular color={'red'} size='medium' icon='delete'></Button>
                </Table.Cell>
              </Table.Row>
            )
            })
          }
        </Table.Body>
      </Table>
    );
  };

  render() {

    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic>
            <Header as='h1' textAlign='left'> Add Day Off </Header>
            <Button floated='right' color='green'> Done </Button>
          </Segment>
          <Segment basic textAlign='center'>
            {this.renderDateTable()}
          </Segment>
          <Segment basic textAlign='center'>
            <Header as='h2' textAlign='center'>Delivery (Pickup / Dropoff) has been disabled for the following days.</Header>
          </Segment>
          <Segment basic textAlign='center'>
            {this.renderDayOffsTable()}
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default AddDayOff;
