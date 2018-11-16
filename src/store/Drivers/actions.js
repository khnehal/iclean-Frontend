import {
  getDrivers,
} from './../../api/auth.js';

import {
  resultOK,
} from './../../api/utils.js';

export const DRIVERS_LIST = 'DRIVERS_LIST';

export function GET_DRIVERS() {
  return async (dispatch) => {
    const result = await getDrivers();
    console.log('ACTIONS', dispatch, result);
    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type: DRIVERS_LIST, data: result.data });

    return result;
  };
}
