import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LandingContainer from '../LandingContainer';
import { Segment, Input, Tab } from 'semantic-ui-react';

import './orders.css'

const panes = [
  { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

const TabExampleLoading = () => <Tab panes={panes} /> //eslint-disable-line

class Orders extends Component {

  static propTypes = {
    history: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      hasStatus: false,
      hasDateAndTime: true,
      data: [
        {
          name: 'Waiting Orders',
          dateTime: '12-oct-18',
        },
      ],
    };
  };

  render() {
    return (
      <Segment basic className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <h2> Waiting For Cleaning </h2>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Segment>
        </Segment.Group>
        <LandingContainer {...this.state} history={this.props.history} />
      </Segment>
    );
  }
}


export default Orders;
