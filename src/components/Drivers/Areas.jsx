import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Segment, Table, Input, Header, Button, Grid, Image, Icon, Label } from 'semantic-ui-react'; //eslint-disable-line

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

  handleZipCode = (e, { value }) => {
    this.setState({ zip_code: value }); // Dummy Code/ Remove it with ajax call
  };

  renderDriverBlocks = () => {
    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        <Segment>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={10}>
              <Input
                fluid
                size='large'
                type={'number'}
                placeholder={'Please enter zipcode here...'}
                onChange={this.handleZipCode}
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Button fluid floated='right' color='green' as={NavLink} to={'/drivers/addDrivers'}> <Icon name='plus' /> Add Zip Code </Button>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Button basic circular color={'red'} size='medium' icon='delete'></Button>
              <span>888909</span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    );
  };

  render() {
    return (
      <div className="Driver">
        <Segment>
          <Segment padded basic textAlign='center'>
            <Header as='h1' textAlign='left'> Drivers <Header.Subheader> Below you can view all the Zip Code details </Header.Subheader></Header>
            <Button floated='right' color='green' as={NavLink} to={'/drivers/addDrivers'}> <Icon name='plus' /> Add a Driver </Button>
          </Segment>
          <Grid>
            {this.renderDriverBlocks()}
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default Areas;
