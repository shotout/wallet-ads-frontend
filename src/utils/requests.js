import axios from './axios';

export const requestLogin = (data) => axios({
  url: '/auth/login',
  method: 'POST',
  data
});

export const requestRegister = (data) => axios({
  url: '/auth/register',
  method: 'POST',
  data
});

export const handleUpdateProfile = (data) => axios({
  url: '/user',
  method: 'POST',
  data,
});

export const handleAddCampaign = (data) => axios({
  url: '/campaigns',
  method: 'POST',
  data,
});

export const getCampaignItem = (ctx) => axios({
  url: '/campaigns',
  method: 'GET',
  ctx
});