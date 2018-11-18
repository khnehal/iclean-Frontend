import { apiUrl } from '../utils';
import { get } from './utils';

export async function getUsers() {
  return get(`${apiUrl}/user/`);
}

export async function getUserDetail(uid) {
  return get(`${apiUrl}/user/${uid}`);
}

