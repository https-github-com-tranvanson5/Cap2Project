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
        jobsRecruiter: {
            allJobsRecruiter: null,
            isFetching: false,
            error: false,
            jobRecruiter: null,
        },
        postJob: {
            isFetching: false,
            error: false,
            success: false,
        },
        editJob: {
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
        //all job recruiter
        getAllJobsRecruiterStart: (state) => {
            state.jobsRecruiter.isFetching = true;
        },
        getAllJobsRecruiterSuccess: (state, action) => {
            state.jobsRecruiter.isFetching = false;
            state.jobsRecruiter.allJobsRecruiter = action.payload;
        },
        getAllJobsRecruiterFailed: (state) => {
            state.jobsRecruiter.isFetching = false;
            state.jobsRecruiter.error = true;
        },
        // get job for recruiter
        getJobRecruiterStart: (state) => {
            state.jobsRecruiter.isFetching = true;
        },
        getJobRecruiterSuccess: (state, action) => {
            state.jobsRecruiter.isFetching = false;
            state.jobsRecruiter.jobRecruiter = action.payload;
        },
        getJobRecruiterFailed: (state) => {
            state.jobsRecruiter.isFetching = false;
            state.jobsRecruiter.error = true;
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
        // edit job
        editJobStart: (state) => {
            state.editJob.isFetching = true;
        },
        editJobSuccess: (state) => {
            state.editJob.isFetching = false;
            state.editJob.error = false;
            state.editJob.success = true;
        },
        editJobFailed: (state) => {
            state.editJob.isFetching = false;
            state.editJob.error = true;
            state.editJob.success = false;
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
    //All job for all roles
    getAllJobsStart,
    getAllJobsSuccess,
    getAllJobsFailed,
    //detail job
    getJobStart,
    getJobSuccess,
    getJobFailed,
    //All job for recruiter
    getAllJobsRecruiterStart,
    getAllJobsRecruiterSuccess,
    getAllJobsRecruiterFailed,
    //detail job
    getJobRecruiterStart,
    getJobRecruiterSuccess,
    getJobRecruiterFailed,
    //post job
    postJobStart,
    postJobSuccess,
    postJobFailed,
    //edit job
    editJobStart,
    editJobSuccess,
    editJobFailed,
    //delete job
    deleteAllJobStart,
    deleteAllJobsSuccess,
    deleteAllJobFailed,
    //
    getCareerStart,
    getCareerSuccess,
    getCareerFailed,
} = allJobSlice.actions;

export default allJobSlice.reducer;
