import {
  getOrders,
  getCleaningNow,
  getWaitingForCleaning,
  getOrderAsPDF,
  getOrderAsXLS,
} from './../../api/orders.js';

import {
  resultOK,
} from './../../api/utils.js';

export const GET_ORDERS = 'GET_ORDERS';
export const CLEANING_NOW = 'CLEANING_NOW';
export const WAITING_FOR_CLEANING = 'WAITING_FOR_CLEANING';
export const ORDER_AS_PDF = 'ORDER_AS_PDF';
export const ORDER_AS_XLSX = 'ORDER_AS_XLSX';


export function GET_ORDERS_LIST() {
  return async (dispatch) => {
    const result = await getOrders();

    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type: GET_ORDERS, data:result.data.data.orders });
  };
}

export function GET_CLEANING_NOW() {
  return async (dispatch) => {
    const result = await getCleaningNow();

    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type: CLEANING_NOW, data:result.data.data.orders });
  };
}

export function GET_WAITING_FOR_CLEANING() {
  return async (dispatch) => {
    const result = await getWaitingForCleaning();

    if (!resultOK(result)) {
      return null;
    }

    dispatch({ type: WAITING_FOR_CLEANING, data:result.data.data.orders });
  };
}

export function EXPORT_ORDER_PDF() {
  return async (dispatch) => {
    const result = await getOrderAsPDF();
    // const result = {
    //   data: [
    //     {
    //       name: 'sdas'
    //     }
    //   ]
    // }
    console.log('resultpdfffff', result);

    if (!resultOK(result)) {
      return null;
    }


    dispatch({ type: ORDER_AS_PDF, data:result.data });
  };
}

export function EXPORT_ORDER_XLSX() {
  return async (dispatch) => {
    const result = await getOrderAsXLS();
    // const result = {
    //   data: [
    //     {
    //       name: 'sdas'
    //     }
    //   ]
    // }
    console.log('result xlsx', result);

    if (!resultOK(result)) {
      return null;
    }


    dispatch({ type: ORDER_AS_XLSX, data:result.data });
  };
}

