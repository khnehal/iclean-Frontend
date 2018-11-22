import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Header, Segment } from 'semantic-ui-react';

import { GET_CUSTOMER_PAST_ORDER } from '../../store/actions';
import { orderSelector } from '../../store/selectors';

import LandingContainer from '../LandingContainer';

class PastOrders extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    ordersList: PropTypes.array,
    getPastOrders: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {
    const { getPastOrders, match } = this.props;
    getPastOrders(match.params.customerId);
  }

  render() {
    return (
      <Segment className="PastOrders">
        <Header as='h1' textAlign='left'> Past Orders
          <Header.Subheader> Below you can view all the drivers details. </Header.Subheader>
        </Header>
        <LandingContainer
          type='past'
          hasRating={true}
          data={this.props.ordersList}
          history={this.props.history}
          redirectTo={'/ratingDetails/'}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  ordersList: orderSelector.getOrdersList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPastOrders: async (customerId) => {
    return dispatch(GET_CUSTOMER_PAST_ORDER(customerId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PastOrders));
