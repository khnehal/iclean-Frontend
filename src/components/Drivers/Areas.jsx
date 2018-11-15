import React, { Component } from 'react';

import { Segment, Table, Input, Header, Button, Grid, Image, Icon } from 'semantic-ui-react'; //eslint-disable-line

import './style.css';

class Areas extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        {
          zip_code: '90067',
        }
      ],
    };
  };

  renderDriverBlocks = () => {
    return (
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'> Drivers <span> Below you can view all the Zip Code details </span> </Header>
            <Button floated='right' color='green'> <Icon name='plus' /> Add a Driver </Button>
          </Segment>
          {this.renderDriverBlocks()}
        </Segment>
      </div>
    );
  }
}

export default Areas;
