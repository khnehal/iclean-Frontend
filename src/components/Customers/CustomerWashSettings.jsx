import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

import { Header, Segment, Grid } from 'semantic-ui-react';

import WashSettings from '../../components/WashSettings/index.jsx';

import './customers.css';

class CustomerWashSettings extends Component {

  // static propTypes = {
    // history: PropTypes.object,
  // };

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <Segment padded className="WashSettings">
        <Grid padded>
          <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8}>
            <Header as='h1'> Customer </Header>
            <Header.Subheader> Below you can view all the details of customer. </Header.Subheader>
          </Grid.Column>
        </Grid>
        <WashSettings />
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
export default CustomerWashSettings;
