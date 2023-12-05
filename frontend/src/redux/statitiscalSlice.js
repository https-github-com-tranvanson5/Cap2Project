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
            state.userMinMaxYearCreateAt.userMinMaxYearCreateAt = action.payload;
        },
        getUserMinMaxCreateAtFailed: (state) => {
            state.userMinMaxYearCreateAt.isFetching = false;
            state.userMinMaxYearCreateAt.error = true;
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

} = StatitiscalSlice.actions;
export default StatitiscalSlice.reducer;
