import axios from 'axios'
import {
  getCategoriesFailed,
  getCategoriesStart,
  getCategoriesSuccess,
  getHotelsFailed,
  getHotelsStart,
  getHotelsSuccess,
  getImageFailed,
  getImageStart,
  getImageSuccess,
  insertHotelsFailed,
  insertHotelsStart,
  insertHotelsSuccess,
  updateHotelsFailed,
  updateHotelsStart,
  updateHotelsSuccess,
} from '../hotelSlice'

export const getAllHotels = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getHotelsStart())
  try {
    const res = await axiosJWT.get(`http://localhost:8000/admin/hotel/`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(
      getHotelsSuccess(
        res.data.map(hotel => ({
          ...hotel,
          CategoryId: hotel.CategoryId[0],
        })),
      ),
    )
  } catch (error) {
    dispatch(getHotelsFailed())
  }
}

export const insertHotel = async (accessToken, dispatch, axiosJWT, hotel) => {
  dispatch(getImageStart())
  try {
    const formData = new FormData()
    formData.append('myImage', hotel.ImgSelected)
    const res = await axiosJWT.post(
      `http://localhost:8000/admin/hotel/add/image`,
      formData,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(getImageSuccess(res.data.nameFile))
    dispatch(insertHotelsStart())
    try {
      const hotelData = {
        CategoryId: hotel.CategoryId,
        HotelName: hotel.HotelName,
        IsActive: hotel.IsActive ? true : false,
        Address: hotel.Address,
        Description: hotel.Description,
        HotelImg: res.data.nameFile,
      }
      const response = await axios.post(
        'http://localhost:8000/admin/hotel/add',
        hotelData,
        {
          headers: {
            token: res.data.newAccessToken,
          },
        },
      )
      dispatch(insertHotelsSuccess())
      return response.data.message
    } catch (error) {
      dispatch(insertHotelsFailed())
    }
  } catch (error) {
    dispatch(getImageFailed())
  }
}

export const getCategories = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getCategoriesStart())
  try {
    const res = await axiosJWT.get(`http://localhost:8000/admin/hotel/add`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(
      getCategoriesSuccess(
        res.data.map(category => ({
          ...category,
          title: category.CategoryName,
          id: category.CategoryId,
        })),
      ),
    )
  } catch (error) {
    dispatch(getCategoriesFailed())
  }
}

export const updateHotel = async (accessToken, dispatch, axiosJWT, hotel) => {
  if (hotel.ImgSelected) {
    dispatch(getImageStart())
    try {
      const formData = new FormData()
      formData.append('myImage', hotel.ImgSelected)
      const res = await axiosJWT.post(
        `http://localhost:8000/admin/hotel/add/image`,
        formData,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        },
      )
      dispatch(getImageSuccess(res.data.nameFile))
      dispatch(updateHotelsStart())
      try {
        const hotelData = {
          CategoryId: hotel.CategoryId,
          HotelName: hotel.HotelName,
          IsActive: hotel.IsActive ? true : false,
          Address: hotel.Address,
          Description: hotel.Description,
          HotelImg: res.data.nameFile,
        }
        const response = await axios.put(
          `http://localhost:8000/admin/hotel/update/${hotel.HotelId}`,
          hotelData,
          {
            headers: {
              token: res.data.newAccessToken,
            },
          },
        )
        dispatch(updateHotelsSuccess())
        return response.data.message
      } catch (error) {
        dispatch(updateHotelsFailed())
      }
    } catch (error) {
      dispatch(getImageFailed())
    }
  } else {
    dispatch(updateHotelsStart())
    try {
      const hotelData = {
        CategoryId: hotel.CategoryId,
        HotelName: hotel.HotelName,
        IsActive: hotel.IsActive ? true : false,
        Address: hotel.Address,
        Description: hotel.Description,
        HotelImg: hotel.HotelImg,
      }
      const response = await axiosJWT.put(
        `http://localhost:8000/admin/hotel/update/${hotel.HotelId}`,
        hotelData,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        },
      )
      dispatch(updateHotelsSuccess())
      return response.data.message
    } catch (error) {
      dispatch(updateHotelsFailed())
    }
  }
}

export const deleteHotel = async (accessToken, dispatch, axiosJWT, hotel) => {
  dispatch(updateHotelsStart())
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/admin/hotel/delete/${hotel.HotelId}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(updateHotelsSuccess())
    return res.data.message
  } catch (error) {
    dispatch(updateHotelsFailed())
  }
}
