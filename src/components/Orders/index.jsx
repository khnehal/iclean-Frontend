import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { GET_WAITING_FOR_CLEANING } from '../../store/actions';
import { orderSelector } from '../../store/selectors';

import LandingContainer from '../LandingContainer';

import { uniqBy, filter, some } from 'lodash';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Segment, Input, Header } from 'semantic-ui-react';

import 'react-tabs/style/react-tabs.css';
import './orders.css';

class Orders extends Component {

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

  renderTabsList = (ordersList) => {
    const driversList = uniqBy(ordersList, 'pickup_driver');
    const driversData = filter(ordersList, (ord) => { return some(driversList, (obj) => ord.pickup_driver === obj.pickup_driver ); });
    console.log(driversData);

    return (
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          {
            driversList && driversList.map((item, i) => {
              return (
                <Tab key={i + 1}>{item.pickup_driver_name}</Tab>
              );
            })
          }
        </TabList>

        <TabPanel>
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
              <Header as='h2'> No orders waiting. </Header>
          }
        </TabPanel>
        {
          driversList && driversList.map((item, i) => {
            return (
              <TabPanel key={i + 1}>
                {
                  (driversData && driversData.length > 0)
                  ?
                    <LandingContainer
                      data={driversData}
                      hasDateAndTime={true}
                      redirectTo={'/orders/'}
                      history={this.props.history}
                    />
                  :
                    <Header as='h2'> No orders waiting. </Header>
                }
              </TabPanel>
            );
          })
        }
      </Tabs>
    );
  }

  render() {
    const { ordersList } = this.props;

    return (
      <Segment className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <Header as='h1'> Waiting For Cleaning </Header>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Segment>
        </Segment.Group>
        {this.renderTabsList(ordersList)}
      </Segment>
    )
  }
}


const mapStateToProps = (state) => ({
  ordersList: orderSelector.getOrdersList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getOrdersList: async () => {
    return dispatch(GET_WAITING_FOR_CLEANING());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Orders));
