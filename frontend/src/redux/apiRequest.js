import axios from 'axios';
import {
    //thoong ke theo 12 thang
    getUsersByMonthStart,
    getUsersByMonthSuccess,
    getUsersByMonthFailed,

    // get year min max
    getYearMinMaxStart,
    getYearMinMaxSuccess,
    getYearMinMaxFailed,

    // count user
    getCountAllUserStart,
    getCountAllUserSuccess,
    getCountAllUserFailed,
    getCountAllUserStatusStart,
    getCountAllUserStatusSuccess,
    getCountAllUserStatusFailed,

    // count user year
    getCountUserYearStart,
    getCountUserYearSuccess,
    getCountUserYearFailed,

    // count user role
    countUserRoleStart,
    countUserRoleSuccess,
    countUserRoleFailed,

} from './statisticalSlice';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import {
    getProfileFailed,
    getProfileStart,
    getProfileSuccess,
    getUpdateProfileUsersFailed,
    getUpdateProfileUsersStart,
    getUpdateProfileUsersSuccess,
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
    getJobRecruiterFailed,
    getJobRecruiterStart,
    getJobRecruiterSuccess,
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
    getchangeStatusFailed,
    getchangeStatusStart,
    getchangeStatusSuccess,
} from './recruimentSlice';
import {
    getAllCalwJobsSuccess,
    getAllCawlJobsFailed,
    getAllCawlJobsStart,
} from './calwSlice';

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
    dispatch(getProfileStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/user/getProfileUser',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getProfileSuccess(res.data));
    } catch (err) {
        dispatch(getProfileFailed());
    }
};

