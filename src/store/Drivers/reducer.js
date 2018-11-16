import { initialState } from './selectors.js';

import {
  DRIVERS_LIST
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case DRIVERS_LIST:
      return {
        ...state,
        driversList: action.data,
      };

    default:
      return state;
  }
};
