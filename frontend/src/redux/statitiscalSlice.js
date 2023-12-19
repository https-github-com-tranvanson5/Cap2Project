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
            allUsers: null,
            isFetching: false,
            error: false,
        },
        userCountYear: {
            userCountYear: null,
            isFetching: false,
            error: false,
        },
        countBlog: {
            countBlog: null,
            isFetching: false,
            error: false,
        },
        countBlogMonth: {
            countBlogMonth: null,
            isFetching: false,
            error: false,
        },
        minYear: {
            minYear: null,
            isFetching: false,
            error: false,
        },
        countBlogYear: {
            countBlogYear: null,
            isFetching: false,
            error: false,
        },
        getqualityJob: {
            getqualityJob: null,
            isFetching: false,
            error: false,
        },
        qualityJobByStatus: {
            qualityJobByStatus: null,
            isFetching: false,
            error: false,
        },
        qualityJobMonth: {
            qualityJobMonth: null,
            isFetching: false,
            error: false,
        },
        qualityJobByYear: {
            qualityJobByYear: null,
            isFetching: false,
            error: false,
        },
        rankTopJob: {
            rankTopJob: null,
            isFetching: false,
            error: false,
        },
        rankTopCareer: {
            rankTopCareer: null,
            isFetching: false,
            error: false,
        },
        minMaxYearBlog: {
            minMaxYearBlog: null,
            isFetching: false,
            error: false,
        },


        msg: '',
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
        getAllUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getAllUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        //count blog
        getCountBlogStart: (state) => {
            state.countBlog.isFetching = true;
        },
        getCountBlogSuccess: (state, action) => {
            state.countBlog.isFetching = false;
            state.countBlog.countBlog = action.payload;
        },
        getCountBlogFailed: (state) => {
            state.countBlog.isFetching = false;
            state.countBlog.error = true;
        },

        //count blog month
        getCountBlogMonthStart: (state) => {
            state.countBlogMonth.isFetching = true;
        },
        getCountBlogMonthSuccess: (state, action) => {
            state.countBlogMonth.isFetching = false;
            state.countBlogMonth.countBlogMonth = action.payload;
        },
        getCountBlogMonthFailed: (state) => {
            state.countBlogMonth.isFetching = false;
            state.countBlogMonth.error = true;
        },

        // MinYear
        getMinYearStart: (state) => {
            state.minYear.isFetching = true;
        },
        getMinYearSuccess: (state, action) => {
            state.minYear.isFetching = false;
            state.minYear.minYear = action.payload;
        },
        getMinYearFailed: (state) => {
            state.minYear.isFetching = false;
            state.minYear.error = true;
        },
        // UserStatitiscalYear
        getCountBlogYearStart: (state) => {
            state.countBlogYear.isFetching = true;
        },
        getCountBlogYearSuccess: (state, action) => {
            state.countBlogYear.isFetching = false;
            state.countBlogYear.countBlogYear = action.payload;
        },
        getCountBlogYearFailed: (state) => {
            state.countBlogYear.isFetching = false;
            state.countBlogYear.error = true;
        },

        // getqualityJob
        getqualityJobStart: (state) => {
            state.getqualityJob.isFetching = true;
        },
        getqualityJobSuccess: (state, action) => {
            state.getqualityJob.isFetching = false;
            state.getqualityJob.getqualityJob = action.payload;
        },
        getqualityJobFailed: (state) => {
            state.getqualityJob.isFetching = false;
            state.getqualityJob.error = true;
        },
        // getqualityJobByStatus
        getqualityJobByStatusStart: (state) => {
            state.qualityJobByStatus.isFetching = true;
        },
        getqualityJobByStatusSuccess: (state, action) => {
            state.qualityJobByStatus.isFetching = false;
            state.qualityJobByStatus.qualityJobByStatus = action.payload;
        },
        getqualityJobByStatusFailed: (state) => {
            state.qualityJobByStatus.isFetching = false;
            state.qualityJobByStatus.error = true;
        },


        // getQualityJobMoth
        getQualityJobMothStart: (state) => {
            state.userStatitiscalMonth.isFetching = true;
        },
        getQualityJobMothSuccess: (state, action) => {
            state.userStatitiscalMonth.isFetching = false;
            state.userStatitiscalMonth.userStatitiscalMonth = action.payload;
        },
        getQualityJobMothFailed: (state) => {
            state.userStatitiscalMonth.isFetching = false;
            state.userStatitiscalMonth.error = true;
        },
        // getqualityJobByYear
        getQualityJobByYearStart: (state) => {
            state.qualityJobByYear.isFetching = true;
        },
        getQualityJobByYearSuccess: (state, action) => {
            state.qualityJobByYear.isFetching = false;
            state.qualityJobByYear.qualityJobByYear = action.payload;
        },
        getQualityJobByYearFailed: (state) => {
            state.qualityJobByYear.isFetching = false;
            state.qualityJobByYear.error = true;
        },

        // rankTopJob
        getRankTopJobStart: (state) => {
            state.rankTopJob.isFetching = true;
        },
        getRankTopJobSuccess: (state, action) => {
            state.rankTopJob.isFetching = false;
            state.rankTopJob.rankTopJob = action.payload;
        },
        getRankTopJobFailed: (state) => {
            state.rankTopJob.isFetching = false;
            state.rankTopJob.error = true;
        },
        // rankTopCareer
        getRankTopCareerStart: (state) => {
            state.rankTopCareer.isFetching = true;
        },
        getRankTopCareerSuccess: (state, action) => {
            state.rankTopCareer.isFetching = false;
            state.rankTopCareer.rankTopJob = action.payload;
        },
        getRankTopCareerFailed: (state) => {
            state.rankTopCareer.isFetching = true;
            state.rankTopCareer.error = true;
        },

        // minMaxYearBlog
        getMinMaxYearBlogStart: (state) => {
            state.minMaxYearBlog.isFetching = true;
        },
        getMinMaxYearBlogSuccess: (state, action) => {
            state.minMaxYearBlog.isFetching = false;
            state.minMaxYearBlog.minMaxYearBlog = action.payload;
        },
        getMinMaxYearBlogFailed: (state) => {
            state.minMaxYearBlog.isFetching = false;
            state.minMaxYearBlog.error = true;
        },

    },
});
export const {
    // minMaxYearBlog
    getMinMaxYearBlogStart,
    getMinMaxYearBlogSuccess,
    getMinMaxYearBlogFailed,

    // rankTopCareer
    getRankTopCareerStart,
    getRankTopCareerSuccess,
    getRankTopCareerFailed,

    // rankTopJob
    getRankTopJobStart,
    getRankTopJobSuccess,
    getRankTopJobFailed,

    // getqualityJobByYear
    getQualityJobByYearStart,
    getQualityJobByYearSuccess,
    getQualityJobByYearFailed,

    // getQualityJobMoth
    getQualityJobMothStart,
    getQualityJobMothSuccess,
    getQualityJobMothFailed,

    // getqualityJobByStatus
    getqualityJobByStatusStart,
    getqualityJobByStatusSuccess,
    getqualityJobByStatusFailed,


    // getqualityJob
    getqualityJobStart,
    getqualityJobSuccess,
    getqualityJobFailed,

    // UserStatitiscalYear
    getCountBlogYearStart,
    getCountBlogYearSuccess,
    getCountBlogYearFailed,

    // MinYear
    getMinYearStart,
    getMinYearSuccess,
    getMinYearFailed,

    //count blog month
    getCountBlogMonthStart,
    getCountBlogMonthSuccess,
    getCountBlogMonthFailed,
    //count blog
    getCountBlogStart,
    getCountBlogSuccess,
    getCountBlogFailed,
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
