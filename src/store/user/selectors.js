export const initialState = {
  usersList: [],
  userInfo: {},
  notificationSent: '',
  notificationErrors: [],
};

export const allUsersList = (state = initialState) => state.usersList;
export const userDetails = (state = initialState) => state.userInfo;
export const notificationSent = (state = initialState) => state.notificationSent;
export const getNotificationErrors = (state = initialState) => state.notificationErrors;
