import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Event
export const fetchPets = createAsyncThunk('appPets/fetchPets', async (params) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/pets?` + (new URLSearchParams(params)), {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Get Event
export const getPet = createAsyncThunk('appPets/getPet', async (id) => {

  const accessToken = localStorage.getItem("accessToken");

  const response = await axiosInstance.get(`/pets/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response;
})

// ** Create Pet
export const createPet = createAsyncThunk('appPets/createPet', async (data, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axiosInstance.post(`/pets`, data, {
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

// ** Create Pet
export const updatePet = createAsyncThunk('appPets/updatePet', async ({ id, formData }, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.post(`/pets/${id}`, formData, {
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

// ** Create Pet
export const deleteCampaignImage = createAsyncThunk('appPets/deleteCampaignImage', async (id, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.delete(`/pets/${id}/campaign-documents`, {
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

// ** Create Pet
export const uploadCampaignDocuments = createAsyncThunk('appPets/uploadCampaignDocuments', async ({ petId, campaignId, formData }, { rejectWithValue }) => {

  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axiosInstance.post(`/pets/${petId}/${campaignId}/campaign-documents`, formData, {
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

export const appPetSlice = createSlice({
  name: 'appSlice',
  initialState: {
    error: "",
    petData: "",
    data: [],
    total: 0,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: {
    [createPet.fulfilled]: (state, action) => {
      state.error = ""
      state.petData = action?.payload?.data
    },
    [createPet.rejected]: (state, action) => {
      state.petData = ""
      state.error = action?.payload
    },
    [uploadCampaignDocuments.fulfilled]: (state, action) => {
      state.error = ""
      state.petData = action?.payload?.data
    },
    [uploadCampaignDocuments.rejected]: (state, action) => {
      state.petData = ""
      state.error = action?.payload
    },
    [updatePet.fulfilled]: (state, action) => {
      state.error = ""
      state.petData = action?.payload?.data
    },
    [updatePet.rejected]: (state, action) => {
      state.petData = ""
      state.error = action?.payload
    },
    [fetchPets.fulfilled]: (state, action) => {
      state.data = action?.payload?.data?.data
    },
    [getPet.fulfilled]: (state, action) => {
      state.petData = action?.payload?.data
    },
  }

})

export default appPetSlice.reducer