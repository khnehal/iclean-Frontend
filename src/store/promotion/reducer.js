import { initialState } from './selectors.js';
import {
  PROMOTIONS_LIST,
  GENERATED_PROMO_CODE,
  PROMOTION_DELETED,
  PROMOTION_SAVED,
  PROMOTION_ERRORS,
  RELOAD_PROMOTIONS,
} from './actions';


export default (state = initialState, action) => {
  switch (action.type) {
    case PROMOTIONS_LIST:
      return {
        ...state,
        promotionsList: action.data,
      };
    case GENERATED_PROMO_CODE:
      return {
        ...state,
        generatedPromoCode: action.data,
      };
    case PROMOTION_DELETED:
      return {
        ...state,
        promotionDeleted: action.data,
      };
    case PROMOTION_SAVED:
      return {
        ...state,
        promotionSaved: action.data,
      };
    case RELOAD_PROMOTIONS:
      return {
        ...state,
        reloadPromotions: action.data,
      };
    case PROMOTION_ERRORS:
      return {
        ...state,
        promotionErrors: action.data,
      };
    default:
      return state;
  }
};
