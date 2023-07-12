import {
  getHotelRevenueLast12MonthFailed,
  getHotelRevenueLast12MonthStart,
  getHotelRevenueLast12MonthSuccess,
  getLastMonthRevenueCategoryFailed,
  getLastMonthRevenueCategoryStart,
  getLastMonthRevenueCategorySuccess,
  getLastMonthRevenueRoomTypeFailed,
  getLastMonthRevenueRoomTypeStart,
  getLastMonthRevenueRoomTypeSuccess,
  getRevenueLast12MonthFailed,
  getRevenueLast12MonthStart,
  getRevenueLast12MonthSuccess,
  getTotalMonthlyUsersLast12MonthFailed,
  getTotalMonthlyUsersLast12MonthStart,
  getTotalMonthlyUsersLast12MonthSuccess,
  getTotalNewUsersLastMonthFailed,
  getTotalNewUsersLastMonthStart,
  getTotalNewUsersLastMonthSuccess,
  getTotalOldUsersLastMonthFailed,
  getTotalOldUsersLastMonthStart,
  getTotalOldUsersLastMonthSuccess,
} from '../dashBoardSlice'

export const getRevenueLast12Month = async (
  accessToken,
  dispatch,
  axiosJWT,
) => {
  dispatch(getRevenueLast12MonthStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/revenueLast12Month`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getRevenueLast12MonthSuccess(res.data))
  } catch (error) {
    dispatch(getRevenueLast12MonthFailed())
  }
}

export const getLastMonthRevenueCategory = async (
  accessToken,
  dispatch,
  axiosJWT,
) => {
  dispatch(getLastMonthRevenueCategoryStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/lastMonthRevenueCategory`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getLastMonthRevenueCategorySuccess(res.data))
  } catch (error) {
    dispatch(getLastMonthRevenueCategoryFailed())
  }
}

export const getHotelRevenueLast12Month = async (
  accessToken,
  dispatch,
  axiosJWT,

  hotelId,
) => {
  dispatch(getHotelRevenueLast12MonthStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/hotelRevenueLast12Month/${hotelId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getHotelRevenueLast12MonthSuccess(res.data))
  } catch (error) {
    dispatch(getHotelRevenueLast12MonthFailed())
  }
}

export const getLastMonthRevenueRoomType = async (
  accessToken,
  dispatch,
  axiosJWT,
) => {
  dispatch(getLastMonthRevenueRoomTypeStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/lastMonthRevenueRoomType`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getLastMonthRevenueRoomTypeSuccess(res.data))
  } catch (error) {
    dispatch(getLastMonthRevenueRoomTypeFailed())
  }
}

export const getTotalMonthlyUsersLast12Month = async (
  accessToken,
  dispatch,
  axiosJWT,
) => {
  dispatch(getTotalMonthlyUsersLast12MonthStart())
  console.log('ehehse')
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/totalMonthlyUsersLast12Month`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getTotalMonthlyUsersLast12MonthSuccess(res.data))
  } catch (error) {
    dispatch(getTotalMonthlyUsersLast12MonthFailed())
  }
}

export const getTotalNewUsersLastMonth = async (
  accessToken,
  dispatch,
  axiosJWT,
) => {
  dispatch(getTotalNewUsersLastMonthStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/totalNewUsersLastMonth`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getTotalNewUsersLastMonthSuccess(res.data))
  } catch (error) {
    dispatch(getTotalNewUsersLastMonthFailed())
  }
}

export const getTotalOldUsersLastMonth = async (
  accessToken,
  dispatch,
  axiosJWT,
) => {
  dispatch(getTotalOldUsersLastMonthStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/dashBoard/totalOldUsersLastMonth`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getTotalOldUsersLastMonthSuccess(res.data))
  } catch (error) {
    dispatch(getTotalOldUsersLastMonthFailed())
  }
}
