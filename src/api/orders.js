import { apiUrl } from '../utils';
import { get, download, csvdownload, del } from './utils';

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
  return download(`${apiUrl}/order/${orderId}/export/pdf/`, {});
}

export async function getOrderAsXLSX(orderId) {
  return csvdownload(`${apiUrl}/order/${orderId}/export/xlsx/`, {});
}

export async function getDateBasedOrders(date) {
  return get(`${apiUrl}/order/?date=${date}`);
}

export async function getCustomerPastOrders(customerId) {
  return get(`${apiUrl}/order/?customer_id=${customerId}`);
}

export async function deleteOrder(orderId) {
  return del(`${apiUrl}/order/${orderId}`, {});
}
