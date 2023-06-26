import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Campaigns
export const fetchCampaignRequests = createAsyncThunk('appCampaignRequests/fetchCampaignRequests', async (params) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/campaign-requests?` + (new URLSearchParams(params)), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Get Campaign
export const getCampaignRequest = createAsyncThunk('appCampaignRequests/getCampaignRequest', async (id) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/campaign-requests/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Create Campaign
export const createCampaignRequest = createAsyncThunk('appCampaignRequests/createCampaignRequest', async (data, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axiosInstance.post(`/campaign-requests`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
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

// ** Create Campaign
export const updateCampaignRequest = createAsyncThunk('appCampaignRequests/updateCampaignRequest', async ({ requestId, data }, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axiosInstance.put(`/campaign-requests/${requestId}`, data, {
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