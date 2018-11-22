import {
  getDrivers,
  saveDriver,
  updateDriver,
  deleteDriver,
  getDriverTimeslots,
  updateTimeslot,
  getDayOffs,
  saveDayOff,
  deleteDayOff,
  getAreas,
  saveArea,
  deleteArea,
} from './../../api/drivers.js';

import {
  resultOK,
} from './../../api/utils.js';

// Drivers listing page actions
export const DRIVERS_LIST = 'DRIVERS_LIST';
export const RELOAD_DRIVERS = 'RELOAD_DRIVERS';
export const DRIVER_TIMESLOTS_LIST = 'DRIVER_TIMESLOTS_LIST';
export const RELOAD_TIMESLOTS = 'RELOAD_TIMESLOTS';

// Add driver page actions
export const DRIVER_DELETED= 'DRIVER_DELETED';
export const DRIVER_ERRORS = 'DRIVER_ERRORS';
export const DRIVER_SAVED = 'DRIVER_SAVED';

// Dayoffs page actions
export const DAYOFFS_LIST = 'DAYOFFS_LIST';
export const DAYOFFS_ERRORS = 'DAYOFFS_ERRORS';
export const DAYOFF_SAVED = 'DAYOFF_SAVED';
export const DAYOFF_DELETED= 'DAYOFF_DELETED';
export const RELOAD_DAYOFFS = 'RELOAD_DAYOFFS';

// Areas page actions
export const AREAS_LIST = 'AREAS_LIST';
export const AREA_ERRORS = 'AREA_ERRORS';
export const AREA_SAVED = 'AREA_SAVED';
export const RELOAD_AREAS = 'RELOAD_AREAS';
export const AREA_DELETED = 'AREA_DELETED';
export const ALL_DRIVER_AREAS = 'ALL_DRIVER_AREAS';
export const CURRENT_DRIVER = 'CURRENT_DRIVER';


export function GET_DRIVERS() {
  return async (dispatch) => {
    const result = await getDrivers();

    if (!resultOK(result)) {
      return null;
    }

    const data = (result.data && result.data.data && result.data.data.drivers) || [];
    dispatch({ type: DRIVERS_LIST, data });
    return result;
  };
}

export function GET_DRIVER_DATA(id) {
  return async (dispatch) => {
    const result = await getDrivers(id);

    if (!resultOK(result)) {
      return null;
    }

    const data = (result.data && result.data.data) || {};
    dispatch({ type: CURRENT_DRIVER, data });
    return result;
  };
}

export function GET_DRIVER_TIMESLOTS(id) {
  return async (dispatch) => {
    const result = await getDriverTimeslots(id);

    if (!resultOK(result)) {
      return null;
    }

    const data = (result.data && result.data.data && result.data.data.driver_time_slots) || [];
    dispatch({ type: DRIVER_TIMESLOTS_LIST, data });
    return result;
  };
}

export function UPDATE_TIMESLOT(driverId, timeSlot, data) {
  return async (dispatch) => {
    const result = await updateTimeslot(driverId, timeSlot, data);

    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type: RELOAD_TIMESLOTS, data: true });
    return result;
  };
}

export function SAVE_DRIVER(data) {
  return async (dispatch) => {
    const result = await saveDriver(data);

    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: DRIVER_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: DRIVER_SAVED, data: result.data.message });
    }
  }
}

export function UPDATE_DRIVER(id, data) {
  return async (dispatch) => {
    const result = await updateDriver(id, data);

    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: DRIVER_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: DRIVER_SAVED, data: result.data.message });
    }
  }
}

export function DELETE_DRIVER(id) {
  return async (dispatch) => {
    const result = await deleteDriver(id);

    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: DRIVER_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: DRIVER_DELETED, data: result.data.message });
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

export function GET_AREAS(driverId, existingAreas) {
  return async (dispatch) => {
    const result = await getAreas(driverId);
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.driver_areas) || [];
    dispatch({ type: AREAS_LIST, data });
    const allAreasList = existingAreas;
    allAreasList[driverId] = data;
    dispatch({ type: ALL_DRIVER_AREAS, data: allAreasList });
  };
}

export function SAVE_AREA(driverId, data) {
  return async (dispatch) => {
    const result = await saveArea(driverId, data);

    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: AREA_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: CURRENT_DRIVER, data: { driver_id: driverId } });
      dispatch({ type: AREA_SAVED, data: result.data.message });
      dispatch({ type: RELOAD_AREAS, data: true });
    }
  }
}

export function DELETE_AREA(driverId, zipCode) {
  return async (dispatch) => {
    const result = await deleteArea(driverId, zipCode);
    // returns status= 0 or 404 when areaCode is deleted or doesn't exist(already deleted).
    const validStates = [0, 404];
    const status = (result && result.status in validStates) ? true : false;
    dispatch({ type: CURRENT_DRIVER, data: { driver_id: driverId } });
    dispatch({ type: AREA_DELETED, data: '' });
    dispatch({ type: RELOAD_AREAS, data: status });
  }
}
