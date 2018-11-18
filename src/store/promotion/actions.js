import {
  getPromotions,
  generatePromoCode,
  deletePromotion,
  savePromotion,
} from './../../api/promotions.js';

import {
  resultOK,
} from './../../api/utils.js';


export const PROMOTIONS_LIST = 'PROMOTIONS_LIST';
export const GENERATED_PROMO_CODE = 'GENERATED_PROMO_CODE';
export const PROMOTION_DELETED= 'PROMOTION_DELETED';
export const PROMOTION_SAVED= 'PROMOTION_SAVED';
export const RELOAD_PROMOTIONS = 'RELOAD_PROMOTIONS';


export function GET_PROMOTIONS() {
  return async (dispatch) => {
    const result = await getPromotions();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.promo_codes) || [];
    dispatch({ type: PROMOTIONS_LIST, data });
  };
}

export function GET_PROMO_CODE() {
  return async (dispatch) => {
    const result = await generatePromoCode();
    if (!resultOK(result)) {
      return null;
    }
    const data = (result.data && result.data.data && result.data.data.code) || null;
    dispatch({ type: GENERATED_PROMO_CODE, data });
  };
}

export function DELETE_PROMOTION(id) {
  return async (dispatch) => {
    const result = await deletePromotion(id);
    // returns status= 0 or 404 when promo is deleted or doesn't exist(already deleted).
    const validStates = [0, 404];
    const status = (result.status in validStates) ? true : false;
    dispatch({ type: PROMOTION_DELETED, data: status });
    dispatch({ type: RELOAD_PROMOTIONS, data: status });
  }
}

export function SAVE_PROMOTION(data) {
  return async (dispatch) => {
    const result = await savePromotion(data);
    if (!resultOK(result)) {
      return null;
    }
    dispatch({ type: PROMOTION_SAVED, data: true });
    dispatch({ type: RELOAD_PROMOTIONS, data: true });
  }
}
