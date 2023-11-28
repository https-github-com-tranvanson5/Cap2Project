import { createSlice } from '@reduxjs/toolkit';

const cvDataSlice = createSlice({
    name: 'cvData',
    initialState: {
        data: {
            cv: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        //get all cv
        getCvStart: (state) => {
            state.data.isFetching = true;
        },
        getCvSuccess: (state, action) => {
            state.data.isFetching = false;
            state.data.cv = action.payload;
        },
        getCvFailed: (state) => {
            state.data.isFetching = false;
            state.data.error = true;
        },
        //postcv
        postCvStart: (state) => {
            state.data.isFetching = true;
        },
        postCvSuccess: (state, action) => {
            state.data.isFetching = false;
            state.data.error = false;
            state.data.success = true;
        },
        postCvFailed: (state) => {
            state.data.isFetching = false;
            state.data.error = true;
            state.data.success = false;
        },
        //     getUpdateProfileUsersStart: (state)=>{
        //         state.data.isFetching = true;
        //     },
        //     getUpdateProfileUsersSuccess: (state,action) =>{
        //         state.data.isFetching = false;
        //         state.data.updateProfileUser = action.payload;
        //     },
        //     getUpdateProfileUsersFailed: (state) => {
        //         state.data.isFetching = false;
        //         state.data.error = true;
        //     },
        //     deleteUserStart: (state)=>{
        //         state.data.isFetching = true;
        //     },
        //     deleteUsersSuccess: (state,action)=>{
        //         state.data.isFetching = false;
        //         state.msg = action.payload;
        //     },
        //     deleteUserFailed: (state,action)=>{
        //         state.data.isFetching = false;
        //         state.data.error = true;
        //         state.msg = action.payload;
        //     }
    },
});

export const {
    postCvStart,
    postCvSuccess,
    postCvFailed,
    getCvStart,
    getCvSuccess,
    getCvFailed,
} = cvDataSlice.actions;

export default cvDataSlice.reducer;
