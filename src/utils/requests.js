import moment from 'moment';
import axios from './axios';

export const savePaymentCC = (data) =>
  axios({
    url: '/payment',
    method: 'POST',
    data,
  });

export const updatePaymentCC = (data) =>
  axios({
    url: '/payment/update',
    method: 'POST',
    data,
  });

export const getPaymentCC = () =>
  axios({
    url: '/payment/add-card',
    method: 'GET',
  });

export const checkPaymentType = () =>
  axios({
    url: '/payment/get-payment-type',
    method: 'GET',
  });

export const getPaymentDetails = () =>
  axios({
    url: '/payment/retrive-card',
    method: 'GET',
  });

export const verifyAccount = (token, ctx) =>
  axios({
    url: `/auth/verify/${token}`,
    method: 'GET',
    ctx,
  });

export const requestLogin = (data) =>
  axios({
    url: '/auth/login',
    method: 'POST',
    data,
  });

export const requestRegister = (data) =>
  axios({
    url: '/auth/register',
    method: 'POST',
    data,
  });

export const requestResetPassword = (data) =>
  axios({
    url: '/auth/check-email',
    method: 'POST',
    data,
  });

export const requestCheckToken = (data) =>
  axios({
    url: '/auth/check-token',
    method: 'POST',
    data,
  });

export const handleResetPassword = (data) =>
  axios({
    url: '/auth/reset-password',
    method: 'POST',
    data,
  });

export const handleUpdateProfile = (data) =>
  axios({
    url: '/user',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const handleUpdatePassword = (data) =>
  axios({
    url: '/auth/change-password',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const handleAddCampaign = (data) =>
  axios({
    url: '/campaigns',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const handleEditCampaign = (data, id) =>
  axios({
    url: `/campaigns/update/${id}`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getCampaignItem = (ctx, page) =>
  axios({
    url: `/campaigns?page=${page}`,
    method: 'GET',
    ctx,
  });

export const getListCampaignItem = (ctx, page) =>
  axios({
    url: `/dashboard/campaigns?page=${page}`,
    method: 'GET',
    ctx,
  });

export const getProfilUser = (ctx) =>
  axios({
    url: '/user',
    method: 'GET',
    ctx,
  });

export const getCampaignDetail = (ctx, id) =>
  axios({
    url: `/campaigns/${id}`,
    method: 'GET',
    ctx,
  });

export const handlePayment = (data) =>
  axios({
    url: '/pay/charges',
    method: 'POST',
    data,
  });

export const createSession = (data) =>
  axios({
    url: '/pay/intent',
    method: 'POST',
    data,
  });

export const payCyrptoCurrency = (data) =>
  axios({
    url: '/pay/method',
    method: 'POST',
    data,
  });

export const getInvoicesList = (ctx = null) =>
  axios({
    url: `/invoices`,
    method: 'GET',
    ctx,
  });

export const handleSubmitPromo = (data) =>
  axios({
    url: '/user/voucher',
    method: 'POST',
    data,
  });

export const cancelStripe = (data) =>
  axios({
    url: '/payment/cancelstripe',
    method: 'POST',
    data,
  });

export const handleSubscribe = (data) =>
  axios({
    url: '/user/subscribe',
    method: 'POST',
    data,
  });

export const getListCampaign = (ctx) =>
  axios({
    url: `/dashboard/list-campaign`,
    method: 'GET',
    ctx,
  });

export const getAudienceByCampaignID = (id) =>
  axios({
    url: `/dashboard/audiences/${id}`,
    method: 'GET',
  });

export const exportAudienceByCampaignID = (data) =>
  axios({
    url: `/dashboard/export-audiences/${data.campaignID}`,
    method: 'GET',
    responseType: 'blob',
  }).then((res) => {
    const url = URL.createObjectURL(new Blob([res]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${moment(new Date()).format('YYYYMMDD')}_WALLETADS_${data.campaignName}.xls`);
    document.body.appendChild(link);
    link.click();
  });
