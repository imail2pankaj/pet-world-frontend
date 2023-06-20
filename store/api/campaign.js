import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Campaigns
export const fetchCampaigns = createAsyncThunk('appCampaigns/fetchCampaigns', async (params) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/campaigns?` + (new URLSearchParams(params)), {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Get Campaign
export const getCampaign = createAsyncThunk('appCampaigns/getCampaign', async (id) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Get Campaign
export const sendEmailToPetOwner = createAsyncThunk('appCampaigns/sendEmailToPetOwner', async (id) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/campaigns/${id}/send-email-pet-owner`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Get Campaign
export const sendEmailToAppointedDoctor = createAsyncThunk('appCampaigns/sendEmailToAppointedDoctor', async ({ cId, doctorId }) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/campaigns/${cId}/${doctorId}/send-email-doctor`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Create Campaign
export const createCampaign = createAsyncThunk('appCampaigns/createCampaign', async (data, { rejectWithValue }) => {

  const storedToken = window.localStorage.getItem('accessToken');
  try {

    const response = await axiosInstance.post(`/campaigns`, data, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'multipart/ form-data'
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
export const updateCampaign = createAsyncThunk('appCampaigns/updateCampaign', async ({ id, formData }, { rejectWithValue }) => {

  const storedToken = window.localStorage.getItem('accessToken');
  try {

    const response = await axiosInstance.put(`/campaigns/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'multipart/ form-data'
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

export const appCampaignSlice = createSlice({
  name: 'appSlice',
  initialState: {
    error: "",
    campaignData: "",
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: {
    [createCampaign.fulfilled]: (state, action) => {
      state.error = ""
      state.campaignData = action?.payload?.data
    },
    [createCampaign.rejected]: (state, action) => {
      state.campaignData = ""
      state.error = action?.payload
    },
    [updateCampaign.fulfilled]: (state, action) => {
      state.error = ""
      state.campaignData = action?.payload?.data
    },
    [updateCampaign.rejected]: (state, action) => {
      state.campaignData = ""
      state.error = action?.payload
    },
    [fetchCampaigns.fulfilled]: (state, action) => {
      state.data = action?.payload?.data?.data
    },
    [getCampaign.fulfilled]: (state, action) => {
      state.campaignData = action?.payload?.data
    },
  }

})

export default appCampaignSlice.reducer