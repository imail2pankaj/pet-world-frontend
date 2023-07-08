import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';


// ** Get Subscription
export const fetchSubscriptions = createAsyncThunk('appSubscription/fetchSubscriptions', async (params) => {

  const response = await axiosInstance.get(`/subscriptions?` + (new URLSearchParams(params)))

  return response;
})


// ** Subscribe
export const subscribe = createAsyncThunk('appReport/subscribe', async (formData, { getState, dispatch }) => {

  const response = await axiosInstance.post(`/subscriptions/subscribe`, formData)

  return response;
})

export const appSubscriptionSlice = createSlice({
  name: 'appSlice',
  initialState: {
    error: {},
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: {
    [fetchSubscriptions.fulfilled]: (state, action) => {
      console.log(action?.payload?.data?.data);
      state.data = action?.payload?.data?.data
    },
  }

})

export default appSubscriptionSlice.reducer