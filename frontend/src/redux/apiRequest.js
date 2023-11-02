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
import {
    editJobFailed,
    editJobStart,
    editJobSuccess,
    getAllJobsFailed,
    getAllJobsRecruiterFailed,
    getAllJobsRecruiterStart,
    getAllJobsRecruiterSuccess,
    getAllJobsStart,
    getAllJobsSuccess,
    getCareerFailed,
    getCareerStart,
    getCareerSuccess,
    getJobFailed,
    getJobStart,
    getJobSuccess,
    postJobFailed,
    postJobStart,
    postJobSuccess,
} from './jobSlice';
import {
    applyJobFailed,
    applyJobStart,
    applyJobSuccess,
    getAllApplyJobsCandidateFailed,
    getAllApplyJobsCandidateSuccess,
    getAllApplyJobsRecruiterFailed,
    getAllApplyJobsRecruiterStart,
    getAllApplyJobsRecruiterSuccess,
} from './recruimentSlice';
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
            'http://localhost:8080/api/admin/getDataUser',
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

export const deleteUser = async (jwt, dispatch, id) => {
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

export const getAllJobs = async (jwt, dispatch) => {
    dispatch(getAllJobsStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/user/job/getAllDataListJobBySearch',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getAllJobsSuccess(res.data));
    } catch (err) {
        dispatch(getAllJobsFailed());
    }
};

export const getAllJobsRecruiter = async (jwt, dispatch) => {
    dispatch(getAllJobsRecruiterStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/pm/job/getDataJob',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getAllJobsRecruiterSuccess(res.data));
    } catch (err) {
        dispatch(getAllJobsRecruiterFailed());
    }
};

export const getJob = async (dispatch, id) => {
    dispatch(getJobStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/user/job/getJobById?id=${id}`,
        );
        dispatch(getJobSuccess(res.data));
    } catch (err) {
        dispatch(getJobFailed(err.response.data));
    }
};

export const postJob = async (job, jwt, dispatch) => {
    dispatch(postJobStart());
    try {
        await axios.post('http://localhost:8080/api/pm/job/createJob', job, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch(postJobSuccess());
    } catch (err) {
        dispatch(postJobFailed());
    }
};

export const editJob = async (job, jwt, dispatch) => {
    dispatch(editJobStart());
    try {
        await axios.put('http://localhost:8080/api/pm/job/updateJob', job, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch(editJobSuccess());
    } catch (err) {
        dispatch(editJobFailed());
    }
};

export const getCareer = async (jwt, dispatch) => {
    dispatch(getCareerStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/pm/job/getCareerJob',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getCareerSuccess(res?.data));
    } catch (err) {
        dispatch(getCareerFailed());
    }
};

export const applyJob = async (job, jwt, dispatch) => {
    dispatch(applyJobStart());
    try {
        await axios.post('http://localhost:8080/api/user/applyjob/apply', job, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch(applyJobSuccess());
    } catch (err) {
        dispatch(applyJobFailed());
    }
};

export const getAllApplyJobsRecruiter = async (jwt, dispatch) => {
    dispatch(getAllApplyJobsRecruiterStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/pm/applyjob/getDataJobApplyJob',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getAllApplyJobsRecruiterSuccess(res.data));
    } catch (err) {
        dispatch(getAllApplyJobsRecruiterFailed());
    }
};

export const getAllApplyJobsCandidate = async (jwt, dispatch) => {
    dispatch(getAllApplyJobsRecruiterStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/user/applyjob/getDataJobApplyJob',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getAllApplyJobsCandidateSuccess(res.data));
    } catch (err) {
        dispatch(getAllApplyJobsCandidateFailed());
    }
};

