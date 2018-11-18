import {
  getDrivers,
  saveDriver,
} from './../../api/drivers.js';

import {
  resultOK,
} from './../../api/utils.js';

export const DRIVERS_LIST = 'DRIVERS_LIST';
export const DRIVER_ERRORS = 'DRIVER_ERRORS';
export const DRIVER_SAVED = 'DRIVER_SAVED';


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
