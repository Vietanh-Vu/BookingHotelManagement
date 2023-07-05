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
} from '../authSlice'

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  try {
    const res = await axios.post('http://localhost:8000/login', user)
    dispatch(loginSuccess(res.data))
    navigate('/admin')
  } catch (error) {
    dispatch(loginFailed())
    alert(error.response.data.error)
  }
}

export const registerUser = async (newUser, dispatch, navigate) => {
  dispatch(registerStart())
  try {
    const res = await axios.post(`http://localhost:8000/register`, newUser)
    dispatch(registerSuccess())
    navigate('/admin/login')
    alert(res.data.message)
  } catch (error) {
    dispatch(registerFailed())
    alert(error.response.data.error)
  }
}

export const logOut = async (
  dispatch,
  navigate,
  accessToken,
  refreshToken,
  axiosJWT,
) => {
  dispatch(logOutStart())
  try {
    const res = await axiosJWT.post(
      `http://localhost:8000/logout`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(logOutSuccess())
  } catch (error) {
    dispatch(logOutFailed())
  }
}


