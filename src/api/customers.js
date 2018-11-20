import { apiUrl } from '../utils';
import { get, post } from './utils';

export async function getUsers() {
  return get(`${apiUrl}/user/`);
}

export async function getUserDetail(uid) {
  return get(`${apiUrl}/user/${uid}`);
}

export async function sendNotification(data) {
  return post(`${apiUrl}/customer-service/send-notification/`, data);
}
