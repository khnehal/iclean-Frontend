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
      searchTerm: '',
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

  handleChange = (e, { value, name }) => {
    this.setState({ searchTerm: value });
  }

  keyPress = (e) => {
      if(e.keyCode === 13){
        console.log('value', e.target.value);
        const searchTerm = e.target.value;
        this.props.getAllUsers(searchTerm);
      }
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
            <Input
              icon='search'
              onChange={this.handleChange}
              onKeyDown={this.keyPress}
              type='text'
              value={this.state.searchTerm}
              placeholder={'Search...'}
              name={'search'}
            />
          </Grid.Column>
        </Grid>
        <Segment basic padded>
          <LandingContainer
            type={'customer'}
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
  getAllUsers: async (searchTerm) => {
    return dispatch(GET_USERS(searchTerm));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Customers));
