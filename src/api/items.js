import { apiUrl, getCookie } from '../utils';
import { get, del, put, post, parseJSON } from './utils';
import { getLocalToken } from './auth.js';


export async function getItems() {
  return get(`${apiUrl}/customer-service/prices/`);
}

export async function getCategories() {
  return get(`${apiUrl}/customer-service/item-categories/`);
}

export async function deleteItem(id) {
  return del(`${apiUrl}/customer-service/prices/${id}/`, {});
}

export async function saveItem(data) {
  return post(`${apiUrl}/customer-service/prices/`, data);
}

export async function updateItem(id, data) {
  return put(`${apiUrl}/customer-service/prices/${id}/`, data);
}

export async function saveItemWithImage(requestParams = {}) {
  const data = new FormData();
  Object.keys(requestParams).map(k => {
    data.append(k, requestParams[k]);
    return null;
  });
  console.log('----------saveItemWithImage', data);
  return fetch(`${apiUrl}/customer-service/prices/`, {
    method: 'post',
    headers: {
      // 'Accept': 'application/xml',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'multipart/form-data',
      'X-CSRFToken': getCookie('csrftoken'),
      'Token': getLocalToken(),
    },
    body: data,
  }).then(parseJSON).catch(err => {
    console.error(err); // eslint-disable-line
  });
}
