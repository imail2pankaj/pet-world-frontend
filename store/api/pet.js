import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance';

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
export const createPet = createAsyncThunk('appPets/createPet', async (data, {rejectWithValue}) => {

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
    [getPet.fulfilled]: (state, action) => {
      state.petData = action?.payload?.data
    },
  }

})

export default appPetSlice.reducer