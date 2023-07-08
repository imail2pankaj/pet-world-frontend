// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import home from '@/store/api/home'
import event from '@/store/api/event'
import pet from '@/store/api/pet'
import campaign from '@/store/api/campaign'
import notification from '@/store/api/notification'
import subscription from '@/store/api/subscription'
import campaignRequest from '@/store/api/campaign-request'
import privateCommonApi from '@/store/api/private-common-api'


export const store = configureStore({
  reducer: {
    home,
    event,
    pet,
    campaign,
    campaignRequest,
    notification,
    subscription,
    privateCommonApi,
    // doctor,
    // profile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
