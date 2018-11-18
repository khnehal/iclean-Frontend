import { apiUrl } from '../utils';
import { get, post, del } from './utils';

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

export async function getDayOffs(driverId) {
  return get(`${apiUrl}/customer-service/day-off/`);
}

export async function saveDayOff(data) {
  return post(`${apiUrl}/customer-service/day-off/`, data);
}

export async function deleteDayOff(id) {
  return del(`${apiUrl}/customer-service/day-off/${id}/`, {});
}

export async function getAreas(driverId) {
  return get(`${apiUrl}/driver/${driverId}/area/`);
}

export async function saveArea(driverId, data) {
  return post(`${apiUrl}/driver/${driverId}/area/`, data);
}

export async function deleteArea(driverId, areaCode) {
  return del(`${apiUrl}/driver/${driverId}/area/${areaCode}/`, {});
}
