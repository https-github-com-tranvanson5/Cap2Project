import { createSlice } from "@reduxjs/toolkit";

const allJobSlice = createSlice({
    name:"allJob",
    initialState:{
        jobs: {
            allJobs:null,
            isFetching:false,
            error:false
        },
        msg:"",
    },
    reducers:{
        getAllJobsStart: (state)=>{
            state.jobs.isFetching = true;
        },
        getAllJobsSuccess: (state,action) =>{
            state.jobs.isFetching = false;
            state.jobs.allJobs = action.payload;
        },
        getAllJobsFailed: (state) => {
            state.jobs.isFetching = false;
            state.jobs.error = true;
        },
        deleteAllJobStart: (state)=>{
            state.jobs.isFetching = true;
        },
        deleteAllJobsSuccess: (state,action)=>{
            state.jobs.isFetching = false;
            state.msg = action.payload;
        },
        deleteAllJobFailed: (state,action)=>{
            state.jobs.isFetching = false;
            state.jobs.error = true;
            state.msg = action.payload;
        } 
    }
})

export const {
    getAllJobsStart,
    getAllJobsSuccess,
    getAllJobsFailed,
    deleteAllJobStart,
    deleteAllJobsSuccess,
    deleteAllJobFailed
} = allJobSlice.actions;

export default allJobSlice.reducer;