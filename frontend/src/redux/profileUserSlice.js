import { createSlice } from "@reduxjs/toolkit";

const profilUser = createSlice({
    name:"profile",
    initialState:{
        users: {
            profileUser:null,
            isFetching:false,
            error:false
        },
        msg:"",
    },
    reducers:{
        getProfileUsersStart: (state)=>{
            state.users.isFetching = true;
        },
        getProfileUsersSuccess: (state,action) =>{
            state.users.isFetching = false;
            state.users.profileUser = action.payload;
        },
        getProfileUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state)=>{
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state,action)=>{
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state,action)=>{
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        } 
    }
})

export const {
    getProfileUsersStart,
    getProfileUsersSuccess,
    getProfileUsersFailed,
    deleteUserStart,
    deleteUsersSuccess,
    deleteUserFailed
} = profilUser.actions;

export default profilUser.reducer;