import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Campaigns
export const fetchCampaigns = createAsyncThunk('appCampaigns/fetchCampaigns', async (params) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/campaigns?` + (new URLSearchParams(params)), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Get Campaign
export const getCampaign = createAsyncThunk('appCampaigns/getCampaign', async (id) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Get Campaign
export const sendEmailToPetOwner = createAsyncThunk('appCampaigns/sendEmailToPetOwner', async (id) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/campaigns/${id}/send-email-pet-owner`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  })

  return response;
})

// ** Get Campaign
export const sendEmailToAppointedDoctor = createAsyncThunk('appCampaigns/sendEmailToAppointedDoctor', async ({ cId, doctorId }) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/campaigns/${cId}/${doctorId}/send-email-doctor`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Create Campaign
export const createCampaign = createAsyncThunk('appCampaigns/createCampaign', async (data, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axiosInstance.post(`/campaigns`, data, {
      headers: {
        'Content-Type': 'multipart/ form-data',
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
export const updateCampaign = createAsyncThunk('appCampaigns/updateCampaign', async ({ id, formData }, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.post(`/campaigns/${id}`, formData, {
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