import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer from './redux/user/user.slice'
import sessionStorage from 'redux-persist/es/storage/session'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// configure store with serializable check that ignores redux-persist actions
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types — this prevents the warning
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
