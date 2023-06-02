// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import home from '@/store/api/home'
import event from '@/store/api/event'


export const store = configureStore({
  reducer: {
    home,
    event,
    // moderator,
    // doctor,
    // profile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
