import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LandingContainer from '../LandingContainer';
import moment from 'moment';

import { GET_ORDERS_LIST, GET_DATE_BASED_ORDER } from '../../store/actions';
import { orderSelector } from '../../store/selectors';

import { Segment, Input, Loader, Header } from 'semantic-ui-react';

import './orders.css'

class AllOrders extends Component {

  static propTypes = {
    history: PropTypes.object,
    ordersList: PropTypes.array,
    getOrdersList: PropTypes.func,
    getDateBasedOrdersList: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      filterDate: '',
    };
  };

  componentDidMount() {
    this.props.getOrdersList();
  }

  handleChangeDate = (e, { value }) => {
    this.props.getDateBasedOrdersList(value);
  }

  render() {
    const { ordersList } = this.props;
    const minDate = moment().format('YYYY-MM-DD');

    return (
      <Segment className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <Header as='h1'> Orders History </Header>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
            <Input
              type={'date'}
              min={minDate}
              onChange={this.handleChangeDate}
            />
          </Segment>
        </Segment.Group>
        {
          (ordersList && ordersList.length > 0)
          ?
            <LandingContainer
              data={ordersList}
              hasDateAndTime={true}
              redirectTo={'/orders/'}
              history={this.props.history}
            />
          :
            <Loader active inverted> No orders waiting. </Loader>
        }
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  ordersList: orderSelector.getOrdersList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getOrdersList: async () => {
    return dispatch(GET_ORDERS_LIST());
  },
  getDateBasedOrdersList: async (date) => {
    return dispatch(GET_DATE_BASED_ORDER(date));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AllOrders));
