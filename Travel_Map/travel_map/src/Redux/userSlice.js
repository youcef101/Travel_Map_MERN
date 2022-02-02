import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isFetching: false,
    errors: false,
    current_user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        LOGIN_START: (state) => {
            state.isFetching = true;
            state.errors = false;

        },
        LOGIN_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.errors = false;
            state.current_user = action.payload
        },
        LOGIN_FAILURE: (state) => {
            state.isFetching = false;
            state.errors = true;

        },
        LOGOUT_START: (state) => {
            state.errors = false;
            state.isFetching = true;

        },
        LOGOUT_SUCCESS: (state) => {
            state.current_user = null;
            state.errors = false;
            state.isFetching = false;
        },
        LOGOUT_FAILURE: (state) => {
            state.errors = true;
            state.isFetching = false;
        },
    }
});


export const {
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS
} = userSlice.actions
export default userSlice.reducer