import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    deleteUserFailed,
    deleteUsersSuccess,
    deleteUserStart,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
} from './userSlice';
//npm install axios

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            'http://localhost:8080/api/auth/signin',
            user,
        );
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:8080/api/auth/signup', user);
        dispatch(registerSuccess());
        navigate('/');
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (jwt, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/userManager/getDataListUser',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(
            'http://localhost:8080/api/userManager/getDataListUser/' + id,
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        );
        dispatch(deleteUsersSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailed(err.response.data));
    }
};

export const logOut = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
        window.localStorage.clear();
        dispatch(logOutSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(logOutFailed());
    }
};
