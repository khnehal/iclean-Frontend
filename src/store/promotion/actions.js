import {
  getPromotions,
} from './../../api/promotions.js';

import {
  resultOK,
} from './../../api/utils.js';


export const PROMOTIONS_LIST = 'PROMOTIONS_LIST';

export function GET_PROMOTIONS() {
  return async (dispatch) => {
    const result = await getPromotions();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.promo_codes) || [];
    dispatch({ type: PROMOTIONS_LIST, data });
    return result;
  };
}
