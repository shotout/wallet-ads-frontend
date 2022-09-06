import axios from './axios';

export const requestLogin = (data, params) => axios({
  url: '/auth/login',
  method: 'POST',
  data
});

export const requestRegister = (data, params) => axios({
  url: '/auth/register',
  method: 'POST',
  data
});