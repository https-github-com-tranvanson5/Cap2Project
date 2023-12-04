import axios from 'axios';
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
    deleteJobRecruiterFailed,
    deleteJobRecruiterStart,
    deleteJobRecruiterSuccess,
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
import { editCvFailed, editCvStart, editCvSuccess, getCvDetailFailed, getCvDetailStart, getCvDetailSuccess, getCvFailed, getCvStart, getCvSuccess, postCvFailed, postCvStart, postCvSuccess } from './cvDataSlice';

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

export const deleteUser = async (jwt, dispatch, id , status) => {
    dispatch(deleteAllUserStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/admin/changeStatus?id=${id}&status=${status}`,
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

export const getAllJobs = async (
    jwt,
    dispatch,
    query,
    searchAddress,
    jobEducation,
    jobExperience,
    jobPosition,  
    jobType,
    setData,
    
) => {
    dispatch(getAllJobsStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/user/job/getAllDataListJobBySearch?search=${query}&searchAddress=${searchAddress}&jobEducation=${jobEducation}&jobExperience=${jobExperience}&jobPosition=${jobPosition}&jobType=${jobType}&career=&salary=`,
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

export const deleteJobRecruiter = async (jwt, dispatch, id , status) => {
    dispatch(deleteJobRecruiterStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/pm/job/changeStatusJob?id=${id}&jobStatus=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        console.log(res);
        dispatch(deleteJobRecruiterSuccess(res.data));
    } catch (err) {
        dispatch(deleteJobRecruiterFailed(err.response.data));
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

export const postCv = async (cv, jwt, dispatch) => {
    dispatch(postCvStart());
    try {
        await axios.post('http://localhost:8080/api/user/cv/createCv', cv, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch(postCvSuccess());
    } catch (err) {
        dispatch(postCvFailed());
    }
};
export const getCv = async (jwt, dispatch) => {
    dispatch(getCvStart());
    try {
        const res = await axios.get(
            'http://localhost:8080/api/user/cv/getAllCv',
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getCvSuccess(res.data));
    } catch (err) {
        dispatch(getCvFailed());
    }
};

export const cvDetail = async (jwt, id, dispatch) => {
    dispatch(getCvDetailStart());
    try {
        const res = await axios.get(
            `http://localhost:8080/api/user/cv/getById?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
        dispatch(getCvDetailSuccess(res.data));
    } catch (err) {
        dispatch(getCvDetailFailed(err.response.data));
    }
};

export const editCv = async (cv, jwt, dispatch) => {
    dispatch(editCvStart());
    try {
        await axios.put('http://localhost:8080/api/user/cv/updateCv', cv, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch(editCvSuccess());
    } catch (err) {
        dispatch(editCvFailed());
    }
};