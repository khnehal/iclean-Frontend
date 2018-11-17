import { apiUrl } from '../utils';
import { get } from './utils';


export async function getPromotions() {
  return get(`${apiUrl}/customer-service/promocodes/`);
}

export async function generatePromoCode() {
  return get(`${apiUrl}/customer-service/generate-random-code/`);
}

export async function savePromotion() {
  return get(`${apiUrl}/customer-service/promocodes/`);
}

export async function deletePromotion() {
  return get(`${apiUrl}/customer-service/promocodes/`);
}
