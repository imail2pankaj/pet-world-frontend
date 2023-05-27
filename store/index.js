// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import home from '@/store/api/home'


export const store = configureStore({
  reducer: {
    home,
    // moderator,
    // doctor,
    // profile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
