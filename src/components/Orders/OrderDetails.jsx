import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import moment from 'moment';
import { find, capitalize } from 'lodash';
import { Segment, Header, Grid, Button, TextArea, Table, Message } from 'semantic-ui-react';

import {
  GET_USER_DETAILS,
  EXPORT_ORDER_PDF,
  EXPORT_ORDER_XLSX,
  GET_ORDERS_LIST,
  DELETE_ORDER,
} from '../../store/actions';

import { userSelector, landingContainerSelector, orderSelector } from '../../store/selectors';
import WashSettings from '../../components/WashSettings/index.jsx';

import './orders.css';
import './print.css';

class OrderDetails extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    getUserInfo: PropTypes.func,
    customerInfo: PropTypes.object,
    userOrderId: PropTypes.number,
    ordersList: PropTypes.array,
    getPDF: PropTypes.func,
    getXLSX: PropTypes.func,
    orderPdf: PropTypes.any,
    orderXlsx: PropTypes.any,
    getAllOrdersOnRefresh: PropTypes.func,
    deleteOrder: PropTypes.func,
    deletedStatus: PropTypes.any,
  };

  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { getUserInfo, match, getAllOrdersOnRefresh, ordersList } = this.props;
    console.log('uid', match.params.uid, ordersList);
    getUserInfo(match.params.uid);
    if (ordersList === undefined) {
      getAllOrdersOnRefresh();
    }
  }

  renderPickUpDropDetails = (customerOrderInfo) => {
    const pickUpNotes = customerOrderInfo.notes_by_pickup_driver ? customerOrderInfo.notes_by_pickup_driver : '';
    const dropOffNotes = customerOrderInfo.notes_by_drop_off_driver ? customerOrderInfo.notes_by_drop_off_driver : '';

    return (
      <div>
        <Segment secondary>
          <Grid padded>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Header as='h1' textAlign='left'> Pick Up </Header>
            </Grid.Column>
          </Grid>
        </Segment>
        <Grid padded>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as='h3' textAlign='left'> { customerOrderInfo.pickup_date && moment(customerOrderInfo.pickup_date).format('dddd, MMMM Do, YYYY') } </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as='h3' textAlign='right'> { customerOrderInfo.pickup_time && <span> {(customerOrderInfo.pickup_time).replace(/_/g, " ")} </span> } </Header>
          </Grid.Column>
        </Grid>
        <Segment secondary>
          <Grid padded>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Header as='h1' textAlign='left'> Drop Off </Header>
            </Grid.Column>
          </Grid>
        </Segment>
        <Grid padded>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as='h3' textAlign='left'> { customerOrderInfo.drop_off_date && moment(customerOrderInfo.drop_off_date).format('dddd, MMMM Do, YYYY') } </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as='h3' textAlign='right'> { customerOrderInfo.drop_off_time && <span> {(customerOrderInfo.drop_off_time).replace(/_/g, " ")} </span> } </Header>
          </Grid.Column>
        </Grid>
        <Segment secondary>
          <Grid padded>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <Header as='h1' textAlign='left'> Driver Notes </Header>
            </Grid.Column>
          </Grid>
        </Segment>
        <Grid padded>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <TextArea value={pickUpNotes} placeholder={'Pick Up !'} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <TextArea value={dropOffNotes} placeholder={'Drop off !'} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  handlePDFDownload = () => {
    const { getPDF, userOrderId } = this.props;

    if (userOrderId) {
      getPDF(userOrderId);
    }
  };

  handleXLSXDownload = () => {
    const { getXLSX, userOrderId } = this.props;

    if (userOrderId) {
      getXLSX(userOrderId);
    }
  };

  handlePastOrderRedirection = (id) => {
    this.props.history.push(`/pastOrders/${id}/`);
  };

  handleOrderRedirection = () => {
    const { history, userOrderId } = this.props;
    history.push(`/${userOrderId}/addOrderItems/`);
  };

  render() {
    const { customerInfo, ordersList, userOrderId, deletedStatus, match } = this.props;
    const orderDetails = find(ordersList, { id: userOrderId });
    console.log(orderDetails, match.params, userOrderId);
    let ele = null;

    if (deletedStatus === 204 || deletedStatus === 200 || deletedStatus === 0) {
      ele = (
        <Segment padded='very' className="OrdersSection">
            <Message positive>
              <Message.Header>This order is now deleted.</Message.Header>
            </Message>
        </Segment>
      );
    } else if (orderDetails && orderDetails.id === userOrderId) {
      ele = (
        <Segment className="OrdersSection">
          <Segment.Group horizontal className="OrdersHeaderSection">
            <Segment className="OrdersTitle">
              <Header as='h1'> Orders </Header>
              <h4> Below you can view all the details of order. </h4>
            </Segment>
            <Segment.Group horizontal>
              <Segment basic>
                <Header as='h2'>
                  Status: {orderDetails ? capitalize((orderDetails.status_admin).replace(/_/g, " ")) : ''}
                </Header>
              </Segment>
              <Segment basic>
                <Button color={'red'} size="large" onClick={() => { this.props.deleteOrder(userOrderId); }}> Cancel Order </Button>
              </Segment>
            </Segment.Group>
          </Segment.Group>
          <Segment>
            <Grid>
              <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8}>
                {
                  orderDetails &&
                  <Segment basic>
                    <Header as='h1'> {customerInfo.name ? customerInfo.name : ''} </Header>
                    <Header as='h3'> {customerInfo.phone_number ? customerInfo.phone_number : ''} </Header>
                    <Header as='h3'> {customerInfo.email ? customerInfo.email : ''} </Header>
                  </Segment>
                }
                {
                  orderDetails &&
                  <Segment basic>
                    <Header as='h3'> Pick up Address: {orderDetails.pickup_location && orderDetails.pickup_location.address_1} </Header>
                    <Header as='h3'> Drop Off Address: {customerInfo.drop_off_location && customerInfo.drop_off_location.address_1} </Header>
                  </Segment>
                }
                {<Button color="grey" size="large" onClick={() => this.handlePastOrderRedirection(orderDetails.user_id)}> Past Orders </Button>}
                <Button color="grey" size="large" onClick={this.handleOrderRedirection}> Add Items </Button>
              </Grid.Column>
              <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8}>
                { orderDetails &&
                  <div>
                    <Header as='h2' color="green"> Count Order </Header>
                    <Table basic>
                      <Table.Body>
                        { orderDetails.items && (orderDetails.items.length > 0)
                          && orderDetails.items.map((item, i) => {
                            return (
                              <Table.Row key={i + 1}>
                                <Table.Cell textAlign='left'>{item.item_name}</Table.Cell>
                                <Table.Cell textAlign='right'>{item.price}</Table.Cell>
                              </Table.Row>
                            )
                          })
                        }
                        { orderDetails.items &&
                          <Table.Row>
                              <Table.Cell textAlign='left'><b> Total </b></Table.Cell>
                              <Table.Cell textAlign='right'>
                                { (orderDetails.tip_amount > 0)
                                  ?
                                    <b> {orderDetails.amount} </b>
                                  :
                                    <b> {(orderDetails.amount + orderDetails.tip_amount)} </b>
                                }
                              </Table.Cell>
                          </Table.Row>
                        }
                      </Table.Body>
                    </Table>
                  </div>
                }
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8}>
                {
                  (customerInfo && Object.keys(customerInfo).length > 0 &&
                    <WashSettings
                      isOrders={true}
                      data={customerInfo.wash_settings}
                      getpdf={this.handlePDFDownload}
                      getXLSX={this.handleXLSXDownload}
                    />
                  )
                }
              </Grid.Column>
              <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8}>
                {
                  (orderDetails && Object.keys(orderDetails).length > 0 &&
                    <div>
                      {this.renderPickUpDropDetails(orderDetails)}
                    </div>
                  )
                }
              </Grid.Column>
            </Grid>
          </Segment>
        </Segment>
      );
    } else {
      ele = (
        <Segment padded className="OrdersSection">
            <Segment padded className="OrdersTitle">
              <h3> Something Went Wrong. </h3>
              <br />
              <h4> Either this order is deleted or its an invalid order. Please return to All Orders section.</h4>
            </Segment>
        </Segment>
      )
    }

    return ele;
  }
}

const mapStateToProps = (state) => ({
  customerInfo: userSelector.userDetails(state),
  ordersList: orderSelector.getOrdersList(state),
  orderPdf: orderSelector.getOrderPDF(state),
  orderXlsx: orderSelector.getOrderXLSX(state),
  deletedStatus: orderSelector.getDeletedStatus(state),
  userOrderId: landingContainerSelector.getUserOrderId(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: async (uid) => {
    return dispatch(GET_USER_DETAILS(uid));
  },
  getAllOrdersOnRefresh: async () => {
    return dispatch(GET_ORDERS_LIST());
  },
  getPDF: async(orderID) => {
    return dispatch(EXPORT_ORDER_PDF(orderID));
  },
  getXLSX: async(orderID) => {
    return dispatch(EXPORT_ORDER_XLSX(orderID));
  },
  deleteOrder: async(orderID) => {
    return dispatch(DELETE_ORDER(orderID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderDetails));
