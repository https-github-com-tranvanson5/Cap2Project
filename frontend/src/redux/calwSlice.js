import { createSlice } from '@reduxjs/toolkit';

const calwSlice = createSlice({
    name: 'calw',
    initialState: {
        jobs: {
            allJobs: null,
            isFetching: false,
            error: false,
            job: null,
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
        getAllCawlJobsStart: (state) => {
            state.jobs.isFetching = true;
        },
        getAllCalwJobsSuccess: (state, action) => {
            state.jobs.isFetching = false;
            state.jobs.allJobs = action.payload;
        },
        getAllCawlJobsFailed: (state) => {
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
    },
});

export const {
    //All job for all roles
    getAllCawlJobsStart,
    getAllCalwJobsSuccess,
    getAllCawlJobsFailed,
    //detail job
    getJobStart,
    getJobSuccess,
    getJobFailed,
    getCareerStart,
    getCareerSuccess,
    getCareerFailed,
} = calwSlice.actions;

export default calwSlice.reducer;
