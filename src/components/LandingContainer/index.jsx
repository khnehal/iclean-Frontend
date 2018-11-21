import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Table, Icon, Rating, Segment } from 'semantic-ui-react';

import {
  USER_SELECTED,
  CURRENT_DRIVER,
} from '../../store/actions';
// import { userSelector } from '../../store/selectors';

import './landingStyles.css';

class LandingContainer extends Component {

  static propTypes = {
    type: PropTypes.string,
    match: PropTypes.object,
    data: PropTypes.array,
    hasStatus: PropTypes.bool,
    redirectTo: PropTypes.string,
    hasDateAndTime: PropTypes.bool,
    history: PropTypes.object,
    // handleUsersWashSettings: PropTypes.func,
    selectedUserOrder: PropTypes.func,
    hasRating: PropTypes.bool,
    setCurrentDriver: PropTypes.func,
  };



  handleRedirection = (item) => {
    const { redirectTo, history, selectedUserOrder, type, setCurrentDriver } = this.props;
    if (redirectTo) {
      if (type === 'driver') {
        setCurrentDriver(item.driver_id);
        history.push({
          pathname: `${redirectTo}${item.driver_id}/`,
          state: { driver_id: item.driver_id },
        });
      } else {
        if (type === 'order' || type === 'past') {
          history.push( `${redirectTo}${item.user_id}/${item.id}/`);
        } else {
          history.push( `${redirectTo}${item.user_id}/`);
        }
        selectedUserOrder(item.id);
      }
    }
  };

  render(){
    const { data, hasStatus, hasDateAndTime, type, hasRating } = this.props;
    const entity = type === 'driver' ? 'drivers' : 'items';

    return (
      <div className="landing-container">
        {
          (data && data.length > 0)
          ?
            <Segment basic>
              {
                (type === 'past') &&
                <div>
                  <h3>{data && data[0].customer_name ? data[0].customer_name : ''}</h3> <h4>Past Orders</h4>
                </div>
              }
              <Table padded selectable>
                <Table.Body>
                  {
                    data.map((item, i) => {
                    const dateTime = item.drop_off_date;
                    return (
                      <Table.Row key={i + 1} onClick={() => this.handleRedirection(item)}>
                        {
                          (type === 'past')
                          ?
                            <Table.Cell>{item.name ? item.name : item.pickup_driver_name}</Table.Cell>
                          :
                            <Table.Cell>{item.name ? item.name : item.customer_name}</Table.Cell>
                        }
                        {hasStatus && item.status_admin && <Table.Cell>Status - {(item.status_admin).replace(/_/g, " ")}</Table.Cell>}
                        {hasDateAndTime && <Table.Cell textAlign='right'>{moment(dateTime).format('dddd, MMMM Do, YYYY')}</Table.Cell>}
                        {hasRating && <Table.Cell> <Rating defaultRating={item.rating} maxRating={5}  icon='star' size='massive' disabled /> </Table.Cell>}
                        <Table.Cell textAlign='right'>
                          <Icon name='arrow right' />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Segment>
          :
            (<h4>No { entity } to display.</h4>)
        }

      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   usersList: userSelector.allUsersList(state),
// });

const mapDispatchToProps = (dispatch) => ({
  selectedUserOrder: async (id) => {
    return dispatch(USER_SELECTED(id));
  },
  setCurrentDriver: async (id) => {
    return dispatch({ type: CURRENT_DRIVER, data: { driver_id: id } });
  }
});

export default connect(null, mapDispatchToProps)(withRouter(LandingContainer));

