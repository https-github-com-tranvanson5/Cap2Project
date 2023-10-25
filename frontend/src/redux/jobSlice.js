import { createSlice } from '@reduxjs/toolkit';

const allJobSlice = createSlice({
    name: 'allJob',
    initialState: {
        jobs: {
            allJobs: null,
            isFetching: false,
            error: false,
            job: null,
        },
        postJob: {
            isFetching: false,
            error: false,
            success: false,
        },
        career: {
            careerCurrent: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        //all job
        getAllJobsStart: (state) => {
            state.jobs.isFetching = true;
        },
        getAllJobsSuccess: (state, action) => {
            state.jobs.isFetching = false;
            state.jobs.allJobs = action.payload;
        },
        getAllJobsFailed: (state) => {
            state.jobs.isFetching = false;
            state.jobs.error = true;
        },
        //job
        getJobStart: (state) => {
            state.jobs.isFetching = true;
        },
        getJobSuccess: (state, action) => {
            state.jobs.isFetching = false;
            state.jobs.job = action.payload;
        },
        getJobFailed: (state) => {
            state.jobs.isFetching = false;
            state.jobs.error = true;
        },
        // career
        getCareerStart: (state) => {
            state.career.isFetching = true;
        },
        getCareerSuccess: (state, action) => {
            state.career.isFetching = false;
            state.career.careerCurrent = action.payload;
        },
        getCareerFailed: (state) => {
            state.career.isFetching = false;
            state.career.error = true;
        },
        //post job
        postJobStart: (state) => {
            state.postJob.isFetching = true;
        },
        postJobSuccess: (state) => {
            state.postJob.isFetching = false;
            state.postJob.error = false;
            state.postJob.success = true;
        },
        postJobFailed: (state) => {
            state.postJob.isFetching = false;
            state.postJob.error = true;
            state.postJob.success = false;
        },
        //deletejob
        deleteAllJobStart: (state) => {
            state.jobs.isFetching = true;
        },
        deleteAllJobsSuccess: (state, action) => {
            state.jobs.isFetching = false;
            state.msg = action.payload;
        },
        deleteAllJobFailed: (state, action) => {
            state.jobs.isFetching = false;
            state.jobs.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllJobsStart,
    getAllJobsSuccess,
    getAllJobsFailed,
    getJobStart,
    getJobSuccess,
    getJobFailed,
    postJobStart,
    postJobSuccess,
    postJobFailed,
    deleteAllJobStart,
    deleteAllJobsSuccess,
    deleteAllJobFailed,
    getCareerStart,
    getCareerSuccess,
    getCareerFailed,
} = allJobSlice.actions;

export default allJobSlice.reducer;