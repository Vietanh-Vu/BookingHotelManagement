import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import userReducer from './userSlice'
import hotelReducer from './hotelSlice'
import roomReducer from './roomSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const appReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  hotels: hotelReducer,
  rooms: roomReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'auth/logOutSuccess') {
    storage.removeItem('persist:root')
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
