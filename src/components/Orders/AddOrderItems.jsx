import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// import { GET_ORDERS_LIST, GET_DATE_BASED_ORDER } from '../../store/actions';
// import { orderSelector } from '../../store/selectors';

import { Segment, Input, Header, Grid, Button } from 'semantic-ui-react';

import './orders.css'

class AddOrderItems extends Component {

  static propTypes = {
    history: PropTypes.object,
    // ordersList: PropTypes.array,
    // getOrdersList: PropTypes.func,
    // getDateBasedOrdersList: PropTypes.func,
  };

  state = {};

  componentDidMount() {
    console.log('dedewdew', 'AddOrderItems');
  }

  render() {
    return (
      <Segment className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <Header as='h1'> Orders </Header>
            <h3> Orders details below </h3>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
            <Input
              type={'search'}
            />
          </Segment>
        </Segment.Group>
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment basic textAlign={'right'}>
            <Button color="green"> Done </Button>
          </Segment>
        </Segment.Group>
        <Grid>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <h2> Dry Cleaning </h2>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <h2> Laundry </h2>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <h2> Households </h2>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

// const mapStateToProps = (state) => ({
//   ordersList: orderSelector.getOrdersList(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   getOrdersList: async () => {
//     return dispatch(GET_ORDERS_LIST());
//   },
//   getDateBasedOrdersList: async (date) => {
//     return dispatch(GET_DATE_BASED_ORDER(date));
//   }
// });

export default connect(null, null)(withRouter(AddOrderItems));
