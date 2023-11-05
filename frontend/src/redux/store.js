import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import allUserReducer from './allUserSlice';
import allJobReducer from './jobSlice'
import applyJobReducer from './recruimentSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cvSlice } from '~/pages/CV/cvSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['cv' , 'allUser' , 'allJob' , 'recruitment'],
};
const rootReducer = combineReducers({
    auth: authReducer,
    profile: userReducer,
    cv: cvSlice.reducer,
    allUser: allUserReducer,
    allJob : allJobReducer , 
    recruitment: applyJobReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export let persistor = persistStore(store);
