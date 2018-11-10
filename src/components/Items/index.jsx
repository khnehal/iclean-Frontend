import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';

import './items.css'


class Items extends Component {

  constructor() {
    super();
    this.state = {
    };
  };

  render() {
    return (
      <div className="items-section">
        <Segment.Group horizontal className="item-header-section">
          <Segment className="items-title">
            <h2>Items Price List</h2>
            <br/>
            <h4>List of all Items and Prices.</h4>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}


export default Items;
