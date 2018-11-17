import {
  apiUrl,
  getCookie,
} from '../utils.js';
import { setLocalToken } from './auth.js';


export async function loginAPI(body) {
  let result = null;
  await fetch(`${apiUrl}/user/signin/`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: body,
  })
  .then((response) => response.json())
  .catch(error => console.log(error))
  .then((data) => {
    result = data;
  })
  .catch((error) => {
    console.log("errror",error);
  });
  setLocalToken(result.data.token);
  return result;
}
