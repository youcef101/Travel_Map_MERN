import axiosInstance from "../axios";
import {
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_START,
    LOGOUT_SUCCESS
} from './userSlice'

export const LoginCall = async (dispatch, user) => {
    dispatch(LOGIN_START())
    try {
        const res = await axiosInstance.post('/auth/login', user);
        const data = await res.data
        dispatch(LOGIN_SUCCESS(data))
    } catch (err) {
        dispatch(LOGIN_FAILURE())
    }
}
export const LogoutCall = async (dispatch) => {
    dispatch(LOGOUT_START())
    try {
        dispatch(LOGOUT_SUCCESS())
    } catch (err) {
        dispatch(LOGOUT_FAILURE())
    }

}
