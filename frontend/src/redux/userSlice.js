import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"profile",
    initialState:{
        user: {
            profileUser:null,
            isFetching:false,
            error:false
        },
        updateProfile: {
            updateProfileUser:null,
            isFetching:false,
            error:false
        },
        msg:"",
    },
    reducers:{
        getProfileStart: (state)=>{
            state.user.isFetching = true;
        },
        getProfileSuccess: (state,action) =>{
            state.user.isFetching = false;
            state.user.profileUser = action.payload;
        },
        getProfileFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        getUpdateProfileUsersStart: (state)=>{
            state.user.isFetching = true;
        },
        getUpdateProfileUsersSuccess: (state,action) =>{
            state.user.isFetching = false;
            state.user.updateProfileUser = action.payload;
        },
        getUpdateProfileUsersFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        deleteUserStart: (state)=>{
            state.user.isFetching = true;
        },
        deleteUsersSuccess: (state,action)=>{
            state.user.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state,action)=>{
            state.user.isFetching = false;
            state.user.error = true;
            state.msg = action.payload;
        } 
    }
})

export const {
    getProfileStart,
    getProfileSuccess,
    getProfileFailed,
    getUpdateProfileUsersStart,
    getUpdateProfileUsersSuccess,
    getUpdateProfileUsersFailed,
    deleteUserStart,
    deleteUsersSuccess,
    deleteUserFailed
} = userSlice.actions;

export default userSlice.reducer;