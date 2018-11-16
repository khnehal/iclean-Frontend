// Cookie expire date these many date from today for saving pwd and email
export const COOKIE_EXPIRE_DAYS = 5;

// Session expiry for the tokens and user id
export const SESSION_EXPIRE_DAYS = 1;

// BE URL
export const BACKEND_URL = 'http://fd60d0d9.ngrok.io';

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
