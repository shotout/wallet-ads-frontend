import { createSlice } from '@reduxjs/toolkit';
import { reduxKey } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
    alertSnackbar: {
        visible: false,
        message: '',
        alertType: 'success'
    }
};


const slice = createSlice({
    name: reduxKey.appTools,
    initialState,
    reducers: {
        // Set local app session
        openAlertSnackbar(state, action) {
            state.alertSnackbar.visible = true;
            state.alertSnackbar.message = action.payload.message;
            state.alertSnackbar.alertType = action.payload.alertType;
        },
        closeAlertSnackbar(state) {
            state.alertSnackbar = { ...initialState.alertSnackbar, alertType: state.alertSnackbar.alertType }
        }
    }
});

export default slice.reducer;

export function openAlert(options = { message: '', alertType: 'success' }) {
    return (dispatch) => {
        dispatch(slice.actions.openAlertSnackbar({ 
            message: options.message, 
            alertType: options.alertType 
        }));
    }
}

export function closeAlert() {
    return (dispatch) => {
        dispatch(slice.actions.closeAlertSnackbar());
    }
}
