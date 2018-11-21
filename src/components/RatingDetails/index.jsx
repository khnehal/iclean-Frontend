import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { find } from 'lodash';
import moment from 'moment';
import { Header, Segment, Rating, Grid, TextArea } from 'semantic-ui-react';

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
    const customerOrder = find(ordersList, (obj) => { return obj.id === parseInt(match.params.orderId, 10) });
    console.log('customerOrderfilter', customerOrder);
    return (
      <Segment padded className="RatingDetails">
        <Header as='h1' textAlign='left'> Past Orders
          <Header.Subheader> Below you can view the order details. </Header.Subheader>
        </Header>
        {
          (customerOrder && Object.keys(customerOrder).length > 0) &&
            <Segment>
              <Segment basic>
                <Grid>
                  <Grid.Column mobile={16} tablet={16} computer={8}>
                    <Rating defaultRating={customerOrder.rating} maxRating={5}  icon='star' size='massive' disabled />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={8}>
                    <h4>{moment(customerOrder.drop_off_date).format('dddd, MMMM Do, YYYY')}</h4>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment basic>
                <Grid>
                  <Grid.Column mobile={16} tablet={16} computer={8}>
                    {
                      (customerOrder.card && customerOrder.card.card_number) &&
                        <div>
                          <h4> Paid with: {customerOrder.card.card_number} </h4>
                          <h4> Total: $ {customerOrder.amount + customerOrder.tip_amount} </h4>
                        </div>
                    }
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment basic textAlign={'left'}>
                <Grid>
                  {
                    (customerOrder.pickup_driver_instructions) &&
                      <Grid.Column mobile={16} tablet={16} computer={5}>
                        <h3>Pick up Instructions</h3>
                        <TextArea value={customerOrder.pickup_driver_instructions} />
                      </Grid.Column>
                  }
                  {
                    (customerOrder.drop_off_driver_instructions) &&
                      <Grid.Column mobile={16} tablet={16} computer={5}>
                        <h3>Drop off Instructions</h3>
                        <TextArea value={customerOrder.drop_off_driver_instructions} />
                      </Grid.Column>
                  }
                  {
                    (customerOrder.drop_off_driver_instructions) &&
                      <Grid.Column mobile={16} tablet={16} computer={5}>
                        <h3>Wash Instructions</h3>
                        <TextArea value={customerOrder.drop_off_driver_instructions} />
                      </Grid.Column>
                  }
                </Grid>
              </Segment>
              <Segment basic textAlign={'left'}>
                <Grid>
                  <Grid.Column mobile={16} tablet={16} computer={5}>
                    <h3> Notes by pick up driver: </h3>
                    <TextArea value={(customerOrder.notes_by_pickup_driver) ? (customerOrder.notes_by_pickup_driver) : ''} />
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={16} computer={5}>
                    <h3> Notes by drop off by:</h3>
                    <TextArea value={(customerOrder.notes_by_drop_off_driver) ? (customerOrder.notes_by_drop_off_driver) : ''} />
                  </Grid.Column>
                </Grid>
              </Segment>
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
