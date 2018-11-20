// Request utils,
// feel free to replace with your code
// (get, post are used in ApiServices)

import { getLocalToken } from '../api/auth.js';
import config from '../../src/config.js';
import 'whatwg-fetch';

/**
 * 1. parse response
 * 2. add "ok" property to result
 * 3. add "status" property to result
 * 3. return request result
 * @param  {Object} res - response from server
 * @return {Object} response result with "ok" property
 */
async function parseJSON(res) {
  let json;

  try {
    json = await res.json();
  } catch (e) {
    return {
      data: {},
      ok: false,
      status: 0,
    };
  }

  // simplest validation ever, ahah :)
  if (!res.ok) {
    return {
      data: json,
      ok: false,
      status: res.status,
    };
  }

  // resultOK - is a function with side effects
  // It removes ok property from result object
  return {
    data: json,
    ok: true,
    status: res.status,
  };
}

function requestWrapper(method) {
  return async (url, data = null, params = {}) => {
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      params = data; // eslint-disable-line
      data = null; // eslint-disable-line
    } else if (data === Object(data)) {
      data = JSON.stringify(data); // eslint-disable-line
    } else if (method === 'POST' && typeof data === 'string') {
      data = data // eslint-disable-line
    } else {
      throw new Error(`XHR invalid, check ${method} on ${url}`);
    }

    // default params for fetch = method + (Content-Type)
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    const defaults = {
      method,
      headers
    };
    // const shouldEscapeToken = url.match(/^http(s)?:\/\/(.)*\/(search|cms-api)\/*/gi);

    // if ((url.indexOf('/signin') > -1)) {
    const token = getLocalToken();

    if (token) {
      defaults.headers.Token = `${token}`;
    }
    // }

    if (data) {
      defaults.body = data;
    }

    const paramsObj = { ...defaults, headers: { ...params, ...defaults.headers } };

    // if (!shouldEscapeToken) {
    //   paramsObj.credentials = 'include';
    // }

    return fetch(url, paramsObj).then(parseJSON).catch(err => {
      console.error(err); // eslint-disable-line
    });
  };
}

function requestDownloadWrapper(method) {
  return async function (url, data = null, params = {}) { // eslint-disable-line func-names
    const fileName = data;
    data = null; // eslint-disable-line no-param-reassign
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      params = data; // eslint-disable-line no-param-reassign
      data = null; // eslint-disable-line no-param-reassign
    } else if (data === Object(data)) {
      // (data === Object(data)) === _.isObject(data)
      data = JSON.stringify(data); // eslint-disable-line no-param-reassign
    } else {
      throw new Error(`XHR invalid, check ${method} on ${url}`);
    }
    const csrfToken = getLocalToken();

    // default params for fetch = method + (Content-Type)
    const defaults = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-CSRFToken': csrfToken
      },
      credentials: 'include',
      redirect: 'follow',
    };

    // check that req url is relative and request was sent to our domain
    if (url.match(/^https?:\/\//gi) > -1) {
      // const token = getLocalToken();

      // if (token) {
      //   defaults.headers.Authorization = `JWT ${token}`;
      // }
      const { apiUrl } = config;
      url = apiUrl + url; // eslint-disable-line no-param-reassign
    }

    if (data) {
      defaults.body = data;
    }

    const paramsObj = { ...defaults, headers: { ...params, ...defaults.headers } };

    return fetch(url, paramsObj).then(function (res) { // eslint-disable-line
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const csvfile = res.blob();
      csvfile.then(blob => {
        const objectURL = URL.createObjectURL(blob);
        a.href = objectURL;
        a.download = `${fileName}.csv`;
        a.click();
        URL.revokeObjectURL(objectURL);
      });
    }).catch(err => {
      console.error(err); // eslint-disable-line no-console
    });
  };
}

function requestUploadWrapper(method) {
  return async function (url, data = null, params = {}) { // eslint-disable-line func-names
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      params = data; // eslint-disable-line no-param-reassign
      data = null; // eslint-disable-line no-param-reassign
    }

    const csrfToken = getLocalToken();
    // default params for fetch = method + (Content-Type)
    const defaults = {
      method,
      headers: { 'X-CSRFToken': csrfToken },
      credentials: 'include',
      redirect: 'follow',
    };

    const postData = new FormData();
    // postData.append('file', data.file);
    Object.keys(data).map(k => {
      postData.append(k, data[k]);
      return null;
    });

    // check that req url is relative and request was sent to our domain
    if (url.match(/^https?:\/\//gi) > -1) {
      // const token = getLocalToken();

      // if (token) {
      //   defaults.headers.Authorization = `JWT ${token}`;
      // }
      const { apiUrl } = config;
      url = apiUrl + url; // eslint-disable-line no-param-reassign
    }

    if (data) {
      defaults.body = postData;
    }

    const paramsObj = { ...defaults, headers: { ...params, ...defaults.headers } };

    return fetch(url, paramsObj).then(parseJSON).catch(err => {
      console.error(err); // eslint-disable-line no-console
    });
  };
}

export const get = requestWrapper('GET');
export const post = requestWrapper('POST');
export const put = requestWrapper('PUT');
export const patch = requestWrapper('PATCH');
export const del = requestWrapper('DELETE');
export const download = requestDownloadWrapper('GET');
export const upload = requestUploadWrapper('POST');

// USAGE:
// get('https://www.google.com', {
//     headers: {
//         'Content-Type': 'text/html'
//     }
// })

// FUNCTION WITH SIDE-EFFECTS
/**
 * `parseJSON()` adds property "ok"
 * that identicates that response is OK
 *
 * `resultOK`removes result.ok from result and returns "ok" property
 *  It widely used in `/actions/*`
 *  for choosing action to dispatch after request to API
 *
 * @param  {Object} result - response result that
 * @return {bool} - indicates was request successful or not
 */
export function resultOK(result) {
  if (result) {
    const ok = result.ok;

    delete result.ok; // eslint-disable-line

    return ok; // look at parseJSON
  }

  return false;
}

export function _getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0
  };
  return headers;
}
