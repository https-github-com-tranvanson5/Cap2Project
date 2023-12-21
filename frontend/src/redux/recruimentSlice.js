import { createSlice } from '@reduxjs/toolkit';

const recruimentSlice = createSlice({
    name: 'recruitment',
    initialState: {
        applyJob: {
            applyJob: null,
            isFetching: false,
            error: false,
            msg: '',
        },
        applyJobsRecruiter: {
            allApllyJobsRecruiter: null,
            isFetching: false,
            error: false,
            msg: '',
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
            msg: '',
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
        applyJobFailed: (state , action) => {
            state.applyJob.isFetching = false;
            state.applyJob.error = true;
            // state.applyJob.success = false;
            state.applyJob.msg = action.payload
        },
        //recruiter get apply job
        getAllApplyJobsRecruiterStart: (state) => {
            state.applyJobsRecruiter.isFetching = true;
        },
        getAllApplyJobsRecruiterSuccess: (state, action) => {
            state.applyJobsRecruiter.isFetching = false;
            state.applyJobsRecruiter.allApllyJobsRecruiter = action.payload;
        },
        getAllApplyJobsRecruiterFailed: (state , action) => {
            state.applyJobsRecruiter.isFetching = false;
            state.applyJobsRecruiter.error = true;
            state.applyJobsRecruiter.msg = action.payload;
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
            state.changeStatusApplyJob.msg = action.payload;
            // console.log('state.changeStatusApplyJob.msg', state.changeStatusApplyJob.msg)
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
