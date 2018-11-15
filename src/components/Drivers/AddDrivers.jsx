import React, { Component } from 'react';

import {
  Segment,
  Table,
  Input,
  Header,
  Button,
} from 'semantic-ui-react';

import './style.css';

class AddDrivers extends Component {

  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        phone_number: '',
      },
    };
  };

  handleDriverName = (type, val) => {
    const { data } = this.state;

    if (data[type] !== val) {
      data[type] = val;
      this.setState({ data });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'> Add Drivers </Header>
            <Button floated='right' color='green'> Done </Button>
          </Segment>
          <Segment padded basic textAlign='center'>
            <Table collapsing className={'addDrivers'} style={{ 'margin': 'auto' }}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}><b>Name: </b></Table.Cell>
                  <Table.Cell textAlign={'right'}>
                    <Input
                      value={data.name}
                      size='large'
                      onChange={(e, { value }) => this.handleDriverName('name', value)}
                    />
                  </Table.Cell>
                </Table.Row>
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
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default AddDrivers;
