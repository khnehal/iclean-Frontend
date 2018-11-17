import { initialState } from './selectors.js';

import {
  PROMOTIONS_LIST
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case PROMOTIONS_LIST:
      return {
        ...state,
        promotionsList: action.data,
      };

    default:
      return state;
  }
};
