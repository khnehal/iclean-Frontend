import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  Table,
  Icon,
} from 'semantic-ui-react';

import { USER_SELECTED } from '../../store/actions';
// import { userSelector } from '../../store/selectors';

import './landingStyles.css';

class LandingContainer extends Component {

  static propTypes = {
    match: PropTypes.object,
    data: PropTypes.array,
    hasStatus: PropTypes.bool,
    redirectTo: PropTypes.string,
    hasDateAndTime: PropTypes.bool,
    history: PropTypes.object,
    // handleUsersWashSettings: PropTypes.func,
    // selectedUser: PropTypes.func,
  };

  handleRedirection = (item) => {
    const { redirectTo, history } = this.props;

    if (redirectTo) {
      history.push( `${redirectTo}${item.user_id}/` );
    }
  };

  render(){
    const { data, hasStatus, hasDateAndTime } = this.props;

    return (
      <div className="landing-container">
        <Table padded selectable>
          <Table.Body>
            {(data && data.length > 0) && data.map((item, i) => {
              return (
                <Table.Row key={i + 1} onClick={() => this.handleRedirection(item)}>
                  <Table.Cell>{item.name}</Table.Cell>
                  {hasStatus && <Table.Cell>Status - {item.hasStatus}</Table.Cell>}
                  {hasDateAndTime && <Table.Cell>{item.dateTime}</Table.Cell>}
                  <Table.Cell textAlign='right'>
                    <Icon name='arrow right' />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   usersList: userSelector.allUsersList(state),
// });

const mapDispatchToProps = (dispatch) => ({
  selectedUser: async (id) => {
    return dispatch(USER_SELECTED(id));
  },
});

export default connect(null, mapDispatchToProps)(withRouter(LandingContainer));

// export default LandingContainer;
