import { apiUrl } from '../utils';
import { get, post } from './utils';

export async function getListOfAllOrderItems() {
  return get(`${apiUrl}/customer-service/prices/`);
}

export async function saveOrderItemsDetail(orderId, data) {
  return post(`${apiUrl}/order/${orderId}/items/`, data);
}
