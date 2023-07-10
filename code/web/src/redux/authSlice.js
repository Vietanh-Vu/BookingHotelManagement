import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    loginStart: state => {
      state.login.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false
      state.login.currentUser = action.payload
      state.login.error = false
    },
    loginFailed: state => {
      state.login.isFetching = false
      state.login.error = true
    },
    registerStart: state => {
      state.register.isFetching = true
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false
      state.register.error = false
      state.register.success = true
    },
    registerFailed: state => {
      state.register.isFetching = false
      state.register.error = true
      state.register.success = false
    },
    logOutStart: state => {
      state.login.isFetching = true
    },
    logOutSuccess: (state) => {
      state.login.isFetching = false
      state.login.currentUser = null
      state.login.error = false
    },
    logOutFailed: state => {
      state.login.isFetching = false
      state.login.error = true
    },
    refreshStart: state => {
      state.login.isFetching = true
      state.login.error = false
    },
    refreshSuccess: (state, action) => {
      state.login.isFetching = false
      state.login.currentUser = action.payload
      state.login.error = false
    },
    refreshFailed: state => {
      state.login.isFetching = false
      state.login.error = true
    },
  },
})

export const {
  loginStart,
  loginFailed,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  logOutStart,
  logOutFailed,
  logOutSuccess,
  refreshFailed,
  refreshSuccess,
  refreshStart
} = authSlice.actions

export default authSlice.reducer
