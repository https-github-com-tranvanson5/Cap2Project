import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import {
    deletedJobDesc,
    editJobDesc,
    getListJobApi,
    postJobDesc,
} from '~/services/jobService';

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        idLoading: false,
        jobList: [],
        messsage: false,
        job: {},
    },
    reducers: {
        restMessage: (state, action) => {
            state.messsage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListJob.pending, (state) => {
                state.idLoading = true;
            })
            .addCase(fetchListJob.fulfilled, (state, action) => {
                state.idLoading = false;
                state.jobList = action.payload;
            })
            // post job
            .addCase(fetchPostJobDesc.pending, (state) => {
                state.idLoading = true;
            })
            .addCase(fetchPostJobDesc.fulfilled, (state, action) => {
                state.idLoading = false;
                const { data, message, success } = action.payload;
                console.log(action.payload);
                state.job = data;
                state.messsage = success;
            })
            // deleted job
            .addCase(fetchDeletedJobDesc.pending, (state) => {
                state.idLoading = true;
            })
            .addCase(fetchDeletedJobDesc.fulfilled, (state, action) => {
                state.idLoading = false;
                const { data, message } = action.payload;
                state.job = data;
                state.messsage = message;
            });
    },
});

export const fetchListJob = createAsyncThunk(
    'home/fetchListJob',
    async () => {
        try {
            const res = await getListJobApi();
            // dispatch(fetchListJobPagination(res.data))
            // fetchListJobPagination(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchListJobPagination = createAsyncThunk(
    'home/fetchListJob',
    async (jobs) => {
        try {
            // console.log('jobs', jobs);
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

// dispatch(fetchPostJobDesc(data));
// post a job
export const fetchPostJobDesc = createAsyncThunk(
    'home/fetchPostJobDesc',
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
    'home/fetchDeletedJobDesc',
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
    'home/fetchEditJobDesc',
    async (body) => {
        try {
            const res = await editJobDesc(body);
            return res.data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);
