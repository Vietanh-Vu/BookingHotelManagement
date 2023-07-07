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
  settingUserStart,
  settingUserSuccess,
  settingUserFailed,
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

export const settingUser = async (
  accessToken,
  dispatch,
  axiosJWT,
  user,
  userId
) => {
  dispatch(settingUserStart())
  try {
    const userData = {
      UsersId: user.UsersId,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Phone: user.Phone,
      Address: user.Address,
      Password: user.Password, 
    }
    const response = await axiosJWT.put(
      `http://localhost:8000/admin/users/update/${userId}`,
      userData,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(settingUserSuccess())
    return response.data.message
  } catch (error) {
    dispatch(settingUserFailed())
    return error.response.data.error
  }
}