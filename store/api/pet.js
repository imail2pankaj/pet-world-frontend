import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

// ** Get Event
export const fetchPets = createAsyncThunk('appPets/fetchPets', async (params) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/pets?` + (new URLSearchParams(params)), {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Get Event
export const getPet = createAsyncThunk('appPets/getPet', async (id) => {
  const storedToken = window.localStorage.getItem('accessToken');

  const response = await axiosInstance.get(`/pets/${id}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response;
})

// ** Create Pet
export const createPet = createAsyncThunk('appPets/createPet', async (data, { rejectWithValue }) => {

  const storedToken = window.localStorage.getItem('accessToken');
  try {

    const response = await axiosInstance.post(`/pets`, data, {
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

// ** Create Pet
export const updatePet = createAsyncThunk('appPets/updatePet', async ({ id, formData }, { rejectWithValue }) => {

  const storedToken = window.localStorage.getItem('accessToken');
  try {

    const response = await axiosInstance.put(`/pets/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
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

// ** Create Pet
export const deleteCampaignImage = createAsyncThunk('appPets/deleteCampaignImage', async (id, { rejectWithValue }) => {

  const storedToken = window.localStorage.getItem('accessToken');
  try {

    const response = await axiosInstance.delete(`/pets/${id}/campaign-documents`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
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

  const storedToken = window.localStorage.getItem('accessToken');
  try {

    const response = await axiosInstance.post(`/pets/${petId}/${campaignId}/campaign-documents`, formData, {
      headers: {
        'Content-Type': 'multipart/ form-data',
        Authorization: `Bearer ${storedToken}`,
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

// // ** Create Event
// export const attendEvent = createAsyncThunk('appEvents/attendEvent', async ({id, status}) => {

//   const storedToken = window.localStorage.getItem('accessToken');

//   const response = await axiosInstance.get(`/events/${id}/attend/${status}`, {
//     headers: {
//       Authorization: `Bearer ${storedToken}`
//     },
//   })

//   return response;
// })

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