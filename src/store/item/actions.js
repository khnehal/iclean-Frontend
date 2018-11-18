import {
  getItems,
  getCategories,
  deleteItem,
  updateItem,
  saveItem,
} from './../../api/items.js';

import {
  resultOK,
} from './../../api/utils.js';


export const ITEMS_LIST = 'ITEMS_LIST';
export const CATEGORIES_LIST = 'CATEGORIES_LIST';
export const ITEM_DELETED= 'ITEM_DELETED';
export const RELOAD_ITEMS = 'RELOAD_ITEMS';
export const ITEM_UPDATED = 'ITEM_UPDATED';
export const ITEM_SAVED = 'ITEM_SAVED';
export const ITEM_ERRORS = 'ITEM_ERRORS';


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
    if (!resultOK(result)) {
      return null;
    }
    const data = result && result.data && result.data.data;
    dispatch({ type: CATEGORIES_LIST, data });
    return result;
  };
}

export function DELETE_ITEM(id) {
  return async (dispatch) => {
    const result = await deleteItem(id);
    // returns status= 0 or 404 when item is deleted or doesn't exist(already deleted).
    const validStates = [0, 404];
    const status = (result && result.status in validStates) ? true : false;
    dispatch({ type: ITEM_DELETED, data: status });
    dispatch({ type: RELOAD_ITEMS, data: status });
  }
}

export function UPDATE_ITEM(id, data) {
  return async (dispatch) => {
    const result = await updateItem(id, data);
    if (!resultOK(result)) {
      return null;
    }
    dispatch({ type: ITEM_UPDATED, data: result.data.message });
  }
}

export function SAVE_ITEM(data) {
  return async (dispatch) => {
    const result = await saveItem(data);
    // if (!resultOK(result)) {
    //   return null;
    // }
    if (result && result.data) {
      if (result.data.data) {
        dispatch({ type: ITEM_ERRORS, data: result.data.data.errors });
      }
      dispatch({ type: ITEM_SAVED, data: result.data.message });
    }
  }
}
