import React, { Component } from 'react';

import LandingContainer from '../LandingContainer';

import { Segment, Input } from 'semantic-ui-react';

import './orders.css'

class Orders extends Component {

  constructor() {
    super();
    this.state = {
      hasStatus: false,
      hasDateAndTime: true,
      data: [
        {
          name: 'All',
          dateTime: '12-oct-18',
        },
      ],
    };
  };

  render() {
    return (
      <Segment className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <h2> Orders History </h2>
          </Segment>
          <Segment className="OrdersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Segment>
        </Segment.Group>
        <LandingContainer {...this.state} />
      </Segment>
    );
  }
}

export default Orders;
