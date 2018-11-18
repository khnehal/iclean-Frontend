import {
  getItems,
  getCategories
} from './../../api/items.js';

import {
  resultOK,
} from './../../api/utils.js';


export const ITEMS_LIST = 'ITEMS_LIST';
export const CATEGORIES_LIST = 'CATEGORIES_LIST';

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

export function GET_CATEGORIES() {
  return async (dispatch) => {
    const result = await getCategories();
    // if (!resultOK(result)) {
    //   return null;
    // }
    const categoriesList = [
      ["dry_cleaning", "Dry Cleaning"],
      ["laundry", "Laundry"],
      ["households", "Households"],
      ["fluff_and_fold", "Fluff & Fold"],
      ["dry_clean_upcharges", "Dry Clean Upcharges"],
    ]
    const data = (result.data && result.data.data && result.data.data.categories) || categoriesList;
    dispatch({ type: CATEGORIES_LIST, data });
    return result;
  };
}
