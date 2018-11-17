import { apiUrl } from '../utils';
import { get } from './utils';

// Driver API's
export async function getDrivers() {
  return get(`${apiUrl}/driver`);
}

export async function getDriverTimeslotDetails(driverId) {
  return get(`${apiUrl}/driver/${driverId}/time-slot/?limit=14`);
}
