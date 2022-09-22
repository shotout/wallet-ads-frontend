import axios from './axios';

export const verifyAccount = (token, ctx) => axios({
  url: `/auth/verify/${token}`,
  method: 'GET',
  ctx
});

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
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

export const handleAddCampaign = (data) => axios({
  url: '/campaigns',
  method: 'POST',
  data,
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

export const handleEditCampaign = (data, id) => axios({
  url: `/campaigns/${id}`,
  method: 'PATCH',
  data,
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

export const getCampaignItem = (ctx) => axios({
  url: '/campaigns',
  method: 'GET',
  ctx
});

export const getProfilUser = (ctx) => axios({
  url: '/user',
  method: 'GET',
  ctx
});

export const getCampaignDetail = (ctx, id) => axios({
  url: `/campaigns/${id}`,
  method: 'GET',
  ctx
});

export const handlePayment = (data) => axios({
  url: '/pay/charges',
  method: 'POST',
  data,
});

export const createSession = (data) => axios({
  url: '/pay/intent',
  method: 'POST',
  data,
});

export const payCyrptoCurrency = (data) => axios({
  url: '/pay/method',
  method: 'POST',
  data,
});

export const getInvoicesList = (ctx = null) => axios({
  url: `/invoices`,
  method: 'GET',
  ctx
});