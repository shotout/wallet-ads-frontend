import * as types from './types';

export const openLogoutModal = (payload) => ({ type: types.MODAL_LOGOUT_OPEN, payload });

export const closeLogoutModal = () => ({
  type: types.MODAL_LOGOUT_CLOSE
});
