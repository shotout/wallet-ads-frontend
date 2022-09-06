import { createSlice } from '@reduxjs/toolkit';
import { reduxKey } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
    modalAlert: {
        visible: false,
        message: '',
        description: '',
    }
};


const slice = createSlice({
    name: reduxKey.appTools,
    initialState,
    reducers: {
        // Set local app session
        openModalAlert(state, action) {
            state.modalAlert.visible = true;
            state.modalAlert.message = action.payload.message;
            state.modalAlert.description = action.payload.description;
        },
        closeModalAlert(state) {
            state.modalAlert = { ...initialState.modalAlert }
        }
    }
});

export default slice.reducer;

export function openAlert(options = { message: '', description: null }) {
    return (dispatch) => {
        dispatch(slice.actions.openModalAlert({ 
            message: options.message, 
            description: options.description 
        }));
    }
}

export function closeAlert() {
    return (dispatch) => {
        dispatch(slice.actions.closeModalAlert());
    }
}
