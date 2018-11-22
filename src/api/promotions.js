import { apiUrl } from '../utils';
import { get, post, del } from './utils';


export async function getPromotions() {
  return get(`${apiUrl}/customer-service/promocodes/`);
}

export async function generatePromoCode() {
  return get(`${apiUrl}/customer-service/generate-random-code/`);
}

export async function deletePromotion(id) {
  return del(`${apiUrl}/customer-service/promocode/${id}/`, {});
}

export async function savePromotion(data) {
  return post(`${apiUrl}/customer-service/promocodes/`, data);
}
