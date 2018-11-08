import React, { Component } from 'react';
import './style.css';

import LandingContainer from '../LandingContainer';

class Drivers extends Component {

  constructor() {
    super();
    this.state = {
      hasStatus: true,
      hasDateAndTime: true,
      data: [
        {
          name: 'ABC',
          dateTime: '12-oct-18',
        },
        {
          name: 'EFG',
          dateTime: '19-nov-18',
        }
      ],
    };
  };

  render() {
    return (
      <div className="Driver">
        <LandingContainer {...this.state} />
      </div>
    );
  }
}

export default Drivers;
