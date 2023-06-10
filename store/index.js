// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import home from '@/store/api/home'
import event from '@/store/api/event'
import pet from '@/store/api/pet'


export const store = configureStore({
  reducer: {
    home,
    event,
    pet,
    // moderator,
    // doctor,
    // profile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
