import { initialState } from './selectors.js';
import {
  SELECTED_USER,
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_USER:
      return {
        ...state,
        userId: action.data,
      };
    default:
      return state;
  }
};
