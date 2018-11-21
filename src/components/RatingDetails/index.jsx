import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { filter } from 'lodash';
import moment from 'moment';
import { Header, Segment, Rating, Grid } from 'semantic-ui-react';

import { GET_CUSTOMER_PAST_ORDER } from '../../store/actions';
import { orderSelector } from '../../store/selectors';


class RatingDetails extends Component {

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
    const { ordersList, match } = this.props;
    const customerOrder = filter(ordersList, (obj) => { return obj.id === match.params.orderId });

    return (
      <Segment padded className="RatingDetails">
        <Header as='h1' textAlign='left'> Past Orders
          <Header.Subheader> Below you can view the order details. </Header.Subheader>
        </Header>
        {
          (customerOrder && customerOrder.length > 0) &&
            <Segment>
              <Grid>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                  <Rating defaultRating={customerOrder[0].rating} maxRating={5}  icon='star' size='massive' disabled />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                  <h4>{moment(customerOrder.drop_off_date).format('dddd, MMMM Do, YYYY')}</h4>
                </Grid.Column>
              </Grid>
            </Segment>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RatingDetails));
