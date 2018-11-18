import { initialState } from './selectors.js';
import {
  ITEMS_LIST,
  CATEGORIES_LIST,
  ITEM_DELETED,
  RELOAD_ITEMS,
  ITEM_UPDATED,
  ITEM_SAVED,
  ITEM_ERRORS
} from './actions';


export default (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_LIST:
      return {
        ...state,
        itemsList: action.data,
      };
    case CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: action.data,
      };
    case ITEM_DELETED:
      return {
        ...state,
        itemDeleted: action.data,
      };
    case RELOAD_ITEMS:
      return {
        ...state,
        reloadItems: action.data,
      };
    case ITEM_UPDATED:
      return {
        ...state,
        itemUpdated: action.data,
      };
    case ITEM_SAVED:
      return {
        ...state,
        itemSaved: action.data,
      };
    case ITEM_ERRORS:
      return {
        ...state,
        itemErrors: action.data,
      };
    default:
      return state;
  }
};
