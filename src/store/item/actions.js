import {
  getItems,
} from './../../api/items.js';

import {
  resultOK,
} from './../../api/utils.js';


export const ITEMS_LIST = 'ITEMS_LIST';

export function GET_ITEMS() {
  return async (dispatch) => {
    const result = await getItems();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.prices) || [];
    dispatch({ type: ITEMS_LIST, data });
    return result;
  };
}
