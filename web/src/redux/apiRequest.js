import axios from 'axios'
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
} from './authSlice'
import {getUserStart, getUserSuccess, getUserFailed} from './userSlice'

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  try {
    const res = await axios.post(`http://localhost:3000/login`, user)
    dispatch(loginSuccess(res.data))
    navigate('/admin')
  } catch (error) {
    dispatch(loginFailed())
  }
}

export const registerUser = async (newUser, dispatch, navigate) => {
  dispatch(registerStart())
  try {
    await axios.post(`http://localhost:3000/register`, newUser)
    dispatch(registerSuccess())
    navigate('/admin/login')
  } catch (error) {
    dispatch(registerFailed())
  }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart())
  try {
    const res = await axiosJWT.get(`http://localhost:3000/admin/users/`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(getUserSuccess(res.data))
  } catch (error) {
    dispatch(getUserFailed())
  }
}

export const logOut = async (dispatch, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart())
  await axiosJWT
    .post(`http://localhost:3000/logout`, {
      headers: {token: `Bearer ${accessToken}`},
    })
    .then(res => {
      dispatch(logOutSuccess())
      navigate('/admin/login')
    })
    .catch(err => {
      dispatch(logOutFailed())
    })
}
