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
    },
});

export const {
    applyJobStart,
    applyJobSuccess,
    applyJobFailed,
    getAllApplyJobsRecruiterFailed,
    getAllApplyJobsRecruiterSuccess,
    getAllApplyJobsRecruiterStart,
} = recruimentSlice.actions;

export default recruimentSlice.reducer;
