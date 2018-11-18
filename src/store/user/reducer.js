import { initialState } from './selectors.js';

import {
  USERS_LIST,
  USER_DETAILS
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

    default:
      return state;
  }
};
