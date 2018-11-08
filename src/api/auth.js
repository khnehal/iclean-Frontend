import { getCookie, setCookie, eraseCookie } from 'utils';
import {
  post,
  get
} from './utils';

const apiUrl = '/';

export function getLocalToken() {
  return localStorage.getItem('token');
}

export function setLocalToken(token) {
  localStorage.setItem('token', token);
}

export function removeLocalToken() {
  localStorage.removeItem('token');
}

export async function loginAPI(data) {
  return post(`${apiUrl}/login/`, data);
}
