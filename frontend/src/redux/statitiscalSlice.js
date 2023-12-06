import { createSlice } from '@reduxjs/toolkit';
const StatitiscalSlice = createSlice({
    name: 'statitiscal',
    initialState: {
        userStatitiscalMonth: {
            userStatitiscalMonth: null,
            isFetching: false,
            error: false,
        },
        userMinMaxYearCreateAt: {
            userMinMaxYearCreateAt: null,
            isFetching: false,
            error: false,
        },
        userCount: {
            userCount: null,
            isFetching: false,
            error: false,
        },
        userCountRole: {
            userCountRole: null,
            isFetching: false,
            error: false,
        },
        users: {
            allUsers:null,
            isFetching:false,
            error:false
        },
        userCountYear: {
            userCountYear: null,
            isFetching: false,
            error: false,
        },
        msg:"",
    },
    reducers: {
        // UserStatitiscalMonth
        getUserStatitiscalMonthStart: (state) => {
            state.userStatitiscalMonth.isFetching = true;
        },
        getUserStatitiscalMonthSuccess: (state, action) => {
            state.userStatitiscalMonth.isFetching = false;
            state.userStatitiscalMonth.userStatitiscalMonth = action.payload;
        },
        getUserStatitiscalMonthFailed: (state) => {
            state.userStatitiscalMonth.isFetching = false;
            state.userStatitiscalMonth.error = true;
        },

         // UserStatitiscalYear
         getUserStatitiscalYearStart: (state) => {
            state.userCountYear.isFetching = true;
        },
        getUserStatitiscalYearSuccess: (state, action) => {
            state.userCountYear.isFetching = false;
            state.userCountYear.userCountYear = action.payload;
        },
        getUserStatitiscalYearFailed: (state) => {
            state.userCountYear.isFetching = false;
            state.userCountYear.error = true;
        },
        // userMinMaxCreateAt
        getUserMinMaxCreateAtStart: (state) => {
            state.userMinMaxYearCreateAt.isFetching = true;
        },
        getUserMinMaxCreateAtSuccess: (state, action) => {
            state.userMinMaxYearCreateAt.isFetching = false;
            state.userMinMaxYearCreateAt.userMinMaxYearCreateAt =
                action.payload;
        },
        getUserMinMaxCreateAtFailed: (state) => {
            state.userMinMaxYearCreateAt.isFetching = false;
            state.userMinMaxYearCreateAt.error = true;
        },

        //count user
        getUserCountStart: (state) => {
            state.userCount.isFetching = true;
        },
        getUserCountSuccess: (state, action) => {
            state.userCount.isFetching = false;
            state.userCount.userMinMaxYearCreateAt = action.payload;
        },
        getUserCountFailed: (state) => {
            state.userCount.isFetching = false;
            state.userCount.error = true;
        },
        //count Role
        getUserCountRoleStart: (state) => {
            state.userCountRole.isFetching = true;
        },
        getUserCountRoleSuccess: (state, action) => {
            state.userCountRole.isFetching = false;
            state.userCountRole.userMinMaxYearCreateAt = action.payload;
        },
        getUserCountRoleFailed: (state) => {
            state.userCountRole.isFetching = false;
            state.userCountRole.error = true;
        },

        //get all
        getAllUsersStart: (state)=>{
            state.users.isFetching = true;
        },
        getAllUsersSuccess: (state,action) =>{
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getAllUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});
export const {
    // UserStatitiscalMonth
    getUserStatitiscalMonthStart,
    getUserStatitiscalMonthSuccess,
    getUserStatitiscalMonthFailed,

    // userMinMaxCreateAt
    getUserMinMaxCreateAtStart,
    getUserMinMaxCreateAtSuccess,
    getUserMinMaxCreateAtFailed,

    //count user
    getUserCountStart,
    getUserCountSuccess,
    getUserCountFailed,

    //count Role
    getUserCountRoleStart,
    getUserCountRoleSuccess,
    getUserCountRoleFailed,
    
    //getAll
    getAllUsersFailed,
    getAllUsersStart,
    getAllUsersSuccess,

    // UserStatitiscalYear
    getUserStatitiscalYearStart,
    getUserStatitiscalYearSuccess,
    getUserStatitiscalYearFailed,
    
} = StatitiscalSlice.actions;
export default StatitiscalSlice.reducer;
