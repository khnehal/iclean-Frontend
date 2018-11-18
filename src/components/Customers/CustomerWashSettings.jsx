import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Header, Segment, Grid } from 'semantic-ui-react';

import { GET_USER_DETAILS } from '../../store/actions';
import { userSelector } from '../../store/selectors';

import WashSettings from '../../components/WashSettings/index.jsx';

import './customers.css';

class CustomerWashSettings extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    getUserInfo: PropTypes.func,
    customerInfo: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      customerInfo: {},
    };
  };

  componentDidMount() {
    const { getUserInfo, match } = this.props;
    getUserInfo(match.params.uid);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ customerInfo: nextProps.customerInfo });
  }

  render() {
    const { customerInfo } = this.state;

    return (
      <Segment padded className="WashSettings">
        <Grid padded>
          <Grid.Column textAlign='left' mobile={16} tablet={16} computer={8}>
            <Header as='h1'> Customer </Header>
            <Header.Subheader> Below you can view all the details of customer. </Header.Subheader>
          </Grid.Column>
        </Grid>
        <WashSettings
          data={customerInfo.wash_settings}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  customerInfo: userSelector.userDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: async (uid) => {
    return dispatch(GET_USER_DETAILS(uid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerWashSettings));
// export default CustomerWashSettings;
