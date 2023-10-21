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
    deleteAllJobStart,
    deleteAllJobsSuccess,
    deleteAllJobFailed,
} = allJobSlice.actions;

export default allJobSlice.reducer;
