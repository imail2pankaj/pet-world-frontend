// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import home from '@/store/api/home'
import event from '@/store/api/event'
import pet from '@/store/api/pet'
import campaign from '@/store/api/campaign'
import campaignRequest from '@/store/api/campaign-request'


export const store = configureStore({
  reducer: {
    home,
    event,
    pet,
    campaign,
    campaignRequest,
    // moderator,
    // doctor,
    // profile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
