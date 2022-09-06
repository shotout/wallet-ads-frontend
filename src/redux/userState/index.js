import * as types from './types';

const initialState = {
  modalLogout: {
    isOpen: false,
    title: null,
    subtitle: null,
    typeUser: null
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_LOGOUT_OPEN:
      return {
        ...state,
        modalLogout: {
          isOpen: true,
          title: action.payload.title,
          subtitle: action.payload.subtitle,
          typeUser: action.payload.typeUser
        }
      };
    case types.MODAL_LOGOUT_CLOSE:
      return {
        ...state,
        modalLogout: {
          isOpen: false,
          title: null,
          subtitle: null,
          typeUser: null
        }
      };
    default:
      return state;
  }
}

export default reducer;
