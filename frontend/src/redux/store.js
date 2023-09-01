import { configureStore } from '@reduxjs/toolkit';
import { accountsSlice } from '~/pages/Accounts/accountsSlice';
import { adminSlice } from '~/pages/Admin/adminSlice';
import { cvSlice } from '~/pages/CV/cvSlice';
import { homeSlice } from '~/pages/Home/homeSlice';
import { recruiterSlice } from '~/pages/Recruiter/recruiterSlice';
import { recruitmentDetailSlice } from '~/pages/RecruitmentDetail/RecruitmentPageSlice';
import { searchSlice } from './GlobalSlices/searchSlice';

const store = configureStore({
    reducer: {
        accounts: accountsSlice.reducer,
        home: homeSlice.reducer,
        cv: cvSlice.reducer,
        recruiter: recruiterSlice.reducer,
        admin: adminSlice.reducer,
        recruitmentDetail: recruitmentDetailSlice.reducer,
        search: searchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
