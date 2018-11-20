import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Message } from 'semantic-ui-react';

import { fadeOutMessage } from '../utils.js';
import {
  NOTIFICATION_SENT,
  NOTIFICATION_ERRORS,
  DAYOFF_SAVED,
  DAYOFFS_ERRORS,
  DRIVER_SAVED,
  DRIVER_ERRORS,
  ITEM_SAVED,
  ITEM_ERRORS,
  PROMOTION_SAVED,
  PROMOTION_ERRORS,
  ITEM_UPDATED,
} from '../../store/actions';

const messageTypes = [
  NOTIFICATION_SENT,
  DAYOFF_SAVED,
  DRIVER_SAVED,
  ITEM_SAVED,
  PROMOTION_SAVED,
  ITEM_UPDATED,
];

const errorTypes = [
  NOTIFICATION_ERRORS,
  DAYOFFS_ERRORS,
  DRIVER_ERRORS,
  ITEM_ERRORS,
  PROMOTION_ERRORS,
];


class DisplayMessage extends Component {

  static propTypes = {
    message: PropTypes.string,
    errors: PropTypes.array,
    resetData: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const {
      message,
      errors,
      resetData,
    } = nextProps;

    if (message && !(errors && errors.length > 0)) {
      fadeOutMessage(resetData);
    }
  }

  render() {
    const {
      message,
      errors,
    } = this.props;

    return (
      <div>
        {
          message &&
          <Message size={'large'} info>
            <Message.Header>{`${message}`}</Message.Header>
            {
              (errors && errors.length > 0) &&
              <Message.List>
                {
                  errors.map((error, i) => {
                    return <Message.Item key={ i + 1 }>{`${error}`}</Message.Item>;
                  })
                }
              </Message.List>
            }
          </Message>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetData: async () => {
    messageTypes.map((type) => {
      return dispatch({ type, data: '' });
    })

    errorTypes.map((type) => {
      return dispatch({ type, data: [] });
    })

    return null;
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DisplayMessage));
