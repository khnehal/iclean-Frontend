import { apiUrl } from '../utils';
import { get, download } from './utils';

export async function getOrders() {
  return get(`${apiUrl}/order/`);
}

export async function getWaitingForCleaning() {
  return get(`${apiUrl}/order/?status=waiting_for_cleaning`);
}

export async function getCleaningNow() {
  return get(`${apiUrl}/order/?status=cleaning_now`);
}

export async function getOrderAsPDF(orderId) {
  return download(`${apiUrl}/order/${orderId}/export/pdf/`);
}

export async function getOrderAsXLS(orderId) {
  return download(`${apiUrl}/order/${orderId}/export/xlsx/`);
}

