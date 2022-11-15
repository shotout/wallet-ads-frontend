import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies';

export const setConsentCookie = (consentObj) => {
  const options = {
    maxAge: 200 * 24 * 60 * 60,
    path: '/',
  };
  setCookie(null, 'siteSetting', JSON.stringify(consentObj), options);
};

export const getConsentCookie = (ctx) => {
  let siteCookie = null;
  if (ctx) {
    siteCookie = nookies.get(ctx).siteSetting;
  } else {
    siteCookie = parseCookies({}).siteSetting;
  }
  if (siteCookie) {
    return JSON.parse(siteCookie);
  }
  return null;
};

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
    authCookie = nookies.get(ctx).authorization;
  } else {
    authCookie = parseCookies({}).authorization;
  }
  if (authCookie) {
    const final = JSON.parse(authCookie);
    return {
      Authorization: `Bearer ${final.token}`,
    };
  }
  return null;
};

export const getUserData = (ctx) => {
  let authCookie = null;
  if (ctx) {
    authCookie = nookies.get(ctx).authorization;
  } else {
    authCookie = parseCookies({}).authorization;
  }
  if (authCookie) {
    return JSON.parse(authCookie);
  }
  return null;
};

export const handleLogout = () => {
  destroyCookie(null, 'authorization', { path: '/' });
  window.location.href = '/';
};
