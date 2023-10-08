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
import {
    deleteAllUserFailed,
    deleteAllUsersSuccess,
    deleteAllUserStart,
    getAllUsersFailed,
    getAllUsersStart,
    getAllUsersSuccess,
} from './allUserSlice';
//npm install axios

export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            'http://localhost:8080/api/auth/signin',
            user,
        );
        dispatch(loginSuccess(res.data));
        getProfileUser(res.data.jwt, dispatch);
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

export const getProfileUser = async (jwt, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/user/getProfileUser',
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

export const getAllUsers = async (jwt, dispatch) => {
    dispatch(getAllUsersStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/admin/getAllUserBySearch?search&column&sort',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getAllUsersSuccess(res.data));
    } catch (err) {
        dispatch(getAllUsersFailed());
    }
};

export const deleteUser = async (jwt, dispatch, id,) => {
    dispatch(deleteAllUserStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/admin/changeStatus?id=${id}&status=DELETE`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        console.log(res);
        dispatch(deleteAllUsersSuccess(res.data));
    } catch (err) {
        dispatch(deleteAllUserFailed(err.response.data));
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
