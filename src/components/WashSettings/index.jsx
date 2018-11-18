import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

import { Header, Segment, Grid, Button, Checkbox } from 'semantic-ui-react';

class WashSettings extends Component {

  static propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  renderDryCleanDetails = () => {
    return (
      <Segment basic>
        <Checkbox />
      </Segment>
    );
  };

  renderLaundryDetails =  () =>{
    return (
      <Segment basic>
        <Checkbox />
      </Segment>
    );
  };


  render() {
    const { data } = this.props;

    if(data && Object.keys(data).length > 0) {
      return (
        <div>
          <Segment secondary className="WashSettings">
            <Grid padded>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Header as='h1' textAlign='left'> Wash Setting </Header>
              </Grid.Column>
              <Grid.Column textAlign="right" mobile={16} tablet={16} computer={8}>
                <Button color="green" size="medium"> Export </Button>
              </Grid.Column>
            </Grid>
          </Segment>
          <Grid padded>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Header as='h2' textAlign='center'> Dry Clean </Header>
              {this.renderDryCleanDetails()}
              <Segment basic>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Header as='h2' textAlign='center'> Laundry Shirts </Header>
              {this.renderLaundryDetails()}
              <Segment basic>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      );
    }

    return null;
  }
}

// const mapStateToProps = (state) => ({
//   getDriversList: DriversSelector.getDriversList(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   getDrivers: async () => {
//     return dispatch(GET_DRIVERS());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Drivers));
export default WashSettings;
