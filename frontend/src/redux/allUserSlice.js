import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
    name:"allUser",
    initialState:{
        users: {
            allUsers:null,
            isFetching:false,
            error:false
        },
        msg:"",
    },
    reducers:{
        getAllUsersStart: (state)=>{
            state.users.isFetching = true;
        },
        getAllUsersSuccess: (state,action) =>{
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getAllUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteAllUserStart: (state)=>{
            state.users.isFetching = true;
        },
        deleteAllUsersSuccess: (state,action)=>{
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteAllUserFailed: (state,action)=>{
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        } 
    }
})

export const {
    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFailed,
    deleteAllUserStart,
    deleteAllUsersSuccess,
    deleteAllUserFailed
} = allUserSlice.actions;

export default allUserSlice.reducer;