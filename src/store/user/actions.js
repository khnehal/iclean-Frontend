import {
  getUsers,
  getUserDetail,
} from './../../api/customers.js';

import {
  resultOK,
} from './../../api/utils.js';

export const USERS_LIST = 'USERS_LIST';
export const USER_DETAILS = 'USER_DETAILS';

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
    responseData(result, USERS_LIST, result.data.data.users, dispatch);
  };
}

// Get details of specific user, Pass the user_id
export function GET_USER_DETAILS(uid) {
  return async (dispatch) => {
    const result = await getUserDetail(uid);
    responseData(result, USER_DETAILS, result.data.data.user, dispatch);
  };
}
