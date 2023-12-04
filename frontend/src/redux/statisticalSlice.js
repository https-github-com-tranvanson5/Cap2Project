import { createSlice } from "@reduxjs/toolkit";
import { all } from "axios";

const statisticalSlice = createSlice({
  name: "statistical",
  initialState: {
      statisticalUser: {
          usersByMonth: {
            statisticalUser: null,
            isFetching: false,
            error: false,
            countUser: null,
          },
      },
      yearMinMax:{
        yearMinMax:{
            yearMinMax: null,
            isFetching: false,
            error: false,
            countUser: null,
        }
      },
      countAllUser:{
        countAllUser:{
            yearMinMax: null,
            isFetching: false,
            error: false,
            countUser: null,
        }
      },
      countAllUserStatus:{
        countAllUserStatus:{
            yearMinMax: null,
            isFetching: false,
            error: false,
            countUser: null,
        }
      },
      countUserYear:{
        countUserYear:{
            countUserYear: null,
            isFetching: false,
            error: false,
            countUser: null,
        }
      },

  },
  reducers: {
    //thoong ke theo 12 thang
    getUsersByMonthStart : (state) => {
        state.statisticalUser.isFetching = true;
    },
      
    getUsersByMonthSuccess : (state, action) => {
        state.statisticalUser.isFetching = false;
        state.statisticalUser = action.payload;
    },
      
    getUsersByMonthFailed : (state) => {
        state.statisticalUser.isFetching = false;
        state.statisticalUser.error = true;
    },
    // get year min max
    getYearMinMaxStart : (state) => {
        state.yearMinMax.isFetching = true;
    },
      
    getYearMinMaxSuccess : (state, action) => {
        state.yearMinMax.isFetching = false;
        state.yearMinMax = action.payload;
    },
      
    getYearMinMaxFailed : (state) => {
        state.yearMinMax.isFetching = false;
        state.yearMinMax.error = true;
    },
    // count user
    getCountAllUserStart : (state) => {
        state.countAllUser.isFetching = true;
    },
      
    getCountAllUserSuccess : (state, action) => {
        state.countAllUser.isFetching = false;
        state.countAllUser = action.payload;
    },
      
    getCountAllUserFailed : (state) => {
        state.countAllUser.isFetching = false;
        state.statisticalUser.error = true;
    },

    // count user
    getCountAllUserStatusStart : (state) => {
        state.countAllUser.isFetching = true;
    },
      
    getCountAllUserStatusSuccess : (state, action) => {
        state.countAllUserStatus.isFetching = false;
        state.countAllUserStatus = action.payload;
    },
    getCountAllUserStatusFailed : (state) => {
        state.countAllUserStatus.isFetching = false;
        state.countAllUserStatus.error = true;
    },

    // count user
    getCountUserYearStart : (state) => {
        state.countUserYear.isFetching = true;
    },
      
    getCountUserYearSuccess : (state, action) => {
        state.countUserYear.isFetching = false;
        state.countUserYear = action.payload;
    },
    getCountUserYearFailed : (state) => {
        state.countUserYear.isFetching = false;
        state.countUserYear.error = true;
    },


  },
});

export const { 
    //thoong ke theo 12 thang
    getUsersByMonthStart,
    getUsersByMonthSuccess,
    getUsersByMonthFailed,

    // get year min max
    getYearMinMaxStart,
    getYearMinMaxSuccess,
    getYearMinMaxFailed,

   // count user
    getCountAllUserStart,
    getCountAllUserSuccess,
    getCountAllUserFailed,
    getCountAllUserStatusStart,
    getCountAllUserStatusSuccess,
    getCountAllUserStatusFailed,

    // count user year
    getCountUserYearStart,
    getCountUserYearSuccess,
    getCountUserYearFailed,
    
} = statisticalSlice.actions;

export default statisticalSlice.reducer;
