import { createSlice } from '@reduxjs/toolkit';
import { makeId } from '../../utils/general';
import { reduxKey } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  appSession: ''
};


const slice = createSlice({
  name: reduxKey.appSession,
  initialState,
  reducers: {
    // Set local app session
    setAppSession(state, action) {
      state.appSession = action.payload.appSession;
    },
  }
});

export default slice.reducer;

export function createAppSession() {
  return (dispatch) => {
    const randomId = makeId();
    dispatch(slice.actions.setAppSession({ appSession: randomId }));
  }
}
