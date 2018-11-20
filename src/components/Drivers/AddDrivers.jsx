import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Segment,
  Table,
  Input,
  Header,
  Button,
} from 'semantic-ui-react';
import './style.css';

import DisplayMessage from '../DisplayMessage/DisplayMessage';
import {
  SAVE_DRIVER,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';


class AddDrivers extends Component {

  static propTypes = {
    driverSaved: PropTypes.string,
    driverErrors: PropTypes.array,
    saveDriver: PropTypes.func,
  };

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

  componentWillReceiveProps(nextProps) {
  }

  onAddDriver = () => {
    const {
      name,
      email,
      password,
      phone_number,
    } = this.state.data;

    const data = {
      name,
      email,
      password,
      phone_number,
    }
    this.props.saveDriver(data);
  }

  handleChange = (e, { value, name }) => {
    const { data } = this.state;
    data[name] = value;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const { driverSaved, driverErrors } = this.props;

    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'> Add Drivers </Header>
            <Button floated='right' color='green' onClick={() => this.onAddDriver()}> Done </Button>
          </Segment>
          <Segment padded basic textAlign='center'>
            <DisplayMessage message={driverSaved} errors={driverErrors} />

            <Table collapsing className={'addDrivers'} style={{ 'margin': 'auto' }}>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}><b>Name: </b></Table.Cell>
                  <Table.Cell textAlign={'right'}>
                    <Input
                      value={data.name}
                      size='large'
                      onChange={this.handleChange}
                      name={'name'}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}><b>Phone number: </b></Table.Cell>
                  <Table.Cell textAlign={'right'}>
                    <Input
                      size='large'
                      value={data.phone_number}
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
                      value={data.email}
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
                      type="password"
                      value={data.password}
                      onChange={this.handleChange}
                      name={'password'}
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


const mapStateToProps = (state) => ({
  driverSaved: driverSelector.driverSaved(state),
  driverErrors: driverSelector.getDriverErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  saveDriver: async (data) => {
    return dispatch(SAVE_DRIVER(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddDrivers));
