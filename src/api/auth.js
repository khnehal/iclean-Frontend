import { getCookie, setCookie, eraseCookie } from './utils'; // eslint-disable-line
import { get } from './utils';
import { BACKEND_URL } from '../utils';

const apiUrl = BACKEND_URL;

export function getLocalToken() {
  return localStorage.getItem('token');
}

export function setLocalToken(token) {
  localStorage.setItem('token', token);
}

export function removeLocalToken() {
  localStorage.removeItem('token');
}

// Driver API's
export async function getDrivers() {
  return get(`${apiUrl}/driver`);
}

export async function getDriverTimeslotDetails(driverId) {
  return get(`${apiUrl}/driver/${driverId}/time-slot/?limit=14`);
}
