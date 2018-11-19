export const initialState = {
  orders: [],
  exportPDF: null,
  exportXLSX: null,
};

export const getOrdersList = (state = initialState) => state.orders;
export const getOrderPDF = (state = initialState) => state.exportPDF;
export const getOrderXLSX = (state = initialState) => state.exportXLSX;
