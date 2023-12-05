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
    
} = StatitiscalSlice.actions;
export default StatitiscalSlice.reducer;
