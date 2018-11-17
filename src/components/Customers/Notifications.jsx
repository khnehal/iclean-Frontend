import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Segment, Input, Table, Button, Radio, TextArea, Dropdown, Grid } from 'semantic-ui-react';

import './customers.css';

class Notifications extends Component {

  static propTypes = {
    history: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      notificationText: '',
      hasStatus: false,
      hasDateAndTime: true,
      data: [
        {
          name: 'Customers list',
          dateTime: '12-oct-18',
        },
      ],
    };
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleCustomerDescription = (name, val) => {
    this.setState({ [name]: val });
  }

  renderNotificationsBlock = () => {
    return (
      <Table collapsing className={'addNotifications'} style={{ 'margin': 'auto' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8}><b>Send To: </b></Table.Cell>
            <Table.Cell textAlign={'left'}>
                <Radio
                  label='Every Body'
                  name='radioGroup'
                  value='EveryBody'
                  checked={this.state.value === 'EveryBody'}
                  onChange={this.handleChange}
                />
                <br />
                <Radio
                  label='Only To'
                  name='radioGroup'
                  value='OnlyTo'
                  checked={this.state.value === 'OnlyTo'}
                  onChange={this.handleChange}
                />
                <br />
                <Dropdown
                  search
                  selection
                  placeholder='Choose the User'
                />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={8}><b>Notification Text: </b></Table.Cell>
            <Table.Cell textAlign={'left'}>
              <TextArea
                value={this.state.notificationText}
                onChange={(e, { value }) => this.handleCustomerDescription('notificationText', value)}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }

  render() {
    return (
      <Segment className="CustomerSection">
        <Segment basic>
          <Grid className="CustomersHeaderSection">
            <Grid.Column mobile={16} tablet={8} computer={10} textAlign={'left'} className="CustomersTitle">
              <h2> Customer Notifications </h2>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6} className="CustomersSearchSection">
              <Input icon='search' placeholder='Search...' />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment padded basic textAlign='center'>
          {this.renderNotificationsBlock()}
        </Segment>
        <Segment basic textAlign={'center'}>
          <Button color='green' size='big'> Send </Button>
        </Segment>
      </Segment>
    );
  }
}


export default Notifications;
