import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { applyJobsApi, getDetailPost } from '~/services/jobService';

export const recruitmentDetailSlice = createSlice({
    name: 'recruitmentDetail',
    initialState: {
        isLoading: false,
        messsage: false,
        recruitmentDetailDesc: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailJobDesc.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDetailJobDesc.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recruitmentDetailDesc = action.payload;
            })
            .addCase(fetchApplyJobs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchApplyJobs.fulfilled, (state, action) => {
                state.isLoading = false;
            });
    },
});

// edit job
export const fetchDetailJobDesc = createAsyncThunk(
    'recruitmentDetail/fetchDetailJobDesc',
    async (id) => {
        try {
            const res = await getDetailPost(id);
            return res.data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchApplyJobs = createAsyncThunk(
    'recruitmentDetail/fetchApplyJobs',
    async (data) => {
        try {
            return await applyJobsApi(data);
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);
