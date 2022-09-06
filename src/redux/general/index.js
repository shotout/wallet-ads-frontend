import * as types from './types';

const initialState = {
  globalModal: {
    isOpen: false,
    modalValue: {
      title: '',
      subtitle: '',
      modalType: 'success',
      onClose: () => {},
    }
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_OPEN:
      return {
        ...state,
        globalModal: {
          ...state.globalModal,
          isOpen: true,
          modalValue: action.modalValue
        }
      };
    case types.MODAL_CLOSE:
      return {
        ...state,
        globalModal: {
          ...state.globalModal,
          isOpen: false,
          modalValue: initialState.globalModal.modalValue
        }
      };
    default:
      return state;
  }
}

export default reducer;
