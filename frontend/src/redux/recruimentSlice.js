import { createSlice } from '@reduxjs/toolkit';

const recruimentSlice = createSlice({
    name: 'recruitment',
    initialState: {
        applyJob: {
            applyJob: null,
            isFetching: false,
            error: false,
        },
        applyJobsRecruiter: {
            allApllyJobsRecruiter: null,
            isFetching: false,
            error: false,
        },
        applyJobsCandidate: {
            allApllyJobsCandidate: null,
            isFetching: false,
            error: false,
        },
        changeStatusApplyJob: {
            changeStatus: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        //apply job
        applyJobStart: (state) => {
            state.applyJob.isFetching = true;
        },
        applyJobSuccess: (state) => {
            state.applyJob.isFetching = false;
            state.applyJob.error = false;
            state.applyJob.success = true;
        },
        applyJobFailed: (state) => {
            state.applyJob.isFetching = false;
            state.applyJob.error = true;
            state.applyJob.success = false;
        },
        //recruiter get apply job
        getAllApplyJobsRecruiterStart: (state) => {
            state.applyJobsRecruiter.isFetching = true;
        },
        getAllApplyJobsRecruiterSuccess: (state, action) => {
            state.applyJobsRecruiter.isFetching = false;
            state.applyJobsRecruiter.allApllyJobsRecruiter = action.payload;
        },
        getAllApplyJobsRecruiterFailed: (state) => {
            state.applyJobsRecruiter.isFetching = false;
            state.applyJobsRecruiter.error = true;
        },
        //change status apply job for recruiter
        getchangeStatusStart: (state)=>{
            state.changeStatusApplyJob.isFetching = true;
        },
        getchangeStatusSuccess: (state,action) =>{
            state.changeStatusApplyJob.isFetching = false;
            state.changeStatusApplyJob.changeStatus= action.payload;
        },
        getchangeStatusFailed: (state,action) => {
            state.changeStatusApplyJob.isFetching = false;
            state.changeStatusApplyJob.error = true;
            state.msg = action.payload;
        },
        //user geted apply job
        getAllApplyJobsCandidateStart: (state) => {
            state.applyJobsCandidate.isFetching = true;
        },
        getAllApplyJobsCandidateSuccess: (state, action) => {
            state.applyJobsCandidate.isFetching = false;
            state.applyJobsCandidate.allApllyJobsCandidate = action.payload;
        },
        getAllApplyJobsCandidateFailed: (state) => {
            state.applyJobsCandidate.isFetching = false;
            state.applyJobsCandidate.error = true;
        },
    },
});

export const {
    applyJobStart,
    applyJobSuccess,
    applyJobFailed,
    getAllApplyJobsRecruiterFailed,
    getAllApplyJobsRecruiterSuccess,
    getAllApplyJobsRecruiterStart,
    getchangeStatusStart,
    getchangeStatusSuccess,
    getchangeStatusFailed,
    getAllApplyJobsCandidateStart,
    getAllApplyJobsCandidateSuccess,
    getAllApplyJobsCandidateFailed,
} = recruimentSlice.actions;

export default recruimentSlice.reducer;
