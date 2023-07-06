import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  deleteAdminFailed,
  deleteAdminStart,
  deleteAdminSuccess,
  setAdminStart,
  setAdminSuccess,
  setAdminFailed,
  getUserHistoryStart,
  getUserHistorySuccess,
  getUserHistoryFailed,
} from '../userSlice'

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart())
  try {
    const res = await axiosJWT.get(`http://localhost:8000/admin/users/`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(getUserSuccess(res.data))
  } catch (error) {
    dispatch(getUserFailed())
  }
}

export const deleteAdmin = async (accessToken, dispatch, axiosJWT, user) => {
  dispatch(deleteAdminStart())
  try {
    const res = await axiosJWT.put(
      `http://localhost:8000/admin/users/delete/${user.UsersId}`,
      {},
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(deleteAdminSuccess())
    alert(res.data.message)
  } catch (error) {
    dispatch(deleteAdminFailed())
  }
}

export const setAdmin = async (accessToken, dispatch, axiosJWT, user) => {
  dispatch(setAdminStart())
  try {
    const res = await axiosJWT.put(
      `http://localhost:8000/admin/users/set/${user.UsersId}`,
      {},
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(setAdminSuccess())
    alert(res.data.message)
  } catch (error) {
    dispatch(setAdminFailed())
  }
}

export const getAllUserHistory = async (accessToken, dispatch, axiosJWT, userId) => {
  dispatch(getUserHistoryStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/users/history/${userId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(
      getUserHistorySuccess(
        res.data
      ),
    )
  } catch (error) {
    dispatch(getUserHistoryFailed())
  }
}