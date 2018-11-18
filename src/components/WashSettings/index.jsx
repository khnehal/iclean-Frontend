import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

import { Header, Segment, Grid, Button } from 'semantic-ui-react';

class WashSettings extends Component {

  static propTypes = {
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <Segment secondary className="WashSettings">
        <Grid padded>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as='h1' textAlign='left'> Wash Setting </Header>
          </Grid.Column>
          <Grid.Column textAlign="right" mobile={16} tablet={16} computer={8}>
            <Button color="green" size="large"> Export </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    );
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
