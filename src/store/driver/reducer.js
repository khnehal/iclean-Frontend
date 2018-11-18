import { initialState } from './selectors.js';

import {
  DRIVERS_LIST,
  DRIVER_ERRORS,
  DRIVER_SAVED,
  DAYOFFS_LIST,
  DAYOFFS_ERRORS,
  DAYOFF_SAVED,
  DAYOFF_DELETED,
  RELOAD_DAYOFFS,
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
    case DAYOFF_SAVED:
      return {
        ...state,
        dayoffSaved: action.data,
      };
    case DAYOFFS_LIST:
      return {
        ...state,
        dayoffsList: action.data,
      };
    case RELOAD_DAYOFFS:
      return {
        ...state,
        reloadDayoffs: action.data,
      };
    case DAYOFFS_ERRORS:
      return {
        ...state,
        dayoffErrors: action.data,
      };
    case DAYOFF_DELETED:
      return {
        ...state,
        dayoffDeleted: action.data,
      };
    default:
      return state;
  }
};
