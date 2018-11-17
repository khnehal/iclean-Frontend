import { isEmpty } from 'lodash';


// Cookie expire date these many date from today for saving pwd and email
export const COOKIE_EXPIRE_DAYS = 5;

// Session expiry for the tokens and user id
export const SESSION_EXPIRE_DAYS = 1;

// BE URL
export const BACKEND_URL = 'http://e763a263.ngrok.io';

export const getCookie = (name) => {
  /* Return cookie if not null. */
  if (!document.cookie) {
    return null;
  }
  const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(`${name}=`));
  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
};

export const verifyAuth = () => {
  /* Verify if Token and user Id exist. */
  const token = getCookie('token');
  const userId = getCookie('user_id');
  if (isEmpty(token) || isEmpty(userId)) {
    return false;
  }
  return true;
}

export const clearToken = () => {
  /* Clears all cookie other than email and pwd. */
  const cookies = document.cookie;
  const cookieArray = cookies.split('; ');
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    var newDate = new Date();
    var currentDate = new Date();
    newDate.setDate(currentDate.getDate() - 5);
    if (name !== 'pwd' || name !== 'email') {
      document.cookie = `${name}=${name}; expires=${newDate}; path=/`;
    }
  }
};