export const editProfile = async (jwt, dispatch, profile) => {
    dispatch(getUpdateProfileUsersStart());
    try {
        await axios.put(
            'http://localhost:8080/api/user/updateProfile',
            profile,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getUpdateProfileUsersSuccess());
    } catch (err) {
        dispatch(getUpdateProfileUsersFailed());
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

export const getAllJobs = async (jwt, dispatch, query, setData) => {
    dispatch(getAllJobsStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/user/job/getAllDataListJobBySearch?search=${query}&searchAddress=&jobEducation=&jobExperience=&jobPosition=&jobType&career=&salary=`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getAllJobsSuccess(setData(res.data)));
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

export const getJobRecruiter = async (jwt, id, dispatch) => {
    dispatch(getJobRecruiterStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/pm/job/getDataJobById?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getJobRecruiterSuccess(res.data));
    } catch (err) {
        dispatch(getJobRecruiterFailed(err.response.data));
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

export const changeStatus = async (jwt, dispatch, status, id, data) => {
    dispatch(getchangeStatusStart());
    try {
        await axios.put(
            `http://localhost:8080/api/pm/applyjob/changeStatus?id=${id}&status=${status}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getchangeStatusSuccess());
    } catch (err) {
        dispatch(getchangeStatusFailed());
    }
};

export const getAllCalwData = async (
    dispatch,
    itemsPerPage,
    currentPage,
    setData,
) => {
    dispatch(getAllCawlJobsStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/user/job/WebCrawler/getData?size=${itemsPerPage}&page=${currentPage}`,
        );
        dispatch(getAllCalwJobsSuccess(setData(res.data)));
    } catch (err) {
        dispatch(getAllCawlJobsFailed());
    }
};

// {Thong ke
export const countUserByMonth = async (jwt, dispatch, year, status) => {
    dispatch(getUsersByMonthStart());

    try {
        const response = await axios.get(
            `http://localhost:8080/api/admin/countUserMonth?year=${year}&status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            dispatch(getUsersByMonthSuccess(response.data)); // Dispatch action with fetched data
            return response.data;
        } else {
            const errorMessage =
                response.data?.message || 'Error fetching data';
            dispatch(getUsersByMonthFailed(errorMessage));
            console.error(errorMessage); // Log the error message
        }
    } catch (err) {
        // Extract the error message from err.response
        const errorMessage =
            err.response?.data?.message || 'Error fetching data';
        dispatch(getUsersByMonthFailed(errorMessage));
        console.error(errorMessage); // Log the error message
    }
};

export const getYearUserMinMax = async (jwt, dispatch) => {
    dispatch(getYearMinMaxStart());

    try {
        const response = await axios.get(
            `http://localhost:8080/api/admin/getMinMaxYear`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            dispatch(getYearMinMaxSuccess(response.data)); // Dispatch action with fetched data
            return response.data;
        } else {
            const errorMessage =
                response.data?.message || 'Error fetching data';
            dispatch(getYearMinMaxFailed(errorMessage));
            console.error(errorMessage); // Log the error message
        }
    } catch (err) {
        // Extract the error message from err.response
        const errorMessage =
            err.response?.data?.message || 'Error fetching data';
        dispatch(getYearMinMaxFailed(errorMessage));
        console.error(errorMessage); // Log the error message
    }
};

export const getCountAllUser = async (jwt, dispatch) => {
    dispatch(getCountAllUserStart());

    try {
        const response = await axios.get(
            `http://localhost:8080/api/admin/countUser`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            dispatch(getCountAllUserSuccess(response.data)); // Dispatch action with fetched data
            return response.data;
        } else {
            const errorMessage =
                response.data?.message || 'Error fetching data';
            dispatch(getCountAllUserFailed(errorMessage));
            console.error(errorMessage); // Log the error message
        }
    } catch (err) {
        // Extract the error message from err.response
        const errorMessage =
            err.response?.data?.message || 'Error fetching data';
        dispatch(getCountAllUserFailed(errorMessage));
        console.error(errorMessage); // Log the error message
    }
};

export const getCountAllStatusUser = async (jwt, dispatch, status) => {
    dispatch(getCountAllUserStart());

    try {
        const response = await axios.get(
            `http://localhost:8080/api/admin/countUserStatus?status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            dispatch(getCountAllUserStatusSuccess(response.data)); // Dispatch action with fetched data
            return response.data;
        } else {
            const errorMessage =
                response.data?.message || 'Error fetching data';
            dispatch(getCountAllUserStatusSuccess(errorMessage));
            console.error(errorMessage); // Log the error message
        }
    } catch (err) {
        // Extract the error message from err.response
        const errorMessage =
            err.response?.data?.message || 'Error fetching data';
        dispatch(getCountAllUserStatusFailed(errorMessage));
        console.error(errorMessage); // Log the error message
    }
};

export const getcountUserYear = async (jwt, dispatch, status) => {
    dispatch(getCountUserYearStart());

    try {
        const response = await axios.get(
            `http://localhost:8080/api/admin/countUserByYear?status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            dispatch(getCountUserYearSuccess(response.data)); // Dispatch action with fetched data
            return response.data;
        } else {
            const errorMessage =
                response.data?.message || 'Error fetching data';
            dispatch( getCountUserYearFailed(errorMessage));
            console.error(errorMessage); // Log the error message
        }
    } catch (err) {
        // Extract the error message from err.response
        const errorMessage =
            err.response?.data?.message || 'Error fetching data';
        dispatch( getCountUserYearFailed(errorMessage));
        console.error(errorMessage); // Log the error message
    }
  };

  export const getCountRole = async (jwt, dispatch, role,status,year) => {
    dispatch(countUserRoleStart());

    try {
        const response = await axios.get(
            `http://localhost:8080/api/admin/countRole?role=${role}&status=${status}&year=${year}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        // Check if the response status is successful (2xx)
        if (response.status >= 200 && response.status < 300) {
            dispatch(countUserRoleSuccess(response.data)); // Dispatch action with fetched data
            console.log(response.data)
            return response.data;
        } else {
            const errorMessage =
                response.data?.message || 'Error fetching data';
            dispatch( countUserRoleFailed(errorMessage));
            console.error(errorMessage); // Log the error message
        }
    } catch (err) {
        // Extract the error message from err.response
        const errorMessage =
            err.response?.data?.message || 'Error fetching data';
        dispatch( countUserRoleFailed(errorMessage));
        console.error(errorMessage); // Log the error message
    }
  };
  

// Thong ke}
