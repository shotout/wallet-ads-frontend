import { createSlice } from '@reduxjs/toolkit';
import { makeId } from '../../utils/general';
import { reduxKey } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  appAccessSignature: '',
  userProfile: null,
};


const slice = createSlice({
  name: reduxKey.userAccess,
  initialState,
  reducers: {
    // Set local app session
    setAppAccessSignature(state, action) {
      state.appAccessSignature = action.payload.appAccessSignature;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    }
  }
});

export default slice.reducer;

export function createAppAccessSignature() {
  return (dispatch) => {
    const randomId = makeId();
    dispatch(slice.actions.setAppAccessSignature({ appAccessSignature: randomId }));
  }
}

export function createUserProfile(payload) {
  return (dispatch) => {
    dispatch(slice.actions.setUserProfile(payload));
  }
}
