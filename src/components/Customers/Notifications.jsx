import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Input, Table, Button, Radio, TextArea, Dropdown, Grid } from 'semantic-ui-react';
import './customers.css';

import DisplayMessage from '../DisplayMessage/DisplayMessage';
import {
  GET_USERS,
  SEND_NOTIFICATION,
} from '../../store/actions';
import { userSelector } from '../../store/selectors';


class Notifications extends Component {

  static propTypes = {
    history: PropTypes.object,
    getAllUsers: PropTypes.func,
    customersList: PropTypes.array,
    sendNotification: PropTypes.func,
    notificationSent: PropTypes.string,
    notificationErrors: PropTypes.array,
  };

  constructor() {
    super();
    this.state = {
      value: '',
      notificationText: '',
      hasStatus: false,
      hasDateAndTime: true,
      selectedCustomer: '',
      customerOptions: [],
      data: [
      ],
    };
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    const {
      customersList,
    } = nextProps;
    if (customersList && customersList.length > 0) {
      const customerOptions = [];
      customersList.map((customer) => {
        return customerOptions.push({
          key: customer.user_id,
          value: customer.user_id,
          text: customer.name,
        });
      });

      this.setState({
        customerOptions,
        selectedCustomer: customerOptions[0].value
      });
    }
  }

  handleChange = (e, { name, value }) => {
    if (name === 'customer') {
      this.setState({ selectedCustomer: value });
    } else {
      this.setState({ value });
    }
  }

  handleCustomerDescription = (name, val) => {
    this.setState({ [name]: val });
  }

  onSendNotification = () => {
    const {
      value,
      notificationText,
      selectedCustomer,
    } = this.state;

    const data = {
      "send_to": value,
      "user_id": selectedCustomer,
      "notification_text": notificationText,
    }
    this.props.sendNotification(data);
  }

  renderNotificationsBlock = () => {
    const {
      customerOptions,
      value,
      selectedCustomer,
    } = this.state;

    return (
      <Table collapsing className={'addNotifications'} style={{ 'margin': 'auto' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8}><b>Send To: </b></Table.Cell>
            <Table.Cell textAlign={'left'}>
                <Radio
                  label='Every Body'
                  name='radioGroup'
                  value='every_body'
                  checked={value === 'every_body'}
                  onChange={this.handleChange}
                />
                <br />
                <Radio
                  label='Only To'
                  name='radioGroup'
                  value='only_to'
                  checked={value === 'only_to'}
                  onChange={this.handleChange}
                />
                <br />
                <Dropdown
                  search
                  selection
                  placeholder='Choose the User'
                  onChange={this.handleChange}
                  options={customerOptions}
                  value={selectedCustomer}
                  name={'customer'}
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
    const {
      notificationSent,
      notificationErrors,
    } = this.props;

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
          <DisplayMessage message={notificationSent} errors={notificationErrors} />

          {this.renderNotificationsBlock()}
        </Segment>
        <Segment basic textAlign={'center'}>
          <Button color='green' size='big' onClick={() => this.onSendNotification()}> Send </Button>
        </Segment>
      </Segment>
    );
  }
}


const mapStateToProps = (state) => ({
  customersList: userSelector.allUsersList(state),
  notificationSent: userSelector.notificationSent(state),
  notificationErrors: userSelector.getNotificationErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: async () => {
    return dispatch(GET_USERS());
  },
  sendNotification: async (data) => {
    return dispatch(SEND_NOTIFICATION(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notifications));
