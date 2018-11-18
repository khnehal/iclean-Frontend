import { apiUrl } from '../utils';
import { get, post } from './utils';

// Driver API's
export async function getDrivers() {
  return get(`${apiUrl}/driver`);
}

export async function getDriverTimeslotDetails(driverId) {
  return get(`${apiUrl}/driver/${driverId}/time-slot/?limit=14`);
}

export async function saveDriver(data) {
  return post(`${apiUrl}/driver/`, data);
}
