import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Campaigns
export const fetchCampaignRequests = createAsyncThunk('appCampaignRequests/fetchCampaignRequests', async (params) => {

  const response = await axiosInstance.get(`/campaign-requests?` + (new URLSearchParams(params)))

  return response;
})

// ** Get Campaign
export const getCampaignRequest = createAsyncThunk('appCampaignRequests/getCampaignRequest', async (id) => {

  const response = await axiosInstance.get(`/campaign-requests/${id}`)

  return response;
})

// ** Create Campaign
export const createCampaignRequest = createAsyncThunk('appCampaignRequests/createCampaignRequest', async (data, { rejectWithValue }) => {

  try {

    const response = await axiosInstance.post(`/campaign-requests`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
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

// ** Create Campaign
export const updateCampaignRequest = createAsyncThunk('appCampaignRequests/updateCampaignRequest', async ({ requestId, data }, { rejectWithValue }) => {

  try {

    const response = await axiosInstance.put(`/campaign-requests/${requestId}`, data)

    return response;
  } catch (error) {
    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const appCampaignRequestSlice = createSlice({
  name: 'appSlice',
  initialState: {
    error: "",
    campaignRequestData: "",
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: {
    [fetchCampaignRequests.fulfilled]: (state, action) => {
      state.data = action?.payload?.data?.data
    },
    [getCampaignRequest.fulfilled]: (state, action) => {
      state.campaignRequestData = "";
      state.campaignRequestData = action?.payload?.data
    },
  }

})

export default appCampaignRequestSlice.reducer