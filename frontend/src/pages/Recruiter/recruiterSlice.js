import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { deletedJobDesc, postJobDesc } from '~/services/jobService';
import { getDetailRecuiterByIdApi } from '~/services/userService';

export const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState: {
        idLoading: false,
        messsage: false,
        job: {},
        jobDisplayPagination: [],
        recruiterJobList: [],
    },
    reducers: {
        restMessage: (state, action) => {
            state.messsage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // post job
            .addCase(fetchPostJobDesc.pending, (state) => {
                state.idLoading = true;
            })
            .addCase(fetchPostJobDesc.fulfilled, (state, action) => {
                state.idLoading = false;
                const { data, success } = action.payload;
                state.job = data;
                state.messsage = success;
            })
            // deleted job

            .addCase(fetchJobsPagination.pending, (state, action) => {
                state.jobDisplayPagination = action.payload;
            })
            .addCase(fetchDeletedJobDesc.pending, (state) => {
                state.idLoading = true;
            })
            .addCase(fetchDeletedJobDesc.fulfilled, (state, action) => {
                state.idLoading = false;
                const { data, message } = action.payload;
                state.job = data;
                state.messsage = message;
                // if deleted success
                // state.recruiterJobList = state.recruiterJobList.filter(ruiterJob =>{
                // console.log(ruiterJob);
                //     return  ruiterJob.id !== data.id
                // })
            })
            .addCase(fetchRecruiterDetail.pending, (state) => {
                state.idLoading = true;
            })
            .addCase(fetchRecruiterDetail.fulfilled, (state, action) => {
                const recruiterDetailData = action.payload.data;
                state.recruiterJobList = recruiterDetailData.recruiter_jobs;
            });
    },
});

// dispatch(fetchPostJobDesc(data));
// post a job
export const fetchPostJobDesc = createAsyncThunk(
    'recruiter/fetchPostJobDesc',
    async (data) => {
        try {
            const res = await postJobDesc(data);
            return res;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

// deleted job
export const fetchDeletedJobDesc = createAsyncThunk(
    'recruiter/fetchDeletedJobDesc',
    async (id) => {
        try {
            const res = await deletedJobDesc(id);
            return res;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

// edit job
export const fetchEditJobDesc = createAsyncThunk(
    'recruiter/fetchPostJobDesc',
    async (id, data) => {
        console.log('data fetch', data);
        try {
            // const res = await editJobDesc(id, data);
            // return res.data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchJobsPagination = createAsyncThunk(
    'recruiter/fetchJobsPagination',
    async (data) => {
        console.log('data fetch');
        try {
            // const res = await editJobDesc(id, data);
            return data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchRecruiterDetail = createAsyncThunk(
    'recruiter/fetchRecruiterDetail',
    async (recruiterId) => {
        try {
            const res = await getDetailRecuiterByIdApi(recruiterId);
            return res;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);
