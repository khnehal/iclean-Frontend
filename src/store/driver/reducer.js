import { initialState } from './selectors.js';

import {
  DRIVERS_LIST,
  DRIVER_ERRORS,
  DRIVER_SAVED,
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case DRIVERS_LIST:
      return {
        ...state,
        driversList: action.data,
      };
    case DRIVER_ERRORS:
      return {
        ...state,
        driverErrors: action.data,
      };
    case DRIVER_SAVED:
      return {
        ...state,
        driverSaved: action.data,
      };

    default:
      return state;
  }
};
