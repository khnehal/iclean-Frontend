import {
  getUsers,
  getUserDetail,
  sendNotification,
} from './../../api/customers.js';

import {
  resultOK,
} from './../../api/utils.js';

export const USERS_LIST = 'USERS_LIST';
export const USER_DETAILS = 'USER_DETAILS';
export const NOTIFICATION_SENT = 'NOTIFICATION_SENT';
export const NOTIFICATION_ERRORS = 'NOTIFICATION_ERRORS';


function responseData(result, type, data, dispatch) {
    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type, data });
    return null;
}

// Get List and details of All users
export function GET_USERS() {
  return async (dispatch) => {
    const result = await getUsers();
    const data = (result && result.data && result.data.data && result.data.data.users) || [];
    responseData(result, USERS_LIST, data, dispatch);
  };
}

// Get details of specific user, Pass the user_id
export function GET_USER_DETAILS(uid) {
  return async (dispatch) => {
    const result = await getUserDetail(uid);
    const data = (result && result.data && result.data.data && result.data.data.user) || [];
    responseData(result, USER_DETAILS, data, dispatch);
  };
}

export function SEND_NOTIFICATION(data) {
  return async (dispatch) => {
    const result = await sendNotification(data);
    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: NOTIFICATION_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: NOTIFICATION_SENT, data: result.data.message });
    }
  };
}
