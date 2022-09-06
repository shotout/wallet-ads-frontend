import { parseCookies, setCookie } from "nookies";

export const setAuthorizationCookie = (authorizationObj) => {
    const options = {
      maxAge: 200 * 24 * 60 * 60,
      path: '/',
    };
    setCookie(null, 'authorization', JSON.stringify(authorizationObj), options);
};


export const getAuthorizationHeader = (ctx = null) => {
    let authCookie = null;
    if (ctx) {
      authCookie = parseCookies(ctx).authorization;
    } else {
      authCookie = parseCookies({}).authorization;
    }
    if (authCookie) {
      const final = JSON.parse(authCookie);
      return {
        Authorization: `Bearer ${final.token}`
      };
    }
    return {};
};

export const getUserData = () => {
  const cookie = parseCookies().authorization;
  return JSON.parse(cookie);
};