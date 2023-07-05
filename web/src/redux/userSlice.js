import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getUserStart: state => {
      state.users.isFetching = true
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false
      state.users.allUsers = action.payload
      state.users.error = false
    },
    getUserFailed: state => {
      state.users.isFetching = false
      state.users.error = true
    },
    deleteAdminStart: state => {
      state.users.isFetching = true
    },
    deleteAdminSuccess: (state) => {
      state.users.isFetching = false
      state.users.error = false
    },
    deleteAdminFailed: state => {
      state.users.isFetching = false
      state.users.error = true
    },
    setAdminStart: state => {
      state.users.isFetching = true
    },
    setAdminSuccess: (state) => {
      state.users.isFetching = false
      state.users.error = false
    },
    setAdminFailed: state => {
      state.users.isFetching = false
      state.users.error = true
    },
  },
})

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  deleteAdminStart,
  deleteAdminFailed,
  deleteAdminSuccess,
  setAdminFailed,
  setAdminSuccess,
  setAdminStart
} = userSlice.actions

export default userSlice.reducer
