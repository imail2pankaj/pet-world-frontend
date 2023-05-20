// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
// import moderator from 'src/store/api/moderator'


export const store = configureStore({
  reducer: {
    // moderator,
    // doctor,
    // profile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
