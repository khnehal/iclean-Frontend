import {
  getDrivers,
  saveDriver,
  getDayOffs,
  saveDayOff,
  deleteDayOff,
} from './../../api/drivers.js';

import {
  resultOK,
} from './../../api/utils.js';

// Drivers listing page actions
export const DRIVERS_LIST = 'DRIVERS_LIST';

// Add driver page actions
export const DRIVER_ERRORS = 'DRIVER_ERRORS';
export const DRIVER_SAVED = 'DRIVER_SAVED';

// Dayoffs page actions
export const DAYOFFS_LIST = 'DAYOFFS_LIST';
export const DAYOFFS_ERRORS = 'DAYOFFS_ERRORS';
export const DAYOFF_SAVED = 'DAYOFF_SAVED';
export const DAYOFF_DELETED= 'DAYOFF_DELETED';
export const RELOAD_DAYOFFS = 'RELOAD_DAYOFFS';


export function GET_DRIVERS() {
  return async (dispatch) => {
    const result = await getDrivers();

    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type: DRIVERS_LIST, data: result.data });
    return result;
  };
}

export function SAVE_DRIVER(data) {
  return async (dispatch) => {
    const result = await saveDriver(data);
    // if (!resultOK(result)) {
    //   return null;
    // }
    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: DRIVER_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: DRIVER_SAVED, data: result.data.message });
    }
  }
}

export function GET_DAYOFFS() {
  return async (dispatch) => {
    const result = await getDayOffs();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.days_off) || [];
    dispatch({ type: DAYOFFS_LIST, data });
    return result;
  };
}

export function SAVE_DAYOFF(data) {
  return async (dispatch) => {
    const result = await saveDayOff(data);
    // if (!resultOK(result)) {
    //   return null;
    // }
    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: DAYOFFS_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: DAYOFF_SAVED, data: result.data.message });
      dispatch({ type: RELOAD_DAYOFFS, data: true });
    }
  }
}

export function DELETE_DAYOFF(id) {
  return async (dispatch) => {
    const result = await deleteDayOff(id);
    // returns status= 0 or 404 when dayoff is deleted or doesn't exist(already deleted).
    const validStates = [0, 404];
    const status = (result && result.status in validStates) ? true : false;
    dispatch({ type: DAYOFF_DELETED, data: status });
    dispatch({ type: RELOAD_DAYOFFS, data: status });
  }
}
