import {
  getOrders,
  getCleaningNow,
  getWaitingForCleaning,
  getOrderAsPDF,
  getOrderAsXLSX,
  getDateBasedOrders,
  getCustomerPastOrders,
  deleteOrder,
} from './../../api/orders.js';

import {
  getListOfAllOrderItems,
  saveOrderItemsDetail,
} from './../../api/addOrderItems.js';

import {
  resultOK,
} from './../../api/utils.js';

export const GET_ORDERS = 'GET_ORDERS';
export const CLEANING_NOW = 'CLEANING_NOW';
export const WAITING_FOR_CLEANING = 'WAITING_FOR_CLEANING';
export const ORDER_AS_PDF = 'ORDER_AS_PDF';
export const ORDER_AS_XLSX = 'ORDER_AS_XLSX';
export const ORDER_ITEMS = 'ORDER_ITEMS';
export const SAVE_ORDER_ITEMS = 'SAVE_ORDER_ITEMS';
export const DELETE_STATUS = 'DELETE_STATUS';

function responseData(result, dispatch, type, data) {
  if (!resultOK(result)) {
    return null;
  }

  dispatch({ type, data });
}

export function GET_ORDERS_LIST() {
  return async (dispatch) => {
    const result = await getOrders();
    responseData(result, dispatch, GET_ORDERS, result.data.data.orders);
  };
}

export function GET_CLEANING_NOW() {
  return async (dispatch) => {
    const result = await getCleaningNow();
    responseData(result, dispatch, CLEANING_NOW, result.data.data.orders);
  };
}

export function GET_WAITING_FOR_CLEANING() {
  return async (dispatch) => {
    const result = await getWaitingForCleaning();
    responseData(result, dispatch, WAITING_FOR_CLEANING, result.data.data.orders);
  };
}

export function GET_DATE_BASED_ORDER(date) {
  return async (dispatch) => {
    const result = await getDateBasedOrders(date);
    responseData(result, dispatch, GET_ORDERS, result.data.data.orders);
  };
}

export function EXPORT_ORDER_PDF(orderId) {
  return async (dispatch) => {
    const result = await getOrderAsPDF(orderId);
    responseData(result, dispatch, ORDER_AS_PDF, result && result.data);
  };
}

export function EXPORT_ORDER_XLSX(orderId) {
  return async (dispatch) => {
    const result = await getOrderAsXLSX(orderId);
    responseData(result, dispatch, ORDER_AS_XLSX, result && result.data);
  };
}

export function GET_LIST_OF_ALL_ORDER_ITEMS() {
  return async (dispatch) => {
    const result = await getListOfAllOrderItems();
    responseData(result, dispatch, ORDER_ITEMS, result.data.data.prices);
  };
}

export function SAVE_ORDER_ITEM_DETAILS(orderId, data) {
  return async (dispatch) => {
    const result = await saveOrderItemsDetail(orderId, data);
    responseData(result, dispatch, SAVE_ORDER_ITEMS, result.data.data);
  }
}

export function GET_CUSTOMER_PAST_ORDER(customerId) {
  return async (dispatch) => {
    const result = await getCustomerPastOrders(customerId);
    responseData(result, dispatch, GET_ORDERS, result.data.data.orders);
  }
}

export function DELETE_ORDER(orderId) {
  return async (dispatch) => {
    const result = await deleteOrder(orderId);
    responseData(result, dispatch, DELETE_STATUS, result.status);
  }
}
