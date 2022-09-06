import axios from './axios';

export const activateNewsLetter = (params) => axios({
  url: 'api/v1/subscribers/activation',
  method: 'POST',
  params
});