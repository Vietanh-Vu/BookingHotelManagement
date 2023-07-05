import axios from 'axios'
import {
  getRoomTypesFailed,
  getRoomTypesStart,
  getRoomTypesSuccess,
  getRoomsFailed,
  getRoomsStart,
  getRoomsSuccess,
  insertRoomsFailed,
  insertRoomsStart,
  insertRoomsSuccess,
  updateRoomsFailed,
  updateRoomsStart,
  updateRoomsSuccess,
} from '../roomSlice'

export const getAllRoom = async (accessToken, dispatch, axiosJWT, hotelId) => {
  dispatch(getRoomsStart())
  try {
    const res = await axiosJWT.get(
      `http://localhost:8000/admin/hotel/rooms/${hotelId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(
      getRoomsSuccess(
        res.data.map(room => ({
          ...room,
          RoomTypeId: room.RoomTypeId[0],
        })),
      ),
    )
  } catch (error) {
    dispatch(getRoomsFailed())
  }
}

export const insertRoom = async (
  accessToken,
  dispatch,
  axiosJWT,
  room,
  hotelId,
) => {
  dispatch(insertRoomsStart())
  try {
    const roomData = {
      RoomTypeId: room.RoomTypeId,
      RoomName: room.RoomName,
      CurrentPrice: room.CurrentPrice,
      IsAvailable: room.IsAvailable ? true : false,
      Description: room.Description,
      IsActive: room.IsActive ? true : false,
    }
    const response = await axiosJWT.post(
      `http://localhost:8000/admin/hotel/rooms/${hotelId}`,
      roomData,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(insertRoomsSuccess())
    return response.data.message
  } catch (error) {
    dispatch(insertRoomsFailed())
  }
}

export const getRoomTypes = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getRoomTypesStart())
  try {
    const res = await axiosJWT.get(`http://localhost:8000/admin/hotel/rooms`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    })
    dispatch(
      getRoomTypesSuccess(
        res.data.map(roomType => ({
          ...roomType,
          title: roomType.RoomTypeName,
          id: roomType.RoomTypeId,
        })),
      ),
    )
  } catch (error) {
    dispatch(getRoomTypesFailed())
  }
}

export const updateRoom = async (
  accessToken,
  dispatch,
  axiosJWT,
  room,
  hotelId,
) => {
  dispatch(updateRoomsStart())
  try {
    const roomData = {
      HotelId: hotelId,
      RoomTypeId: room.RoomTypeId,
      RoomName: room.RoomName,
      CurrentPrice: room.CurrentPrice,
      IsAvailable: room.IsAvailable ? true : false,
      Description: room.Description,
      IsActive: room.IsActive ? true : false,
    }
    const response = await axiosJWT.put(
      `http://localhost:8000/admin/hotel/rooms/update/${room.RoomId}`,
      roomData,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(updateRoomsSuccess())
    return response.data.message
  } catch (error) {
    dispatch(updateRoomsFailed())
  }
}

export const deleteRoom = async (accessToken, dispatch, axiosJWT, room) => {
  dispatch(updateRoomsStart())
  try {
    const res = await axiosJWT.delete(
      `http://localhost:8000/admin/hotel/rooms/delete/${room.RoomId}`,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      },
    )
    dispatch(updateRoomsSuccess())
    return res.data.message
  } catch (error) {
    dispatch(updateRoomsFailed())
  }
}
