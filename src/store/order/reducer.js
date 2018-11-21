import { initialState } from './selectors.js';
import {
  GET_ORDERS,
  CLEANING_NOW,
  WAITING_FOR_CLEANING,
  ORDER_AS_PDF,
  ORDER_AS_XLSX,
  ORDER_ITEMS,
  SAVE_ORDER_ITEMS,
} from './actions';


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.data,
      };
    case CLEANING_NOW:
      return {
        ...state,
        orders: action.data,
      };
    case WAITING_FOR_CLEANING:
      return {
        ...state,
        orders: action.data,
      };
    case ORDER_AS_PDF:
      return {
        ...state,
        exportPDF: action.data,
      };
    case ORDER_AS_XLSX:
      return {
        ...state,
        exportXLSX: action.data,
      };
    case ORDER_ITEMS:
      return {
        ...state,
        orderItems: action.data,
      };
    case SAVE_ORDER_ITEMS:
      return {
        ...state,
        savedDetails: action.data,
      }
    default:
      return state;
  }
};
