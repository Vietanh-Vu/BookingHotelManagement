import axios from 'axios'
import jwt_decode from 'jwt-decode'

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

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create()
  newInstance.interceptors.request.use(
    async config => {
      let date = new Date()
      const decodedToken = jwt_decode(user?.accessToken)      
      if (decodedToken.exp < date.getTime() / 1000) {
        try {
          const {newAccessToken, newRefreshToken} = await refreshTokenFunc(user)
          const refreshUser = {
            ...user,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          }
          dispatch(stateSuccess(refreshUser))
          config.headers['token'] = `Bearer ${newAccessToken}`
        } catch (error) {
          console.log(error)
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
