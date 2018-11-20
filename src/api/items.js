import { apiUrl} from '../utils';
import { get, del, put, upload } from './utils';


export async function getItems() {
  return get(`${apiUrl}/customer-service/prices/`);
}

export async function getCategories() {
  return get(`${apiUrl}/customer-service/item-categories/`);
}

export async function deleteItem(id) {
  return del(`${apiUrl}/customer-service/prices/${id}/`, {});
}

export async function saveItem(data) {
  return upload(`${apiUrl}/customer-service/prices/`, data);
}

export async function updateItem(id, data) {
  return put(`${apiUrl}/customer-service/prices/${id}/`, data);
}
