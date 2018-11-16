import { getCookie, setCookie, eraseCookie } from './utils'; // eslint-disable-line
import {
  post,
  get
} from './utils';

const apiUrl = 'http://fd60d0d9.ngrok.io';

export function getLocalToken() {
  return localStorage.getItem('token');
}

// export function setLocalToken(token) {
localStorage.setItem('token', '5ab19227-e43a-45e9-a05a-027b0018d695');
// }

export function removeLocalToken() {
  localStorage.removeItem('token');
}

export async function loginAPI(data) {
  return post(`${apiUrl}/login/`, data);
}

// Driver API's
export async function getDrivers() {
  return get(`${apiUrl}/driver`);
}

export async function getDriverTimeslotDetails(driverId) {
  return get(`${apiUrl}/driver/${driverId}/time-slot/?limit=14`);
}
