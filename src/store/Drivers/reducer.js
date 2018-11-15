import { initialState } from './selectors';

import {
  SS_PROJ_INFO
} from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case SS_PROJ_INFO:
      return {
        ...state,
        projectInfo: action.data,
      };

    default:
      return state;
  }
};
