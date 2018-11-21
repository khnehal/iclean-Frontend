export const initialState = {
  orders: [],
  exportPDF: null,
  exportXLSX: null,
  orderItems: [],
};

export const getOrdersList = (state = initialState) => state.orders;
export const getOrderPDF = (state = initialState) => state.exportPDF;
export const getOrderXLSX = (state = initialState) => state.exportXLSX;
export const getOrderItemsList = (state = initialState) => state.orderItems;
