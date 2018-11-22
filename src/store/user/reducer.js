import { initialState } from './selectors.js';

import {
  USERS_LIST,
  USER_DETAILS,
  NOTIFICATION_SENT,
  NOTIFICATION_ERRORS,
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_LIST:
      return {
        ...state,
        usersList: action.data,
      };
    case USER_DETAILS:
      return {
        ...state,
        userInfo: action.data,
      };
    case NOTIFICATION_SENT:
      return {
        ...state,
        notificationSent: action.data,
      }
    case NOTIFICATION_ERRORS:
      return {
        ...state,
        notificationErrors: action.data,
      }

    default:
      return state;
  }
};
