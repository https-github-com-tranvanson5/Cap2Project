import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from '@reduxjs/toolkit';

import {
    deleteUserApi,
    getAllUsersApi,
    registerRecruiterApi,
} from '~/services/userService';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLoading: false,
        isSuccess: false,
        message: '',
        data: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterRecruiter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRegisterRecruiter.fulfilled, (state, action) => {
                const resData = action.payload;
                state.isLoading = false;
                if (resData.success) {
                    state.message = '';
                    state.isSuccess = true;
                } else {
                    state.isSuccess = false;
                    state.message = 'Email đã tồn tại!';
                }
            })
            .addCase(fetchGetAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchDeleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDeleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
            });
    },
});

export const fetchRegisterRecruiter = createAsyncThunk(
    'admin/fetchRegisterRecruiter',
    async ({ email, password, fullname }) => {
        try {
            return await registerRecruiterApi(email, password, fullname);
        } catch (error) {
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchGetAllUsers = createAsyncThunk(
    'admin/fetchGetAllUsers',
    async () => {
        try {
            return await getAllUsersApi();
        } catch (error) {
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchDeleteUser = createAsyncThunk(
    'admin/fetchDeleteUser',
    async (id) => {
        try {
            return await deleteUserApi(id);
        } catch (error) {
            return isRejectedWithValue(error.response);
        }
    },
);
