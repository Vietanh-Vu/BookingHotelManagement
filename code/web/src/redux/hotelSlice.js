import {createSlice} from '@reduxjs/toolkit'

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    hotels: {
      allHotels: null,
      isFetching: false,
      error: false,
    },
    image: {
      imagePath: null,
      isFetching: false,
      error: false,
    },
    categories: {
      allCategories: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getHotelsStart: state => {
      state.hotels.isFetching = true
    },
    getHotelsSuccess: (state, action) => {
      state.hotels.isFetching = false
      state.hotels.allHotels = action.payload
      state.hotels.error = false
    },
    getHotelsFailed: state => {
      state.hotels.isFetching = false
      state.hotels.error = true
    },
    getImageStart: state => {
      state.image.isFetching = true
    },
    getImageSuccess: (state, action) => {
      state.image.isFetching = false
      state.image.imagePath = action.payload
      state.image.error = false
    },
    getImageFailed: state => {
      state.image.isFetching = false
      state.image.error = true
    },
    insertHotelsStart: state => {
      state.hotels.isFetching = true
    },
    insertHotelsSuccess: (state) => {
      state.hotels.isFetching = false
      state.hotels.error = false
    },
    insertHotelsFailed: state => {
      state.hotels.isFetching = false
      state.hotels.error = true
    },
    getCategoriesStart: state => {
      state.categories.isFetching = true
    },
    getCategoriesSuccess: (state, action) => {
      state.categories.isFetching = false
      state.categories.allCategories = action.payload
      state.categories.error = false
    },
    getCategoriesFailed: state => {
      state.categories.isFetching = false
      state.categories.error = true
    },
    updateHotelsStart: state => {
      state.hotels.isFetching = true
    },
    updateHotelsSuccess: (state) => {
      state.hotels.isFetching = false
      state.hotels.error = false
    },
    updateHotelsFailed: state => {
      state.hotels.isFetching = false
      state.hotels.error = true
    },
  },
})

export const {
  getHotelsFailed,
  getHotelsStart,
  getHotelsSuccess,
  getImageFailed,
  getImageStart,
  getImageSuccess,
  insertHotelsFailed,
  insertHotelsStart,
  insertHotelsSuccess,
  getCategoriesFailed,
  getCategoriesStart,
  getCategoriesSuccess,
  updateHotelsFailed,
  updateHotelsStart,
  updateHotelsSuccess
} = hotelSlice.actions

export default hotelSlice.reducer
