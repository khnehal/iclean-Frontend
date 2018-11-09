import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';

import './items.css'

class AddItem extends Component {

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
            <h2> Add Item </h2>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default AddItem;
