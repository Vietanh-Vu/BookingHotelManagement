import axios from 'axios'
import jwt_decode from 'jwt-decode'

const refreshToken = async () => {
  try {
    const res = await axios.post(
      `http://localhost:3000/refresh`,
      {},
      {
        withCredentials: true,
      },
    )
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
          const data = await refreshToken()
          const refreshUser = {
            ...user,
            accessToken: data.accessToken,
          }
          dispatch(stateSuccess(refreshUser))
          config.headers['token'] = `Bearer ${data.accessToken}`
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
