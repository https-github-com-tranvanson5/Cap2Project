import {
    createAsyncThunk,
    createSlice,
    isRejectedWithValue,
} from '@reduxjs/toolkit';
import { getCategoriesSearch, getJobsSearch } from '~/services/searchService';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoading: false,
        categories: {},
        results: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesSearch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoriesSearch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchJobListSearch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJobListSearch.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.length > 0) {
                    state.results = action.payload;
                } else {
                    state.results = [];
                }
            });
    },
});

export const fetchCategoriesSearch = createAsyncThunk(
    'search/fetchCategoriesSearch',
    async () => {
        try {
            const res = await getCategoriesSearch();
            return res.data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);

export const fetchJobListSearch = createAsyncThunk(
    'search/fetchJobListSearch',
    async (title) => {
        try {
            const res = await getJobsSearch(title);
            return res.data;
        } catch (error) {
            console.log(error);
            return isRejectedWithValue(error.response);
        }
    },
);
