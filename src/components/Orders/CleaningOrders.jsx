import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { GET_CLEANING_NOW } from '../../store/actions';
import { orderSelector } from '../../store/selectors';

import LandingContainer from '../LandingContainer';
import { Segment, Input, Header } from 'semantic-ui-react';

import './orders.css'

class CleaningOrders extends Component {

  static propTypes = {
    history: PropTypes.object,
    ordersList: PropTypes.array,
    getOrdersList: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {};
  };

  componentDidMount() {
    this.props.getOrdersList();
  }

  render() {
    const { ordersList } = this.props;

    return (
      <Segment className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <Header as='h1'> Cleaning Now </Header>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Segment>
        </Segment.Group>
        {
          (ordersList && ordersList.length > 0)
          ?
            <LandingContainer
              type='order'
              data={ordersList}
              hasDateAndTime={true}
              redirectTo={'/orders/'}
              history={this.props.history}
            />
          :
            <Header as='h2'> No orders waiting. </Header>
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
    return dispatch(GET_CLEANING_NOW());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CleaningOrders));
