import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Event
export const getEvent = createAsyncThunk('appEvents/getEvent', async (id, { getState, dispatch }) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Create Event
export const participateEvent = createAsyncThunk('appEvents/participateEvent', async (id) => {

  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/events/${id}/participate`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })

  return response;
})

// ** Create Event
export const attendEvent = createAsyncThunk('appEvents/attendEvent', async ({id, status}) => {

  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/events/${id}/attend/${status}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    },
  })

  return response;
})

export const appEventSlice = createSlice({
  name: 'appSlice',
  initialState: {
    error: {},
    eventData: {},
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: {
    [getEvent.fulfilled]: (state, action) => {
      state.eventData = action?.payload?.data
    },
  }

})

export default appEventSlice.reducer