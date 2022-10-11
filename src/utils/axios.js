import axios from 'axios';
import { getAuthorizationHeader } from '../helpers/auth';

const url = process.env.API_URL;

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  /**
   * Create an Axios Client with defaults
   */
  const requestHeaders = options.customHeaders || {
    'Content-type': 'application/json',
  };

  const additionalHeaders = options.headers || {};
  const authorizationHeader = getAuthorizationHeader(options.ctx);

  const client = axios.create({
    baseURL: options.MAIN_URL || url,
    headers: {
      ...requestHeaders,
      ...authorizationHeader,
      ...additionalHeaders,
    },
  });
  // eslint-disable-next-line arrow-body-style
  const onSuccess = (response) => {
    // console.debug('Request Successful!', response);
    return response.data;
  };

  const onError = (error) => {
    console.log('Request Failed:', url);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      // console.log('Status:', error.response.status);
      // console.log('Data:', error.response.data);
      // console.log('Headers:', error.response.headers);
      if (error.response.status === 401) {
        //   setTimeout(() => {
        //     Actions.reset('login');
        //     store.dispatch(clearSession());
        //   }, 200);
      }
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
