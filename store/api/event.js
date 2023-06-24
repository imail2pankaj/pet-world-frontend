import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Event
export const getEvent = createAsyncThunk('appEvents/getEvent', async (id, { getState, dispatch }) => {
  
  const response = await axiosInstance.get(`/events/${id}`)

  return response;
})

// ** Create Event
export const participateEvent = createAsyncThunk('appEvents/participateEvent', async (id) => {

  const response = await axiosInstance.get(`/events/${id}/participate`)

  return response;
})

// ** Create Event
export const attendEvent = createAsyncThunk('appEvents/attendEvent', async ({id, status}) => {

  const response = await axiosInstance.get(`/events/${id}/attend/${status}`)

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