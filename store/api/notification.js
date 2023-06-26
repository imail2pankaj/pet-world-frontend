import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Campaigns
export const fetchNotifications = createAsyncThunk('appNotifications/fetchNotifications', async (params) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/notifications?` + (new URLSearchParams(params)), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})


// ** Create Pet
export const deleteNotification = createAsyncThunk('appPets/deleteNotification', async (id, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axiosInstance.delete(`/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return response;
  } catch (error) {
    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const appNotificationSlice = createSlice({
  name: 'appSlice',
  initialState: {
    error: "",
    notificationData: "",
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.data = action?.payload?.data?.notification
    }
  }

})

export default appNotificationSlice.reducer