import * as types from './types';

export const openGlobalModal = (modalValue) => ({ type: types.MODAL_OPEN, modalValue });

export const closeGlobalModal = () => ({
  type: types.MODAL_CLOSE
});
