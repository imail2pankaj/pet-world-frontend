import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Event
export const reportDoctor = createAsyncThunk('appReport/reportDoctor', async ({ doctor_id, reason }, { getState, dispatch }) => {

  const response = await axiosInstance.post(`/doctors/report`, { doctor_id, reason })

  return response;
})

export const appPrivateSlice = createSlice({
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
    // [getEvent.fulfilled]: (state, action) => {
    //   state.eventData = action?.payload?.data
    // },
  }

})

export default appPrivateSlice.reducer