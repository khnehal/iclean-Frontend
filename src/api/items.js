import { apiUrl } from '../utils';
import { get } from './utils';


export async function getItems() {
  return get(`${apiUrl}/customer-service/prices/`);
}

export async function getCategories() {
  return get(`${apiUrl}/customer-service/categories/`);
}
