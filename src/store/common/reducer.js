import { initialState } from './selectors.js';

import {
  SUCCESS_MESSAGE,
  ERRORS_LIST,
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.data,
      };
    case ERRORS_LIST:
      return {
        ...state,
        errorsList: action.data,
      };

    default:
      return state;
  }
};
