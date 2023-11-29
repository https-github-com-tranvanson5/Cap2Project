import { createSlice } from '@reduxjs/toolkit';

const cvDataSlice = createSlice({
    name: 'cvData',
    initialState: {
        data: {
            cv: null,
            isFetching: false,
            error: false,
            cvDetail : null,
        },
        editCv: {
            isFetching: false,
            error: false,
            success: false,
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
        // update Cv
        editCvStart: (state) => {
            state.editCv.isFetching = true;
        },
        editCvSuccess: (state) => {
            state.editCv.isFetching = false;
            state.editCv.error = false;
            state.editCv.success = true;
        },
        editCvFailed: (state) => {
            state.editCv.isFetching = false;
            state.editCv.error = true;
            state.editCv.success = false;
        },
        //detail cv
        getCvDetailStart: (state) => {
            state.data.isFetching = true;
        },
        getCvDetailSuccess: (state, action) => {
            state.data.isFetching = false;
            state.data.cvDetail = action.payload;
        },
        getCvDetailFailed: (state) => {
            state.data.isFetching = false;
            state.data.error = true;
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
    getCvDetailStart,
    getCvDetailSuccess,
    getCvDetailFailed, 
    editCvStart,
    editCvSuccess,
    editCvFailed,
    postCvStart,
    postCvSuccess,
    postCvFailed,
    getCvStart,
    getCvSuccess,
    getCvFailed,
} = cvDataSlice.actions;

export default cvDataSlice.reducer;
