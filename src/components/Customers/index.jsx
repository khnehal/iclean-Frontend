import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import LandingContainer from '../LandingContainer';
import { Segment, Input, Grid, Header } from 'semantic-ui-react';

import { GET_USERS } from '../../store/actions';
import { userSelector } from '../../store/selectors';

import './customers.css';

class Customers extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    getAllUsers: PropTypes.func,
    usersList: PropTypes.array,
  };

  constructor() {
    super();
    this.state = {
      usersList: [],
      hasStatus: false,
      selectedUser: '',
      hasDateAndTime: true,
    };
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
  }

  handleUsersWashSettings = (userId) => {
    this.setState({ selectedUser: userId });
  }

  render() {
    const { usersList, history, match } = this.props;

    return (
      <Segment padded className="CustomersSection">
        <Grid padded className="CustomersHeaderSection">
          <Grid.Column mobile={16} tablet={8} computer={10} textAlign={'left'} className="CustomersTitle">
            <Header as='h1'> Customers List </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={6} textAlign={'right'} className="CustomersSearchSection">
            <Input icon='search' placeholder='Search...' />
          </Grid.Column>
        </Grid>
        <Segment basic padded>
          <LandingContainer
            match={match}
            data={usersList}
            history={history}
            hasStatus={false}
            hasDateAndTime={true}
            handleUsersWashSettings={this.handleUsersWashSettings}
            redirectTo={'/washSettings/'}
          />
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  usersList: userSelector.allUsersList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: async () => {
    return dispatch(GET_USERS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Customers));
