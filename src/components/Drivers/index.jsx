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

  componentDidMount() {
    fetch("http://57cb2cf9.ngrok.io/driver/orders/2/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('resultsasa', result);
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('errorssadasd', error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="Driver">
        <h1>Drivers <span> Below you can view all the drivers details. </span> </h1>
        <LandingContainer {...this.state} />
      </div>
    );
  }
}

export default Drivers;
