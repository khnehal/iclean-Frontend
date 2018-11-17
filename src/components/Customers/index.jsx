import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LandingContainer from '../LandingContainer';
import { Segment, Input, Grid } from 'semantic-ui-react';

import './customers.css';

class Customers extends Component {

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
          name: 'Customers list',
          dateTime: '12-oct-18',
        },
      ],
    };
  };

  render() {
    return (
      <Segment className="CustomersSection">
        <Grid className="CustomersHeaderSection">
          <Grid.Column mobile={16} tablet={8} computer={10} textAlign={'left'} className="CustomersTitle">
            <h2> Customers List </h2>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={6} className="CustomersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Grid.Column>
        </Grid>
        <LandingContainer {...this.state} history={this.props.history} />
      </Segment>
    );
  }
}


export default Customers;
