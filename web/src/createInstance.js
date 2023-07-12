import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {
  loginSuccess,
  refreshFailed,
  refreshStart,
  refreshSuccess,
} from './redux/authSlice'
import {store} from './redux/store'

const refreshTokenFunc = async user => {
  try {
    const res = await axios.post('http://localhost:8000/refresh', {
      refreshToken: user?.refreshToken,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const createAxios = (user, dispatch, navigate) => {
  const newInstance = axios.create()
  newInstance.interceptors.request.use(
    async config => {
      let date = new Date()
      const decodedToken = jwt_decode(user?.accessToken)
      if (decodedToken.exp < date.getTime() / 1000) {
        dispatch(refreshStart())
        try {
          
          const {newAccessToken, newRefreshToken} = await refreshTokenFunc(user)
          const refreshUser = {
            ...user,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          }
          dispatch(refreshSuccess(refreshUser))
          config.headers['token'] = `Bearer ${newAccessToken}`
        } catch (error) {
          console.log(error)
          dispatch(refreshFailed())
          navigate('/admin/login')
        }
      }
      return config
    },
    err => {
      return Promise.reject(err)
    },
  )
  return newInstance
}
