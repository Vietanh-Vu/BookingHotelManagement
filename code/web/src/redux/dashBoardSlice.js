import {createSlice} from '@reduxjs/toolkit'

const dashBoardSlice = createSlice({
  name: 'dashBoard',
  initialState: {
    revenueLast12Month: {
        allValues: null,
        isFetching: false,
        error: false
    },
    lastMonthRevenueCategory: {
        allValues: null,
        isFetching: false,
        error: false
    },
    hotelRevenueLast12Month: {
        allValues: null,
        isFetching: false,
        error: false
    },
    lastMonthRevenueRoomType: {
        allValues: null,
        isFetching: false,
        error: false
    },
    totalMonthlyUsersLast12Month: {
        allValues: null,
        isFetching: false,
        error: false
    },
    totalNewUsersLastMonth: {
        allValues: null,
        isFetching: false,
        error: false
    },
    totalOldUsersLastMonth: {
        allValues: null,
        isFetching: false,
        error: false
    },
  },
  reducers: {
    getRevenueLast12MonthStart: state => {
        state.revenueLast12Month.isFetching = true;
        state.revenueLast12Month.error = false;
    },
    getRevenueLast12MonthSuccess: (state, action) => {
        state.revenueLast12Month.isFetching = false;
        state.revenueLast12Month.allValues = action.payload;
        state.revenueLast12Month.error = false;
    },
    getRevenueLast12MonthFailed: state => {
        state.revenueLast12Month.isFetching = false;
        state.revenueLast12Month.error = true;
    },
    getLastMonthRevenueCategoryStart: state => {
        state.lastMonthRevenueCategory.isFetching = true;
        state.lastMonthRevenueCategory.error = false;
    },
    getLastMonthRevenueCategorySuccess: (state, action) => {
        state.lastMonthRevenueCategory.isFetching = false;
        state.lastMonthRevenueCategory.allValues = action.payload;
        state.lastMonthRevenueCategory.error = false;
    },
    getLastMonthRevenueCategoryFailed: state => {
        state.lastMonthRevenueCategory.isFetching = false;
        state.lastMonthRevenueCategory.error = true;
    },
    getHotelRevenueLast12MonthStart: state => {
        state.hotelRevenueLast12Month.isFetching = true;
        state.hotelRevenueLast12Month.error = false;
    },
    getHotelRevenueLast12MonthSuccess: (state, action) => {
        state.hotelRevenueLast12Month.isFetching = false;
        state.hotelRevenueLast12Month.allValues = action.payload;
        state.hotelRevenueLast12Month.error = false;
    },
    getHotelRevenueLast12MonthFailed: state => {
        state.hotelRevenueLast12Month.isFetching = false;
        state.hotelRevenueLast12Month.error = true;
    },
    getLastMonthRevenueRoomTypeStart: state => {
        state.lastMonthRevenueRoomType.isFetching = true;
        state.lastMonthRevenueRoomType.error = false;
    },
    getLastMonthRevenueRoomTypeSuccess: (state, action) => {
        state.lastMonthRevenueRoomType.isFetching = false;
        state.lastMonthRevenueRoomType.allValues = action.payload;
        state.lastMonthRevenueRoomType.error = false;
    },
    getLastMonthRevenueRoomTypeFailed: state => {
        state.lastMonthRevenueRoomType.isFetching = false;
        state.lastMonthRevenueRoomType.error = true;
    },
    getTotalMonthlyUsersLast12MonthStart: state => {
        state.totalMonthlyUsersLast12Month.isFetching = true;
        state.totalMonthlyUsersLast12Month.error = false;
    },
    getTotalMonthlyUsersLast12MonthSuccess: (state, action) => {
        state.totalMonthlyUsersLast12Month.isFetching = false;
        state.totalMonthlyUsersLast12Month.allValues = action.payload;
        state.totalMonthlyUsersLast12Month.error = false;
    },
    getTotalMonthlyUsersLast12MonthFailed: state => {
        state.totalMonthlyUsersLast12Month.isFetching = false;
        state.totalMonthlyUsersLast12Month.error = true;
    },
    getTotalNewUsersLastMonthStart: state => {
        state.totalNewUsersLastMonth.isFetching = true;
        state.totalNewUsersLastMonth.error = false;
    },
    getTotalNewUsersLastMonthSuccess: (state, action) => {
        state.totalNewUsersLastMonth.isFetching = false;
        state.totalNewUsersLastMonth.allValues = action.payload;
        state.totalNewUsersLastMonth.error = false;
    },
    getTotalNewUsersLastMonthFailed: state => {
        state.totalNewUsersLastMonth.isFetching = false;
        state.totalNewUsersLastMonth.error = true;
    },
    getTotalOldUsersLastMonthStart: state => {
        state.totalOldUsersLastMonth.isFetching = true;
        state.totalOldUsersLastMonth.error = false;
    },
    getTotalOldUsersLastMonthSuccess: (state, action) => {
        state.totalOldUsersLastMonth.isFetching = false;
        state.totalOldUsersLastMonth.allValues = action.payload;
        state.totalOldUsersLastMonth.error = false;
    },
    getTotalOldUsersLastMonthFailed: state => {
        state.totalOldUsersLastMonth.isFetching = false;
        state.totalOldUsersLastMonth.error = true;
    },
  },
})

export const {
  getRevenueLast12MonthFailed,
  getRevenueLast12MonthStart,
  getRevenueLast12MonthSuccess,
  getLastMonthRevenueCategoryFailed,
  getLastMonthRevenueCategoryStart,
  getLastMonthRevenueCategorySuccess,
  getHotelRevenueLast12MonthFailed,
  getHotelRevenueLast12MonthStart,
  getHotelRevenueLast12MonthSuccess,
  getLastMonthRevenueRoomTypeFailed,
  getLastMonthRevenueRoomTypeStart,
  getLastMonthRevenueRoomTypeSuccess,
  getTotalMonthlyUsersLast12MonthFailed,
  getTotalMonthlyUsersLast12MonthStart,
  getTotalMonthlyUsersLast12MonthSuccess,
  getTotalNewUsersLastMonthFailed,
  getTotalNewUsersLastMonthStart,
  getTotalNewUsersLastMonthSuccess,
  getTotalOldUsersLastMonthFailed,
  getTotalOldUsersLastMonthStart,
  getTotalOldUsersLastMonthSuccess,
} = dashBoardSlice.actions

export default dashBoardSlice.reducer
