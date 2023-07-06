import {createSlice} from '@reduxjs/toolkit'

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    rooms: {
      allRooms: null,
      isFetching: false,
      error: false,
    },
    roomTypes: {
      allRoomTypes: null,
      isFetching: false,
      error: false,
    },
    roomHistory: {
      allRoomHistory: null,
      isFetching: null,
      error: null,
    }
  },
  reducers: {
    getRoomsStart: state => {
      state.rooms.isFetching = true
    },
    getRoomsSuccess: (state, action) => {
      state.rooms.isFetching = false
      state.rooms.allRooms = action.payload
      state.rooms.error = false
    },
    getRoomsFailed: state => {
      state.rooms.isFetching = false
      state.rooms.error = true
    },
    insertRoomsStart: state => {
      state.rooms.isFetching = true
    },
    insertRoomsSuccess: (state) => {
      state.rooms.isFetching = false
      state.rooms.error = false
    },
    insertRoomsFailed: state => {
      state.rooms.isFetching = false
      state.rooms.error = true
    },
    getRoomTypesStart: state => {
      state.roomTypes.isFetching = true
    },
    getRoomTypesSuccess: (state, action) => {
      state.roomTypes.isFetching = false
      state.roomTypes.allRoomTypes = action.payload
      state.roomTypes.error = false
    },
    getRoomTypesFailed: state => {
      state.roomTypes.isFetching = false
      state.roomTypes.error = true
    },
    updateRoomsStart: state => {
      state.rooms.isFetching = true
    },
    updateRoomsSuccess: (state) => {
      state.rooms.isFetching = false
      state.rooms.error = false
    },
    updateRoomsFailed: state => {
      state.rooms.isFetching = false
      state.rooms.error = true
    },
    getRoomHistoryStart: state => {
      state.roomHistory.isFetching = true
    },
    getRoomHistorySuccess: (state, action) => {
      state.roomHistory.isFetching = false
      state.roomHistory.allRoomHistory = action.payload
      state.roomHistory.error = false
    },
    getRoomHistoryFailed: state => {
      state.roomHistory.isFetching = false
      state.roomHistory.error = true
    },
  },
})

export const {
  getRoomsFailed,
  getRoomsStart,
  getRoomsSuccess,
  insertRoomsFailed,
  insertRoomsStart,
  insertRoomsSuccess,
  getRoomTypesFailed,
  getRoomTypesStart,
  getRoomTypesSuccess,
  updateRoomsFailed,
  updateRoomsStart,
  updateRoomsSuccess,
  getRoomHistoryFailed,
  getRoomHistoryStart,
  getRoomHistorySuccess,
} = roomSlice.actions

export default roomSlice.reducer
