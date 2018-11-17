import { initialState } from './selectors.js';

import {
  ITEMS_LIST
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_LIST:
      return {
        ...state,
        itemsList: action.data,
      };

    default:
      return state;
  }
};
