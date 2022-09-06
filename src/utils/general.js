import { v4 as uuidv4 } from 'uuid';

export const makeId = () => uuidv4();

export const parseCookieIntoAuth = (authCookie) => ({
  access_token: authCookie.access_token,
  refresh_token: authCookie.refresh_token,
});
